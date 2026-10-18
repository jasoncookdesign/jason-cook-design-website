# JCD report template

Renders Structural Markdown into a print-ready PDF (US Letter) with a dark cover and light content pages. Built on Typst, with pandoc as the Markdown front end and a Lua filter for custom blocks. Fonts are Inter and IBM Plex Mono, bundled under `fonts/` (SIL OFL licenses included).

## Prerequisites

`typst` and `pandoc` on the path. On macOS: `brew install typst pandoc`.

## Usage

```
./build.sh samples/sample.md out.pdf
PNG=1 ./build.sh samples/sample.md out.pdf   # also writes out-{n}.png pages
```

Run from any directory. Paths inside the Markdown (figure images) resolve relative to this folder. Lint warnings print to stderr.

## Files

- `structural-markdown.md` — the writing syntax and limits
- `template.typ` — pandoc template wiring metadata and body into the library
- `lib.typ` — layout components and design tokens
- `structural.lua` — pandoc filter mapping blocks to components, plus lints
- `samples/` — fictional sample documents; `hostile.md` fails on purpose (two insights on one page)
