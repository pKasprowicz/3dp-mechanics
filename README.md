# 3D-Printed Mechanics

A self-contained, interactive compendium of mechanical design for 3D printing (20 chapters, ~60 simulations and calculators). Plain HTML/CSS/JS, no build step.

## Open it

- Easiest: open `index.html` in a browser.
- If any feature misbehaves from `file://` (for example downloads), serve the folder instead:

```bash
python -m http.server 8765
```

then visit http://localhost:8765/

## Publishing

The site is published with GitHub Pages from the `master` branch by the workflow in `.github/workflows/pages.yml`
(repository setting: Pages source = GitHub Actions). Every push to `master` redeploys. The workflow publishes only
`index.html`, `chapters/`, `assets/` and `tools/`; everything uses relative links, so it works under the
`/3dp-mechanics/` sub-path.

## Versioning and releases

The compendium uses [Semantic Versioning](https://semver.org/), `MAJOR.MINOR.PATCH`, and the current release is shown
as a badge next to the title (home page heading and sidebar on every page), linking to the matching GitHub release.

| Bump | When |
| --- | --- |
| **MAJOR** | The structure or scope changes: chapters reordered, merged or removed, a redesigned site. |
| **MINOR** | New content: a chapter, a section, a simulation or tool. |
| **PATCH** | Corrections and polish: fixed numbers, typos, bug fixes, wording. |

The version lives in one place, `assets/version.js`; history is in `CHANGELOG.md`. To cut a release:

```bash
# 1. describe the changes under "## Unreleased" in CHANGELOG.md, then:
python tools/bump-version.py minor        # or major / patch
git commit -am "Release v1.1.0"
git push origin master                    # deploys the site with the new badge
git tag v1.1.0 && git push origin v1.1.0  # creates the GitHub Release from the changelog
```

The release workflow (`.github/workflows/release.yml`) refuses a tag that does not match `assets/version.js` or has no
changelog entry.

## Layout

- `index.html` – table of contents
- `chapters/` – one page per chapter (01–20)
- `assets/` – shared styles, sidebar, simulation helpers (`sim.js`), linkage and gear geometry (`linkage.js`, `gears.js`)
- `assets/version.js` – the release version shown next to the title
- `CHANGELOG.md`, `tools/bump-version.py` – release history and the bump helper
- `.github/workflows/` – Pages deployment and release creation
- `tools/clearance_coupon.scad` – OpenSCAD fit-test coupon (untested; OpenSCAD was not available when written)

Material values and standard-part dimensions are typical figures for orientation; verify with calipers and test prints.
