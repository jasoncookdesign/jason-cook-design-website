---
title: "Second engagement type on the site — module contracts"
status: draft
date: 2026-10-18
---

# Module contracts

## M1 — Engagement-type registry (`lib/engagement-types.ts`)

Owns: the list of engagement types.
Interface: `engagementTypes: EngagementType[]` with `EngagementType = { slug: string; name: string; situation: string; fit: string; arcSummary: string }`.
Rules: exactly two entries, slugs `operating` and `offering`. No `$` followed by a digit in the second entry's strings. Every string is non-empty.
Must not: import a component, hold markup, or hold phase text.

## M2 — Chooser page and cards

Owns: `app/engagements/page.tsx` and `components/engagements/EngagementTypeCards.tsx`.
Interface: `<EngagementTypeCards />` renders one card per registry entry: the situation as heading, the name as label, the fit sentence, the arc summary, and a link to `/engagements/${slug}`.
Rules: one `h1` on the page, an `h2` per card, one instance of the fixed CTA subtext on the page.

## M3 — DOE route move

Owns: `app/engagements/operating/page.tsx`, a `git mv` of the current page.
Rules: body unchanged. Metadata replaced with distinct DRAFT values that contain no placeholder token. Imports in tests change path only.

## M4 — Second type page

Owns: `app/engagements/offering/page.tsx` and `components/engagements/offering/*`, including the phase data.
Rules: six phases, each with `holds` and `closes`. Statements on no whole-engagement contract and on portability. The `[GAP]` token and the type's name. The fixed CTA subtext. No `$` and digit. The sixth phase is optional and names two forms of availability.

## M5 — Home entry points

Owns: `components/home/EngagementFork.tsx`, and edits to `Hero.tsx` (eyebrow; the stat derives from data), `StartSection.tsx` (the shared method; the operating problem cards moved to `OperatingProblem.tsx`), `PricingSection.tsx` (two cards, no universal claim, no universal H2), and `app/page.tsx` (insert the fork).
Rules: Hero H1 and both CTAs stay. The fork renders cards through M2's component. `home.test.tsx` changes the eyebrow assertion and adds fork and pricing assertions.

## M6 — Case-study model and Work page

Owns: `lib/work.ts` (`testimonial?`, `kind?`), `components/work/WorkCaseStudyContent.tsx` (conditional blockquote), `app/work/page.tsx` (numeral and intro from data, DRAFT intro), and the edits to `__tests__/work.test.tsx`.
Rules: the eight existing entries are unchanged. The Capabilities and About wording is untouched and asserted unchanged.

## M7 — Docs and tokens

Owns: `README.md` (route table; token section carries the `[GAP]` exception), `docs/content-token-candidates.md` (a table per type), `docs/cutover-plan.md` (placeholder check lists the three tokens and the new routes).

## M8 — Case study and visuals (PR 2)

Owns: one `lib/work.ts` entry with `kind: "assessment"`, its images in `public/images`, and the README "case studies" count in the route table.
Rules: sanitized source only; trace table outside the repo; no finding, recommendation, or result without written approval; pipeline per REQ-14; merges only after the gates held outside this repo.

## M9 — Client-term check

Owns: `.sdlc/check-no-client-terms.sh`.
Interface: `CLIENT_TERMS_FILE=<path> bash .sdlc/check-no-client-terms.sh` exits non-zero if the variable is unset, the file is unreadable, or any term matches in a tracked file or `.sdlc/`.
Rules: shell and `grep` only. It never prints the terms it matched; it prints the file and line. It reads `git ls-files`, so it must run after `git add` of every new file.

## Seams the contract tests pin

- Chooser card: an `article` around a type link. It holds exactly one visible `h2` whose text equals the registry `situation`; the `name`, `fit`, and `arcSummary` are each the whole text of their own visible element; the link is visible, in the tab order, and has an accessible name of at least three characters. The page has exactly two `article`s and two links beginning `/engagements/`, one per slug, and a headline of at least three words.
- Home fork: the same card component, so each card's markup is identical to the chooser's, appearing in document order before the text "The old way". The Problem section's eyebrow is the `p` immediately before its `h2`.
- Home pricing: each entry is a `div` with class `rounded-[6px]`. The second entry holds `[GAP: Phase 0 price pending]` and no `$` followed by a digit. The first keeps `[ENTRY-OFFER-NAME]` and `$2,500`.
- Offering page: exactly one `ol`, six direct `li`. Each `li` has an `h3` label and one `dl` with exactly two `dt`/`dd` pairs; the two `dt` texts differ and each `dd` is longer than ten characters. The sixth `li` holds a `ul` of at least two distinct entries and a phrase marking it optional (`optional`, `if you want`, `only if`, or `your choice`) and an explicit opt-out (for example `no obligation`, `decline`, `skip`, `stop here`). Phase labels, "holds" statements, and "closes" statements are distinct across the six phases, and the same two `dt` labels appear in every phase. Every source file of the page carries `DRAFT — Jason to edit`, and `components/engagements/offering/` holds at least one `.tsx`.
- Counts: the Work page shows the zero-padded entry count as a numeral and as the last row index. The Hero stat value is the element immediately before the label "enterprise engagements".
- Client-term check: scans `git ls-files` plus everything under `.sdlc/` (tracked or not), matches case-insensitively as fixed strings, skips blank and `#` lines, fails on an unset variable, an unreadable file, or a file with no terms, and prints file and line but never the term.
