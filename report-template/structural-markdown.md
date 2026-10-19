# Structural Markdown

The writing format for JCD reports. Every primitive maps to one layout role. Anything outside this list is not supported; ask for a new primitive instead of improvising.

## Front matter

```yaml
---
title: Report title
subtitle: One line
client: Client name
date: 2026-10-17
version: "0.1"
status: Draft
---
```

## Primitives

| Primitive | Syntax | Rule |
|---|---|---|
| Section marker | `# Name` | Renders as a numbered label above the section |
| Action title | `## Full-sentence finding` | At most 22 words |
| Sub-argument | `### Name` | One MECE cut, stated in one line under the action title |
| Lead-in | `**Lead-in.** Text` | Bold only at paragraph start, at most 8 words, ends in a period. Emphasis elsewhere is italic |
| Governing thought | `::: governing` … `:::` | Executive summary |
| Insight | `::: insight` … `:::` | At most 60 words, one per page (the build fails on a second) |
| Stat row | `::: stats` with `- **value** label` items | Three or four items |
| Rail note | `::: note` … `:::` | Margin note, anchored where it appears |
| Exhibit | `::: exhibit`, title paragraph first, `Source:` paragraph last, table in between | Breaks across pages with a repeating header |
| UI figure | `::: {.figure src="path.png" width="full\|two-thirds\|half" alt="..."}` | Caption paragraph first, then a numbered list of annotations |
| Table | pipe table | First column is the row header. `---:` right-aligns numbers |
| Evidence label | `[Observed]` `[Inference]` `[Speculation]` `[Unverified]` | Renders as a chip |
| Page break | `---` | Page break only |
| Quote | `> text` | Verbatim sourced quotes |
| Source | `[^n]` | Source, publication date, access date |

## UI figure

```
::: {.figure src="img/screen.png" width="two-thirds" alt="Description of the screen"}
Caption sentence, rendered as "Figure N."

1. First annotation text.
2. Second annotation text.
:::
```

Marker positions live in a sidecar next to the image, `screen.notes.csv`, one row per marker: `number,x%,y%` measured from the top left of the image. The author edits text in Markdown and coordinates in the sidecar. Paths are relative to the template folder.

## Lints

The filter warns on stderr for: action title over 22 words, lead-in over 8, insight over 60, paragraph over 120, exhibit without a `Source:` line, figure without alt text, missing sidecar. The typst build fails on two insights on one page.

## Known gaps

- Executive summary uses a full-width governing block, not a left rail.
- Footnotes print at the page foot, not as endnotes.
- Rail notes do not avoid each other or the page foot. Keep one note per screen and none in the last lines of a page.
- An exhibit `Source:` line can land alone at the top of the next page.
- Write `Source:` as plain text. A bold `**Source:**` is not detected.
- Math, code spans, and glyphs missing from Inter fall back or fail, because system fonts are ignored on purpose.
- Not built: claim-label lint, image DPI check, orphaned-insight check, header truncation, cover overflow handling, annotation-list versus sidecar count check.
