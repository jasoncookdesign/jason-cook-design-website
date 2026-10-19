# Jason Cook Design — Website

Marketing website for Jason Cook Design (JCD), a practice that assesses, designs, and builds the products and systems a business needs.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) — component styling (Nova preset)
- [Base UI](https://base-ui.com) (`@base-ui/react`) — unstyled component primitives

## Routes

| Route | Content |
|---|---|
| `/` | Home |
| `/engagements` | Engagement selector over the first type's page (canonical: `/engagements/offering`) |
| `/engagements/offering` | Offering Engagement: six phases from the decision to launch |
| `/engagements/operating` | Operating Engagement: model, phases, and pricing |
| `/work`, `/work/[slug]` | Case studies |
| `/writing`, `/writing/[slug]` | Writing |
| `/about` | About the practice |
| `/capabilities` | Capabilities and institutional work (reached from the footer only) |
| `/contact` | Booking page for the strategy call |
| `/legal` | Privacy Policy, Accessibility Statement and Terms, one section each (footer links target `#privacy`, `#accessibility`, `#terms`) |

URLs from the previous site (`/cs01.html`–`/cs08.html`, `/blog/...`, `/calendar/...`) redirect to their new homes; see `redirects()` in `next.config.ts`. Redirects need a server host (e.g. Vercel). A static export would drop them.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running tests

```bash
npm test
```

## Building for production

```bash
npm run build
```

## Content tokens

These placeholder tokens appear in the built pages and must stay literal until the content owner resolves them:

- `[ENTRY-OFFER-NAME]`: the named entry offer. Replace by search once decided. Draft candidates: `docs/content-token-candidates.md`.
- `[PRACTICE-NAME]`: the name of the practice discipline (Capabilities page). Replace by search once decided. Draft candidates: `docs/content-token-candidates.md`.
- `[UEI]`, `[CAGE-CODE]`, `[NAICS-CODES]`, `[SAM-STATUS]`: the company's SAM.gov identifiers and registration status (Capabilities page, company data). Filled from SAM.gov by the owner and never guessed.
- `[LEGAL: <section> text pending]`: legal text for each `/legal` section. Supplied by the owner and never drafted.
- Any other `[GAP: ...]`: an open content question. These should not render. Tests guard the pages that had them.

Copy marked with a `DRAFT — Jason to edit` comment in the source is placeholder prose awaiting the owner's edit.

## Docs

- `docs/cutover-plan.md`: the plan for moving jasoncookdesign.com from GitHub Pages to Vercel. Not yet executed.
- `docs/content-token-candidates.md`: draft name candidates for the open content tokens.
