# Changelog

All notable changes to this compendium are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project uses
[Semantic Versioning](https://semver.org/) as described in the README.

## Unreleased

### Changed

- Releases are created automatically: a push to master that changes `assets/version.js` creates the tag and the GitHub Release, so no tag push is needed. Missing releases can be created from the Actions tab.

## 1.2.0 - 2026-11-14

Reviewed every mechanism for how clearly its principle of operation is explained, and added interactive models where a picture in motion explains it better than words.

### Added

- Eight new simulations: Scotch yoke vs slider-crank (5), the crossed belt showing how involute teeth mesh (7), cycloidal drive (7), the screw unwrapped into a ramp with its force triangle (9), universal joint speed fluctuation (10), bistable snap-through (12), push-push heart-cam latch (14), and inside a stepper motor (16).
- The pendulum calculator (11) is now an animated anchor escapement showing lock, unlock, impulse and drop.
- Principle-of-operation explanations: law of gearing and the line of action; worm, cycloidal and strain-wave ratios; the Willis equation for planetary sets; the screw as a wrapped wedge; how friction belts grip (tension ratio, V-groove wedge, crowning, creep); why the capstan law is exponential; how ball screws, ball bearings, helical, jaw, Oldham and cardan couplings work; kinematic inversion for cam profiles; Peaucellier inversion, pantograph similarity and the toggle's force multiplication; intermittent gears; the four phases of an escapement; why a flexure acts as a hinge; bistable energy and negative stiffness; push-push latches, dog, sprag and wrap-spring clutches; back-EMF in DC motors, how a stepper steps and loses steps, and the servo's feedback loop.
- Formula cheat-sheet rows and 16 glossary terms for the above.

### Changed

- Simulations renumbered in chapters 5, 7, 9, 10, 12, 14 and 16 to make room for the new ones; cross-references updated.

## 1.1.0 - 2026-11-14

Expanded the thinnest sections across the compendium and filled topic gaps.

### Added

- 2.9 Repeated loads: fatigue and wear (new section; 2.9–2.12 renumbered to 2.10–2.13).
- Scotch yoke and a straight-line linkage comparison (Watt, Chebyshev, Hoeken, Roberts, Peaucellier, Sarrus) in chapter 5.
- Differentials in 7.5 and bevel gear mounting in 7.7.
- Belt tensioning, belt clamps, and Cartesian vs CoreXY vs H-bot in 8.4; pulley systems (block and tackle) in 8.6.
- Screw buckling under compression in 9.3.
- Cable chains, motor driver selection, homing and wiring in 16.7.
- Practice project briefs (requirement, chapters, typical trap) in chapter 19.
- Five new simulations: scissor lift (5), block and tackle (8), vertical axis lift/hold/fall (9), printed ball-race turntable (10), printed spring calculator (12).
- Buckling check in the leadscrew critical-speed calculator (9) and shaft twist in the shaft torsion calculator (10).
- New quiz questions in chapters 2, 5, 7, 8, 9, 10 and 12; new formula cheat-sheet rows, fit table rows and glossary terms in chapter 20.

### Changed

- Rewrote and expanded: 2.6 Torsion, 3.5 Heat (Tg vs HDT, creep with temperature, self-heating, annealing), 4.8 Splitting parts, 5.6 Parallelograms and scissors, 9.4 Vertical axes, 10.6 Hinges, 10.7 Thrust loads and turntables, 10.8 Lubrication (plastic compatibility table), 11.5 One-way clutches (now a comparison pointing to chapter 14), 12.5 Plastic springs, 16.6 Solenoids and other actuators, 17.4 Thermal expansion and 17.5 Stick-slip (design remedies).
- The glossary is now sorted alphabetically.

### Fixed

- 17.4 stated that a printed part around a steel rod gets looser when cold; a printed hole around a rod gets looser when warm.

## 1.0.0 - 2026-11-03

First release: the complete 20-chapter compendium.

- Part A, Foundations (1-4): thinking about mechanisms, mechanics, materials, design for 3D printing.
- Part B, Mechanism catalog (5-14): linkages, cams, gears, belts and cables, screws and linear motion, bearings and shafts, intermittent motion, compliant mechanisms, fasteners and springs, latching and clutching.
- Part C, Putting it together (15-18): hybrid builds, actuation, problems and solutions, workflow and tools.
- Part D, Practice (19-20): worked case studies, reference appendix.
- About 60 interactive simulations and calculators, a troubleshooter, a printer profile card, a project checklist generator, and SVG/OpenSCAD export tools.
