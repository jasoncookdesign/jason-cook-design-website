# Usage guide and known layout defects

Write in the primitives from `structural-markdown.md`, build with `./build.sh in.md out.pdf`, and read the warnings that print as `LINT:`. Always view the page images (`PNG=1`) before sending a report; the defects below are visible only on the rendered page.

## Workflow

1. Draft in Markdown. Keep figure images and their `.notes.csv` sidecars inside this folder (the build is rooted here, so absolute paths elsewhere fail).
2. Build with `PNG=1 ./build.sh in.md out.pdf` and look at every page.
3. Fix lint warnings, then fix layout by editing the Markdown (the workarounds below). Do not edit `lib.typ` per report.
4. Hard stop: two insight boxes on one page fail the build. Move one or add `---` between them.

## Layout defects and workarounds

| Defect | What you see | Workaround |
|---|---|---|
| Rail notes collide | Two notes close together print on top of each other | At most one `::: note` per screen of text; space them with body text between |
| Note near page bottom | The note runs past the margin onto the footer | Move the note above the paragraph, or insert `---` so the paragraph starts a new page |
| Orphaned exhibit source | The `Source:` line alone at the top of the next page | Shorten the table or text above it, or add `---` before the exhibit so it starts a page |
| Long running header | Long title or client wraps to three lines | Keep `title` under about 45 characters and `client` under about 30 |
| Long cover text | A long title and subtitle run into the metadata block | Title under about 60 characters, subtitle one line |
| Executive summary | Governing thought is a full-width block, not a left rail | Accept for now; keep the governing thought to two sentences |
| Footnotes | Print at the page foot, not as endnotes | Keep notes short; one or two per page |
| Bold Source | `**Source:**` is not recognized | Write `Source:` as plain text |
| Edge markers | A marker at 0 or 100 percent is clipped | Keep marker coordinates between 3 and 97 |
| CSV format | Header rows or `%` signs fail the build | Sidecar rows are plain `number,x,y` numbers, no header |
| Math, code, symbols | Fall back to missing fonts or fail | Avoid math, code spans, and glyphs outside Inter (such as check marks) |

## What the lint catches

Action title over 22 words, lead-in over 8, insight over 60, paragraph over 120, exhibit without a `Source:` line, figure without alt text, missing sidecar, annotation list count different from sidecar marker count, malformed stats, exhibit, or figure blocks. Not checked: claim labels, image resolution, an insight orphaned at a page end, five or more stat items, and unsupported constructs such as `####` headings or body bullet lists. Do not use those.

## Fix list for later

Rail-note collision handling, source-line stickiness, header and cover truncation, left-rail executive summary, endnotes, claim-label and DPI lints. Decide after the first real report shows which ones matter.
