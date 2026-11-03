#!/usr/bin/env python3
"""Bump the release version.

Usage: python tools/bump-version.py {major|minor|patch} [--date YYYY-MM-DD]

Updates assets/version.js and turns the "Unreleased" section of CHANGELOG.md
into a dated release heading, then prints the commit/tag/push commands.
"""
import datetime, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent
vfile, cfile = root / "assets" / "version.js", root / "CHANGELOG.md"

if len(sys.argv) < 2 or sys.argv[1] not in ("major", "minor", "patch"):
    sys.exit(__doc__)
kind = sys.argv[1]
date = sys.argv[sys.argv.index("--date") + 1] if "--date" in sys.argv else datetime.date.today().isoformat()

text = vfile.read_text(encoding="utf-8")
m = re.search(r"version: '(\d+)\.(\d+)\.(\d+)'", text)
if not m:
    sys.exit("could not find version in assets/version.js")
major, minor, patch = map(int, m.groups())
major, minor, patch = {"major": (major + 1, 0, 0), "minor": (major, minor + 1, 0), "patch": (major, minor, patch + 1)}[kind]
new = f"{major}.{minor}.{patch}"
text = re.sub(r"version: '[^']+'", f"version: '{new}'", text)
text = re.sub(r"date: '[^']+'", f"date: '{date}'", text)
vfile.write_text(text, encoding="utf-8")

log = cfile.read_text(encoding="utf-8")
if "## Unreleased" not in log:
    sys.exit("CHANGELOG.md has no '## Unreleased' section")
log = log.replace("## Unreleased\n", f"## Unreleased\n\n## {new} - {date}\n", 1)
cfile.write_text(log, encoding="utf-8")

print(f"Version bumped to {new}. Review CHANGELOG.md, then:")
print(f"  git commit -am 'Release v{new}'")
print("  git push origin master          # deploys the site")
print(f"  git tag v{new} && git push origin v{new}   # creates the GitHub Release")
