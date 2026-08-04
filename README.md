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
| `/engagements` | Engagement model and phase structure |
| `/work` | Portfolio (placeholder) |
| `/writing` | Writing (placeholder) |
| `/about` | About (placeholder) |
| `/capabilities` | Capabilities and institutional work (footer-only deep link) |
| `/contact` | Redirects to booking |

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

Two placeholder tokens appear throughout the built pages and must remain
literal until resolved by the content owner:

- `[ENTRY-OFFER-NAME]` — the named entry offer; replace by search once decided
- `[FIT-PROOF — pending a real, consented case]` — client fit-proof slot; delete
  or replace when a consented case exists
- `[GAP: ...]` markers — open content questions; listed in the source copy docs
