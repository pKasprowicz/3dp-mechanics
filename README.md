# 3D-Printed Mechanics

A self-contained, interactive compendium of mechanical design for 3D printing (20 chapters, ~60 simulations and calculators). Plain HTML/CSS/JS, no build step.

## Open it

- Easiest: open `index.html` in a browser.
- If any feature misbehaves from `file://` (for example downloads), serve the folder instead:

```bash
python -m http.server 8765
```

then visit http://localhost:8765/

## Layout

- `index.html` – table of contents
- `chapters/` – one page per chapter (01–20)
- `assets/` – shared styles, sidebar, simulation helpers (`sim.js`), linkage and gear geometry (`linkage.js`, `gears.js`)
- `tools/clearance_coupon.scad` – OpenSCAD fit-test coupon (untested; OpenSCAD was not available when written)

Material values and standard-part dimensions are typical figures for orientation; verify with calipers and test prints.
