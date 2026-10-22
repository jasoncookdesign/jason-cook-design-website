---
version: alpha
name: Jason Cook Design — blueprint
description: Dark-only drawing-set register. Values read from design/blueprint/hero/home.html (the :root block and the rules named below). Supersedes the editorial-proof spec in design/DESIGN.md for the new site.
colors:
  paper: "#0D2438"
  paper-raised: "#133049"
  ink: "#E8EFF5"
  ink-secondary: "#A9BDCD"
  rule: "#5E7E96"
  guide: "#173650"
  guide-sketch: "#2F5775"
  accent: "#FF9B6B"
  button-bg: "#E8EFF5"
  hover-fill: "#58C4C6"
  button-ink: "#0D2438"
typography:
  display:
    fontFamily: Newsreader
    fontSize: 70px
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.022em
  headline:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: -0.02em
  lead:
    fontFamily: Newsreader
    fontSize: 25px
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: Newsreader
    fontSize: 19px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.14em
  button:
    fontFamily: IBM Plex Mono
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.2
rounded:
  none: 0px
spacing:
  pad: 24px
  pad-mobile: 18px
  gutter: 44px
  gutter-mobile: 30px
components:
  button-primary:
    backgroundColor: "{colors.button-bg}"
    textColor: "{colors.button-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: 52px
    padding: 24px
  sheet-label:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
  decision-line:
    backgroundColor: "{colors.accent}"
  rule-line:
    backgroundColor: "{colors.rule}"
  column-guide:
    backgroundColor: "{colors.guide}"
---

# Blueprint — design spec (dark only)

## Overview
The page is a drawing sheet. A permanent left binding margin (the annotation gutter, 44px, 30px on phones) and a registration mark frame the sheet; content sits in ruled cells on a 12-column grid with faint column guides. Sections are numbered sheets with tags such as `A-101 / HERO`. Figures are numbered (`FIG. 0`, `FIG. 1`). The footer is a title block. The brand mark is the JCD scanline mark (see `design/logo/mark.py`).

## Colors
Field `#0D2438`. Ink `#E8EFF5` for statements, `#A9BDCD` for secondary text and labels, rule `#5E7E96` (3.69:1 on the field, passes as a mark) for lines that carry meaning. `guide` `#173650` and `guide-sketch` `#2F5775` are decorative only; never carry information. Orange `#FF9B6B` is reserved for the single decision point of a sheet; it is never small text. `color-scheme: dark` is set; the light theme does not exist.

## Typography
Newsreader (variable, optical sizing on) for statements and body; IBM Plex Mono for labels, tags, buttons, figures, and the wordmark. Sentence case in serif. Mono labels are the only uppercase. Mobile: display 46px, lead 22px, headline 36px. Buttons are 52px tall (44px minimum anywhere), mono 15px.

## Layout
24px side padding (18px on phones). Rules are 1px `rule`; the page's major dividers are 1px `ink`. No card fills, no shadows. 12-column grid; the hero puts the headline in columns 1 to 8 and a mark cell and the price row in 9 to 12. Below 1200px the hero is a single column in the order headline, call to action, mark, supporting paragraph.

## Motion
One easing curve, `cubic-bezier(.2, .7, .2, 1)`, and one duration, 250 ms (`--ease`, `--t`); both are zero under `prefers-reduced-motion`. Interactive things ease between states (links, buttons, the bar controls, rows, cells, the FAQ, the segmented control, the docked bar, the mobile menu); button arrows and row chevrons nudge 4px on hover; non-interactive elements never respond to hover. Blocks below the fold fade and rise 12px once as they scroll in (an `IntersectionObserver`, 500 ms). Nothing is hidden without JavaScript, under reduced motion, or while the layer view is on. The hero drawing draws itself in once on load.

## Accents
The signal orange `#E8723C` (from the approved lockups) is a fine accent, never a fill: the marker on eyebrows, the nav hover underline, the keyboard focus ring, and the pressed layers icon. Primary actions and the mark stay monochrome. The chosen option of a segmented control is filled with the steel-blue `#8FB2CC` with field-colored text.

## Elevation and depth
None in the page. The optional layer view lifts plates in 3D and draws the measured sketch layer beneath; it is off by default and a flat overlay under reduced motion.

## Shapes
Square corners (no radius) on every control and cell. The only curves are the brand mark's own circular arcs (radius 6 and 26 in a 84 by 100 letter cell).

## Components
Primary button: ivory fill, field-colored mono label, 1.5px ivory border, 52px high, square. On hover a solid control stays solid and takes the light-blue `hover-fill` (aqua `#58C4C6`, `--hover-fill`, the teal from the logo exploration) with its field-colored label: the primary button, the ghost button, and the media pause/play control, where the label stays field-colored. Text links take the same aqua as their text and underline color on hover and keyboard focus; navigation links keep the orange underline. Rows, cells, tabs and the segmented control keep the raised-surface hover, since their light labels would not survive a light fill. Layers toggle: an understated 44px square icon button (four stacked layers), transparent with a 1px rule border, accessible name "Layers" and `aria-pressed`. Sheet top: a bar with a mono figure number, a serif title, and a mono right-hand note, with a 1px rule beneath. Docked header: one sticky header that compacts after scrolling and keeps the mark, the nav, the primary action, and the layer toggle.

## Do's and Don'ts
Do keep the primary action reachable in every viewport (visible or in the sticky header). Do mark every placeholder as `[SAMPLE: ...]` and never ship one. Do keep motion off under `prefers-reduced-motion` and keep all content visible without JavaScript. Don't use gradients, glow, stock imagery, illustration, or old-work screenshots as hero or proof. Don't use orange for more than one decision point per sheet.
