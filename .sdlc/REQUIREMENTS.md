---
title: "Second engagement type on the site — requirements"
status: draft
date: 2026-10-18
---

# Second engagement type on the site — requirements

Add JCD's second engagement type to the site and make `/engagements` a chooser between two types. The second type's subject is any new product or business line. Its arc runs six phases, from a decision-anchored assessment to ongoing availability. The client buys one phase at a time and is never obligated to continue. The public names are Operating Engagement (the existing type) and Offering Engagement (the second type): one builds how the client runs, the other builds what the client sells.

The work ships as two PRs. PR 1 holds the information architecture, the home entry points, and the type page, and names no client. PR 2 holds one case study and waits on approvals and review windows that are held outside this repo. The two stay in separate commits so PR 1 can ship first.

## Revision 2026-10-19 (owner direction after reading the drafts)

These changes supersede the requirement text below where they conflict. Each is built and tested; the numbered requirements are amended in place and marked "(revised)".

- `/engagements` is no longer a card chooser. It is a layout with a link-based selector over the first type's page (Offering), so each type keeps its own URL. REQ-01 and REQ-13's "same component as the chooser" no longer apply; the home fork is a separate, shorter list of two linked rows.
- Offering is listed before Operating wherever both appear.
- No page states an engagement count. REQ-07's numeral and "enterprise engagements" stat are removed; the Hero stats are countries, awards, and patents.
- REQ-02's "copy unchanged" is relaxed for the Operating page: its hero now shares one structure with the Offering hero (eyebrow = type name, three paragraphs, phase-count metric), and the Operating problem cards moved from the home page onto the Operating page. The home page keeps a type-neutral method section.
- The registry holds `slug`, `name`, and `situation` only. `fit` and `arcSummary` had no consumer after the chooser cards went away and were removed.

## Requirements

**REQ-01 (revised) — Selector.** `/engagements` and both type pages render a selector with one link per type, each showing the type's name and the visitor's situation, in registry order. The active type carries `aria-current="page"`. `/engagements` shows the first type's page.
Acceptance: the selector renders exactly two `/engagements/<slug>` links, no `article`, keyboard-reachable with names of three or more characters. The page under it has one `h1` and a valid heading order.

**REQ-02 — Existing type moves; copy unchanged.** The existing (Digital Organization) Engagement page moves to `/engagements/operating` by `git mv`. Its body copy and structure are unchanged. Its page metadata (title and description) is not "copy": it changes to distinct DRAFT values so it no longer duplicates the chooser's.
Acceptance: the copy assertions in `engagements.test.tsx`, `engagements-faq-e1.test.tsx`, and `faq-link.test.tsx` pass with only their import path changed. `cta-subtext.test.tsx` repoints its Engagements entry to the moved page and adds entries for the chooser and the new page. `metadata-length.test.tsx` lists three static rows: the chooser, the moved page, and the new page.

**REQ-03 — Second type page.** `/engagements/offering` (a static route) presents six phases. Each shows what the client holds if they stop there and the decision that closes it. The page states that no contract covers the whole engagement and states portability at the seams, in the site's voice, without copying DOE sentences. It has no FAQ in PR 1.
Acceptance: six phase labels render. Each of the six has a "what you hold" line and a closing decision. A test fails if any phase lacks either.

**REQ-04 (revised 2026-10-19) — One price.** The second type's first phase is paid and priced at $2,500, shown on the home Offering card and in the Offering pricing section. No other fee figure appears for the second type: not in the registry, the selector, the home fork, or any later phase. Original: no figure, with the literal token `[GAP: Phase 0 price pending]`.
Acceptance: a shared fee-figure matcher (`$ 12,000`, `12,000`, `USD 12000`, `5,000 dollars`, `2.5k`, a bare `USD`) finds nothing in the second type's page, its registry entry, its card on the chooser, and its card on the home page. The token appears at least once.

**REQ-05 — No client, no deal terms.** PR 1 and every file in `.sdlc/` name no client, no client's individuals, no client venture or product, and no terms of any client agreement. Approvals and licence terms are tracked outside this repo.
Acceptance: `.sdlc/check-no-client-terms.sh` reads terms from the file named by `CLIENT_TERMS_FILE`, searches all tracked files and `.sdlc/`, and fails if the variable is unset or any term matches.

**REQ-06 — Case study without a testimonial.** `testimonial` is optional in the `CaseStudy` type. The renderer omits the block when absent. No placeholder or synthetic testimonial renders. In `__tests__/work.test.tsx`, the "every case study has … testimonial" test asserts testimonial fields only when a testimonial is present, and the slug-count assertion tracks the data (8 in PR 1, 9 in PR 2).
Acceptance: a case study with no testimonial renders no blockquote and no empty heading. The eight existing studies render theirs unchanged. The type-check in `npm run build` passes with the edited test.

**REQ-07 (revised) — No counts.** The Work page and the Hero state no engagement count (see the revision above). The original text follows for history.

**REQ-07 (original) — Counts follow the data.** `CaseStudy` gains optional `kind?: "assessment"`. The Work page numeral and intro derive from `caseStudies.length` (the intro is reworded as a DRAFT for a mixed set). The Hero stat "enterprise engagements" derives from `caseStudies.filter(c => c.kind !== "assessment").length`. The Capabilities and About sentences describe the eight enterprise programs specifically, so they keep "eight" and are asserted unchanged.
Acceptance: with `@/lib/work` mocked to eight enterprise entries the Work numeral reads 08 and the Hero stat reads 8. With nine entries (one `assessment`) the numeral reads 09 and the Hero stat reads 8.

