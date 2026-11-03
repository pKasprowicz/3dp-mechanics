// Involute gear geometry for the gear simulations. Angles in radians, lengths in mm.
window.Gears = (function () {
  const inv = a => Math.tan(a) - a;
  const dims = (z, m, alpha) => { const r = m * z / 2; return { r, rb: r * Math.cos(alpha), ra: r + m, rf: r - 1.25 * m }; };
  // Half-thickness angle of a tooth at radius rho. Teeth are thinned by backlash/2 each.
  function half(d, m, alpha, backlash, rho, internal) {
    const psiP = (Math.PI * m / 2 - backlash / 2) / (2 * d.r), ar = Math.acos(Math.min(1, d.rb / rho));
    return internal ? psiP - inv(alpha) + inv(ar) : psiP + inv(alpha) - inv(ar);
  }
  const P = (r, t) => [r * Math.cos(t), r * Math.sin(t)];

  // Outline of a gear (tooth 0 centred on angle 0), counter-clockwise. internal=true gives the cavity outline of a ring gear.
  function poly(z, m, alpha, backlash, internal) {
    const d = dims(z, m, alpha), pts = [], N = 8;
    if (!internal) {
      const r0 = Math.max(d.rb, d.rf);
      let rt = d.ra;
      if (half(d, m, alpha, backlash, rt, false) <= 0) { let lo = r0, hi = d.ra; for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; half(d, m, alpha, backlash, mid, false) > 0 ? lo = mid : hi = mid; } rt = lo; }
      const pt = half(d, m, alpha, backlash, rt, false);
      for (let k = 0; k < z; k++) {
        const f = 2 * Math.PI * k / z;
        if (d.rf < r0) pts.push(P(d.rf, f - half(d, m, alpha, backlash, r0, false)));
        for (let i = 0; i <= N; i++) { const rho = r0 + (rt - r0) * i / N; pts.push(P(rho, f - half(d, m, alpha, backlash, rho, false))); }
        for (let i = 1; i < 3; i++) pts.push(P(rt, f - pt + 2 * pt * i / 3));
        for (let i = N; i >= 0; i--) { const rho = r0 + (rt - r0) * i / N; pts.push(P(rho, f + half(d, m, alpha, backlash, rho, false))); }
        if (d.rf < r0) pts.push(P(d.rf, f + half(d, m, alpha, backlash, r0, false)));
        pts.push(P(d.rf, f + Math.PI / z));
      }
    } else {
      const rtip = Math.max(d.r - m, d.rb * 1.002), rroot = d.r + 1.25 * m;
      for (let k = 0; k < z; k++) {
        const f = 2 * Math.PI * k / z, pt = half(d, m, alpha, backlash, rtip, true);
        for (let i = 0; i <= N; i++) { const rho = rroot + (rtip - rroot) * i / N; pts.push(P(rho, f - half(d, m, alpha, backlash, rho, true))); }
        for (let i = 1; i < 3; i++) pts.push(P(rtip, f - pt + 2 * pt * i / 3));
        for (let i = N; i >= 0; i--) { const rho = rroot + (rtip - rroot) * i / N; pts.push(P(rho, f + half(d, m, alpha, backlash, rho, true))); }
        pts.push(P(rroot, f + Math.PI / z));
      }
    }
    return pts;
  }

  // Number of tooth pairs in contact on average (want > 1.2).
  function contactRatio(z1, z2, m, alpha) {
    const a = m * (z1 + z2) / 2, d1 = dims(z1, m, alpha), d2 = dims(z2, m, alpha);
    return (Math.sqrt(Math.max(0, d1.ra ** 2 - d1.rb ** 2)) + Math.sqrt(Math.max(0, d2.ra ** 2 - d2.rb ** 2)) - a * Math.sin(alpha)) / (Math.PI * m * Math.cos(alpha));
  }
  const minTeeth = alpha => 2 / Math.sin(alpha) ** 2; // below this the standard rack cutter undercuts the root

  // Lewis form factor Y (module form) for 20 degree-ish teeth, approximate
  const lewisY = z => Math.PI * Math.max(0.05, 0.154 - 0.912 / z);

  function svg(pts, bore, note) {
    const R = Math.max(...pts.map(p => Math.hypot(p[0], p[1]))) + 2, s = 2 * R;
    return '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="' + s.toFixed(2) + 'mm" height="' + s.toFixed(2) + 'mm" viewBox="' + (-R).toFixed(2) + ' ' + (-R).toFixed(2) + ' ' + s.toFixed(2) + ' ' + s.toFixed(2) + '">\n<!-- ' + note + ' Units: mm. -->\n' +
      '<polygon fill="none" stroke="#000" stroke-width="0.1" points="' + pts.map(p => p[0].toFixed(3) + ',' + (-p[1]).toFixed(3)).join(' ') + '"/>\n' +
      (bore ? '<circle cx="0" cy="0" r="' + (bore / 2) + '" fill="none" stroke="#000" stroke-width="0.1"/>\n' : '') + '</svg>\n';
  }
  function download(name, text) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'image/svg+xml' })); a.download = name; a.click(); }

  return { dims, poly, contactRatio, minTeeth, lewisY, svg, download };
})();
