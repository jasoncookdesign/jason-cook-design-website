# Design records

What the blueprint redesign was built from. The running site is the product; these files are the sources behind its brand and look.

- `blueprint/DESIGN.md` — the design spec for the blueprint register (colors, type, layout, motion, accents, components, do's and don'ts).
- `logo/mark.py` — generator for the JCD mark (three letters on an 84 x 100 cell, circular corner arcs of radius 6 and 26, one stripe 8 thick equal to the J's notch). `logo/svg/` holds the exported marks, cards, and favicon.
- `logo/construction/construction.py` — generator for the construction drawing shown on the home page; `lib/jcd-construction.ts` is produced from it.
- `og/og.html` — source of the 1200 x 630 share image (`app/opengraph-image.png`); render it at that size in a browser.

Recommended before launch: a trademark clearance search for the mark.