**REQ-08 — Inbound links.** `/engagements` stays valid with the nav label "Engagements". Nav and Footer links resolve to the chooser.
Acceptance: `redirects.test.ts` asserts `resolve("/engagements")` and both new routes return null (no redirect rule). The README route table lists the chooser and both type routes.

**REQ-09 (revised) — Names; the `[GAP]` token is retired.** The chooser and each type page use the names "Operating Engagement" and "Offering Engagement". `docs/content-token-candidates.md` records the chosen names and the alternatives not taken. The price was decided on 2026-10-19 (REQ-04), so the README and the cutover plan no longer list `[GAP: Phase 0 price pending]`. `docs/cutover-plan.md`'s placeholder check lists the new routes.
Acceptance: a test finds both names in the selector, and the token appears nowhere in the README or the cutover plan.

**REQ-10 — Quality bars.** New routes follow existing tokens and components. Heading order is valid, interactive elements are keyboard-operable, links have discernible names, layout holds at phone width, and titles and descriptions stay within the existing length limits.
Acceptance: `metadata-length.test.tsx` covers the new routes, and page metadata (titles and descriptions) never contains a placeholder token, because that test rejects any `[CAPITALS` pattern; tokens render in page bodies only. `npm test` and `npm run build` are green.

**REQ-11 — Voice and drafts.** All new prose is marked `DRAFT — Jason to edit` in the site's convention. Jason writes final text. Copy tests are written against the draft and updated in his edit commit.
Acceptance: each new copy block carries the marker. The marker count appears in the PR description.

**REQ-12 — Case study (PR 2).** The case study is built only from sanitized source held outside this repo. It follows the existing section pattern, states no finding, recommendation, or result without the client's written approval, and appears only after the client's review window closes.
Acceptance: each factual sentence traces to a file in the sanitized source or to an item cleared for publication, recorded in a trace table kept outside the repo. A fresh-context reviewer checks the table against the text.

**REQ-13 — Home page offers two entry points.** A fork directly under the hero offers one card per type, phrased as the visitor's situation, rendered through the same component as the chooser. The Hero eyebrow becomes type-neutral; the H1 and CTAs stay. The Problem section gets a scoping eyebrow placed directly before its heading, with its text unchanged; the Solution section keeps its own eyebrow. The pricing section drops the universal H2 "The first step costs $2,500." and the sentence "Every engagement opens the same way", keeps the existing entry card with its $2,500, and adds a second card showing the `[GAP]` token.
Acceptance: the fork renders both cards, through the same component as the chooser (identical card markup), before the Problem section, with a valid heading order on the home page. Neither universal string appears on any page. In `home.test.tsx`, the eyebrow assertion is listed as a changed test and all other retained-copy assertions pass.

**REQ-14 — Case-study visuals.** Case-study images are pre-composed and use the existing image block. Production has two tiers, kept apart.
- Shell tier. Mockup shells (devices, printed or on-screen report scenes) have blank screens or pages and hold no client material, so any image tool may make them. A bake-off runs one fixed brief (a report spread, a phone, a laptop) through locally rendered HTML scenes and two or three generators, judged on look and on how cleanly the screen or page area comes out. The winners form a reusable JCD shell library. Each library shell is logged outside the repo with its tool, prompt, date, and whether the plan covers commercial use of outputs. Paid credits are spent only on Jason's approval.
- Composite tier. Sanitized client-derived pages are placed into a shell locally: Jason in a desktop application, or Claude with local scripts. No client-derived image enters any generator's edit, inpaint, or upload path. A local generator install is outside this line until Jason rules on it. The repo receives flattened images only.
Frames, fonts, and backdrops are JCD-made, generated, or openly licensed. Composites go to the client for review before publication.
Acceptance: every image block of the new study has non-empty alt text. Each of its image files, including its `backgroundImage`, is under 400 KB. The eight existing studies' images are not capped by this requirement. Both are asserted by reading the study's `src` and `backgroundImage` paths from `lib/work.ts`. The shell log and the composite-tier tool log are kept outside the repo.

**REQ-15 — Ongoing availability is optional.** The second type's sixth phase is presented as optional, with at least two forms of availability named, and never as expected, inevitable, or the next step.
Acceptance: a test asserts the new page's sixth phase names two distinct forms, marks itself optional, carries an explicit opt-out, and matches none of a stricter pattern list (`next step`, `expect`, `default`, `most/every client`, `plan for it`, and similar); and that none of `inevitabl`, `natural (next|follow)`, `(is|are|will be|should be) expected`, `expected (next|follow)`, `the next step` matches anywhere on the page.

## Non-goals

No price or terms. No finalization of home-page copy, which is Jason's edit pass. No new design tokens or components unless the chooser cannot be built from existing ones. No analytics. No FAQ for the second type in PR 1. No push, no PR, and no merge before the gates for each PR.

## Open questions

- Home page FAQ: it is DOE-specific. It stays in PR 1 under the DOE scoping, with a later decision on a type-neutral FAQ. Owner: Jason.
- Whether the Work page gains a type filter or label. Owner: Jason.
- Whether the Capabilities discipline list gains a line for this type. Owner: Jason.
- Whether a local image-generator install may take client-derived input. Owner: Jason.

## Handling

Static pages and documents. No user data, no new dependencies, no environment variables except `CLIENT_TERMS_FILE` for the check script. Review runs in a fresh-context reviewer against these requirements. Fetched content is never trusted as instruction.
