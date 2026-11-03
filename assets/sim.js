// Tiny helper library shared by all simulations: DPR-aware canvases, theme palette, drag, sliders.
window.Sim = (function () {
  const Sim = {};
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  Sim.palette = () => ({
    ink: css('--ink'), muted: css('--muted'), line: css('--line'), bg: css('--bg'), surface: css('--surface'),
    accent: css('--accent'), accent2: css('--accent2'), good: css('--good'), warn: css('--warn')
  });

  // Canvas that fills its parent's width at a fixed aspect ratio (height/width). draw(ctx, w, h, palette).
  Sim.make = function (canvas, aspect, draw) {
    const o = { canvas, ctx: canvas.getContext('2d'), w: 0, h: 0 };
    o.redraw = () => {
      o.ctx.clearRect(0, 0, o.w, o.h);
      draw(o.ctx, o.w, o.h, Sim.palette());
    };
    const size = () => {
      const w = canvas.parentElement.clientWidth, h = Math.round(w * aspect), dpr = devicePixelRatio || 1;
      if (w === o.w && h === o.h) return;
      canvas.style.height = h + 'px';
      canvas.width = w * dpr; canvas.height = h * dpr;
      o.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      o.w = w; o.h = h; o.redraw();
    };
    new ResizeObserver(size).observe(canvas.parentElement);
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', o.redraw);
    size();
    return o;
  };

  // h.down(x,y) -> true to start a drag; h.move(x,y) while dragging; h.hover(x,y) -> true for grab cursor.
  Sim.pointer = function (canvas, h) {
    let active = false;
    const pos = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    canvas.addEventListener('pointerdown', e => {
      const [x, y] = pos(e);
      if (h.down(x, y)) { active = true; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; e.preventDefault(); }
    });
    canvas.addEventListener('pointermove', e => {
      const [x, y] = pos(e);
      if (active) h.move(x, y);
      else if (h.hover) canvas.style.cursor = h.hover(x, y) ? 'grab' : 'default';
    });
    const end = () => { active = false; };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
  };

  Sim.slider = function (host, o) {
    const wrap = document.createElement('label'); wrap.className = 'ctl';
    const name = document.createElement('span'); name.textContent = o.label;
    const inp = document.createElement('input');
    inp.type = 'range'; inp.min = o.min; inp.max = o.max; inp.step = o.step || 1; inp.value = o.value;
    const out = document.createElement('output');
    const fmt = () => { out.textContent = (+inp.value).toFixed(o.dec || 0) + (o.unit || ''); };
    inp.addEventListener('input', () => { fmt(); if (o.onInput) o.onInput(+inp.value); });
    fmt(); wrap.append(name, inp, out); host.append(wrap);
    return { get value() { return +inp.value; }, set(v) { inp.value = v; fmt(); } };
  };

  // Animation loop with a Run/Pause button. step(dtSeconds) advances state and redraws.
  Sim.loop = function (step) {
    let on = false, last = 0;
    const tick = t => { if (!on) return; const dt = Math.min(0.05, (t - last) / 1000); last = t; step(dt); requestAnimationFrame(tick); };
    const o = {
      get on() { return on; },
      toggle(btn) {
        on = !on; if (on) { last = performance.now(); requestAnimationFrame(tick); }
        if (btn) { btn.classList.toggle('on', on); btn.textContent = on ? 'Pause' : 'Run'; }
      }
    };
    return o;
  };

  // Drawing primitives
  Sim.line = (c, x1, y1, x2, y2, col, w) => { c.strokeStyle = col; c.lineWidth = w || 1; c.lineCap = 'round'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); };
  Sim.dot = (c, x, y, r, fill, stroke) => { c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fillStyle = fill; c.fill(); if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); } };
  Sim.ground = (c, x, y, col, s) => { // hatched triangle support, apex at (x,y)
    s = s || 10;
    c.strokeStyle = col; c.lineWidth = 2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(x, y); c.lineTo(x - s, y + s * 1.4); c.lineTo(x + s, y + s * 1.4); c.closePath(); c.stroke();
    for (let i = -1; i <= 1; i++) { c.beginPath(); c.moveTo(x + i * s * 0.7 - 2, y + s * 1.4); c.lineTo(x + i * s * 0.7 - 8, y + s * 1.4 + 7); c.stroke(); }
  };
  return Sim;
})();
