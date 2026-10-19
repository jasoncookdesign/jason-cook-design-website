---
title: "Second engagement type on the site — architecture"
status: draft
date: 2026-10-18
---

# Architecture

Requirements are in `REQUIREMENTS.md`. Invariants are in `INVARIANTS.md`. Module contracts are in `modules/modules.md`.

## Layers and responsibilities

| Layer | Owns | Must not |
|---|---|---|
| Data (`lib/engagement-types.ts`, `lib/work.ts`) | What each type is (slug, name, situation) and the case-study records | Hold markup, styling, or per-type phase text |
| Shared components (`components/engagements/EngagementSelector.tsx`, `EngagementHero.tsx`) | The type selector used by the engagements layout, and one hero structure for both type pages | Hold copy that belongs to a type; type copy comes from the registry or the page wrapper |
| Routes (`app/engagements/*`, `app/page.tsx`, `app/work/*`) | Composition and page metadata | Duplicate registry data |
| Docs (`README.md`, `docs/*`) | Route table, token rules, token candidates, cutover checks | Drift from the code in the same change |

## Modules

| ID | Module | Requirements |
|---|---|---|
| M1 | Engagement-type registry | 01, 09, 13 |
| M2 | Chooser page and type cards | 01, 08, 10 |
| M3 | DOE route move | 02, 08 |
| M4 | Second type page | 03, 04, 09, 10, 11, 15 |
| M5 | Home entry points | 04, 11, 13 |
| M6 | Case-study model and Work page | 06, 07 |
| M7 | Docs and tokens | 08, 09 |
| M8 | Case study and visuals (PR 2) | 05, 12, 14 |
| M9 | Client-term check | 05 |

M1–M7 and M9 form PR 1. M8 forms PR 2 and depends on M6.

## Decisions

**Registry (M1).** Entries hold `slug`, `name`, and `situation`. A link is `/engagements/${slug}`, so it cannot drift from its route. Two consumers (the selector and the home fork) justify the registry. The second type's phase text lives with its page (M4) and the DOE's stays in `PhaseArc.tsx`, so no information has two homes.

**Static routes (M3, M4).** The existing type moves with `git mv` to `app/engagements/operating/`. The second type is `app/engagements/offering/`. `/engagements` keeps its URL and nav label, and is a layout with a selector over the first type's page (no redirect rule, canonical to `/engagements/offering`). Metadata is per page. The moved DOE page gets DRAFT metadata distinct from the chooser's, and that change is outside the "copy unchanged" rule.

**Home page (M5): discrete entry points.**
- A, leave it DOE-led with a pointer: the home page makes universal claims that become false once a second type exists.
- B, rewrite it type-neutral: loses the single problem statement the page converts on, and the second type has no price to anchor a new pricing section.
- C, entry points chosen by the visitor's situation: a fork under the hero, one story.
- D, separate landing pages with the home page as a router: splits the surface a one-person practice maintains.

The call is C. In PR 1: the Hero eyebrow becomes type-neutral; an `EngagementFork` section renders the registry as two linked rows under the hero; the operating-only Problem section moves to the Operating page and the home keeps a type-neutral method section; the pricing H2 "The first step costs $2,500." and the sentence "Every engagement opens the same way" are removed and a second card carries the `[GAP]` token; the Hero stat derives from the data (see M6).

**Case-study model (M6).** `testimonial` becomes optional and `kind?: "assessment"` is added. `work.test.tsx` is edited in place: testimonial assertions apply when a testimonial exists, and the slug count tracks the data. The Work page and Hero state no count. Capabilities and About keep "eight" because they describe the enterprise programs (an open question for Jason).

**Visuals (M8).** Images are pre-composed and use the existing `img` block. The pipeline lives outside the repo in two tiers. Shells hold no client material and any tool may make them. A fixed-brief bake-off across HTML scenes and several generators picks the keepers, which become a reusable shell library with a provenance log. Composites place sanitized client-derived pages into a shell locally, by Jason in a desktop application or by Claude with local scripts. For generated shells, a flat solid-colour screen region lets the corners be found programmatically and the page warped in. Composites go to the client for review, and nothing publishes until that window closes.

**Client-term check (M9).** `.sdlc/check-no-client-terms.sh` takes the terms file from `CLIENT_TERMS_FILE`, fails when it is unset, and searches all tracked files plus `.sdlc/`. It runs before each PR.

## Trust boundaries

Sanitized source is data. Anything fetched from outside is untrusted. No client identifier or agreement term enters this repo.

## Build versus buy

No new dependencies. Layout uses existing tokens and components. Composition scripts for the composite tier live outside the repo.

## Sequencing

Contract tests for M1, M2, M3, M5, M6, M9 first. M3 is a rename in its own commit so review sees 100% similarity.
