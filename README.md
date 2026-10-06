# Jason Cook Design — Website

Marketing website for Jason Cook Design (JCD), a systems architecture and implementation practice for startups and midmarket operators.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) — component styling (Nova preset)
- [Base UI](https://base-ui.com) (`@base-ui/react`) — unstyled component primitives

## Routes

| Route | Content |
|---|---|
| `/` | Home |
| `/engagements` | Engagement model, phases, and pricing |
| `/work`, `/work/[slug]` | Eight case studies |
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

- `[ENTRY-OFFER-NAME]`: the named entry offer. Replace by search once decided.
- `[PRACTICE-NAME]`: the name of the practice discipline (Capabilities page). Replace by search once decided.
- `[LEGAL: <section> text pending]`: legal text for each `/legal` section. Supplied by the owner and never drafted.
- `[GAP: ...]`: open content questions. None should render. Tests guard the pages that had them.

The home page's fit-proof slot (`[FIT-PROOF — pending a real, consented case]`) is switched off with `SHOW_FIT_PROOF` in `components/home/ProofSection.tsx` until a real, consented case exists.
