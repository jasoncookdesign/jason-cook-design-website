---
title: "Second engagement type on the site — invariants"
status: draft
date: 2026-10-18
---

# Invariants

Each cross-module invariant has one owning test or check, run against the assembled pages.

| ID | Invariant | Owning test |
|---|---|---|
| INV-01 | Each registry slug has a page at `app/engagements/<slug>/page.tsx`, and the engagements selector and the home fork each render one link per slug, in registry order (offering first), as `/engagements/<slug>`; the selector marks the active type with `aria-current`, and `/engagements` shows the first type's page | `__tests__/engagement-registry.test.tsx` checks the files exist, renders the layout around each route and the home page, and compares links |
| INV-02 | No fee figure in any form (shared matcher in `__tests__/helpers/prices.ts`) appears in the second type's registry entry, selector, or home fork. The Offering page and the home Offering card show `$2,500` and no other figure | `__tests__/offering.test.tsx`, `__tests__/engagement-types.test.ts`, and the same assertion on the engagements and home renders |
| INV-03 | "Every engagement opens the same way", "The first step costs", and "Both engagements open the same way" are absent from the home, chooser, operating, and offering pages | `__tests__/home-entry-points.test.tsx` (home, engagements, operating, and offering renders) |
| INV-04 | The Work page and the Hero state no engagement count: no numeral, no count word, no row index, and the Hero stats are countries, awards, and patents. The page still lists one link per study, assessment included | `__tests__/work-counts.test.tsx` and `__tests__/hero-stat.test.tsx` |
| INV-05 | A case study without a testimonial renders no blockquote. The eight existing studies render theirs unchanged | `__tests__/work.test.tsx` |
| INV-06 (revised) | The Operating page body keeps its phases, portability, pricing, and FAQ copy from the move. The hero and the problem section were deliberately revised on 2026-10-19 (see REQUIREMENTS revision) | `engagements.test.tsx`, `engagements-faq-e1.test.tsx`, `faq-link.test.tsx`, and `engagement-hero-parity.test.tsx` |
| INV-07 | Every CTA subtext on the home, chooser, operating, offering, and contact pages carries the fixed string | `__tests__/cta-subtext.test.tsx`, extended |
| INV-08 | Both names render in the selector. The README and the cutover plan list no `[GAP]` price token, and the token-candidates doc records the chosen names | `__tests__/offering.test.tsx` and a docs assertion in `__tests__/docs.test.ts` |
| INV-09 | Every route's title and description pass the length limits and contain no placeholder token, including the three new static rows | `__tests__/metadata-length.test.tsx` |
| INV-10 | No client term appears in any tracked file or in `.sdlc/`. The check fails when `CLIENT_TERMS_FILE` is unset. It reads `git ls-files`, so it runs after `git add` of every new file; binary files are not scanned and a term wrapped across a line break is not matched, both accepted limits | `.sdlc/check-no-client-terms.sh`, run after staging and before each PR, with the result noted in the PR description |
| INV-11 | Each image block of the new study has non-empty alt text, and each file it references (block `src` and `backgroundImage`) is under 400 KB. The existing eight studies are out of scope | `__tests__/work.test.tsx` |
| INV-12 | The new page's sixth phase names at least two forms of availability, and no forbidden pattern from REQ-15 matches the page | `__tests__/offering.test.tsx` |
| INV-13 | `/engagements` and both new routes have no redirect rule | `__tests__/redirects.test.ts` |

INV-01, INV-03, INV-04, and INV-10 span modules and are the ones a single module's tests would miss.
