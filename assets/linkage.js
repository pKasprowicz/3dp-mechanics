// Shared kinematics for planar linkage simulations.
window.Linkage = (function () {
  // Intersection of circle(c1, r1) and circle(c2, r2). sign picks the branch. Returns null if they do not meet.
  function circles(c1, r1, c2, r2, sign) {
    const dx = c2[0] - c1[0], dy = c2[1] - c1[1], D = Math.hypot(dx, dy);
    if (D === 0 || D > r1 + r2 || D < Math.abs(r1 - r2)) return null;
    const a = (r1 * r1 - r2 * r2 + D * D) / (2 * D), h = Math.sqrt(Math.max(0, r1 * r1 - a * a)) * (sign || 1);
    const xm = c1[0] + a * dx / D, ym = c1[1] + a * dy / D;
    return [xm - h * dy / D, ym + h * dx / D];
  }
  // Four-bar: ground pivots O2=(0,0), O4=(G,0); input link a at angle th; coupler c; output r.
  // Coupler point P = A + u*(B-A) + v*perp(B-A). Returns {A, B, P} or null.
  function fourBar(p, th) {
    const A = [p.a * Math.cos(th), p.a * Math.sin(th)];
    const B = circles(A, p.c, [p.G, 0], p.r, p.sign || 1);
    if (!B) return null;
    const vx = B[0] - A[0], vy = B[1] - A[1];
    return { A, B, P: [A[0] + (p.u || 0) * vx - (p.v || 0) * vy, A[1] + (p.u || 0) * vy + (p.v || 0) * vx] };
  }
  // Longest nearly-straight stretch of a sampled closed path (pts may contain null). Returns {start, len, chord, dev} or null.
  function straightest(pts, tol) {
    const n = pts.length, ext = pts.concat(pts);
    let best = null;
    for (let i = 0; i < n; i += 2) {
      if (!ext[i]) continue;
      for (let L = 8; L < n / 2; L += 6) {
        if (!ext[i + L]) break;
        const p0 = ext[i], p1 = ext[i + L], ch = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
        if (ch < 1e-6 || (best && ch <= best.chord)) continue;
        let dev = 0, ok = true;
        for (let k = 0; k <= L; k++) {
          const q = ext[i + k]; if (!q) { ok = false; break; }
          dev = Math.max(dev, Math.abs((p1[0] - p0[0]) * (p0[1] - q[1]) - (p0[0] - q[0]) * (p1[1] - p0[1])) / ch);
        }
        if (ok && dev / ch < (tol || 0.003)) best = { start: i % n, len: L, chord: ch, dev };
      }
    }
    return best;
  }
  return { circles, fourBar, straightest };
})();
