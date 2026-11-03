// Clearance / fit test coupon for FDM printers (OpenSCAD, free: openscad.org).
// Prints a plate with holes of increasing clearance plus matching pegs.
// Print "plate" and "peg" flat/vertical, then "plate_upright" and "peg_horizontal"
// to see how orientation changes the fit. Use the SAME material and settings as the real part.
//
// Pick one value for `part`, render (F6), export STL, slice.

part = "plate";             // "plate" | "plate_upright" | "peg" | "peg_horizontal"
d = 8;                      // nominal pin / hole diameter in mm (use the size you will actually use)
steps = [0, 0.1, 0.2, 0.3, 0.4, 0.5];  // extra DIAMETER added to each hole in mm
t = 4;                      // plate thickness in mm
$fn = 96;

pitch = d + 6;

module plate() {
  difference() {
    translate([-pitch / 2, -pitch / 2, 0]) cube([pitch * len(steps), pitch, t]);
    for (i = [0 : len(steps) - 1])
      translate([i * pitch, 0, -1]) cylinder(d = d + steps[i], h = t + 2);
  }
  // engraved-style raised labels: the extra clearance in tenths of a mm
  for (i = [0 : len(steps) - 1])
    translate([i * pitch - 2, -pitch / 2 + 1, t])
      linear_extrude(0.6) text(str(round(steps[i] * 10)), size = 3);
}

if (part == "plate")
  plate();
else if (part == "plate_upright")
  // stands on its long edge so the hole axes are horizontal
  translate([0, 0, pitch / 2]) rotate([90, 0, 0]) plate();
else if (part == "peg")
  cylinder(d = d, h = 15);
else if (part == "peg_horizontal")
  translate([0, 0, d / 2]) rotate([0, 90, 0]) cylinder(d = d, h = 15);
