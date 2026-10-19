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

`/robots.txt` and `/sitemap.xml` are generated from `app/robots.ts` and `app/sitemap.ts`; the sitemap reads the case-study and post registries, so a new entry is listed automatically, but a new fixed page must be added to the `pages` array in `app/sitemap.ts`. Baseline security headers (nosniff, frame denial, referrer policy, HSTS, permissions policy) are set in `next.config.ts`. HSTS is host-only on purpose: `includeSubDomains` would pin every subdomain to HTTPS for two years. There is no content security policy yet; add one after testing the Cal.com embed and Google Tag Manager on a Vercel preview.

Case-study animations are video loops, not GIFs. An `img` block in `lib/work.ts` with a `loop: { width, height }` field renders as `LoopVideo`: `src` is the poster still (`/images/loops/<name>.jpg`), and `<name>.webm` and `<name>.mp4` sit beside it. Loops play only while on screen, show the poster to visitors who prefer reduced motion, and have one pause/play button (WCAG 2.2.2). To make one from a GIF: `ffmpeg -i in.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,hqdn3d=2:1.5:3:3,format=yuv420p" -c:v libx264 -crf 25 -preset veryslow -movflags +faststart -an -fps_mode vfr out.mp4`, the same filter with `-c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1` for the WebM, and `-frames:v 1 -q:v 3` for the poster.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

- `NEXT_PUBLIC_GTM_ID`: the Google Tag Manager container id (`GTM-XXXXXXX`). Optional. Analytics load only when it is set, the page is served from `jasoncookdesign.com`, and the visitor has accepted the privacy notice, so previews and local runs never send data. Events go through the data layer: `generate_lead` with `method` set to `email` (a `mailto:` link was clicked) or `booking` (a Cal.com booking finished). Tags and triggers live in the container, not in this repo.

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
- Any other `[GAP: ...]`: an open content question. These should not render. Tests guard the pages that had them.

Copy marked with a `DRAFT — Jason to edit` comment in the source is placeholder prose awaiting the owner's edit. The `/legal` text (`lib/legal.ts`) is a draft written from what the site does; the privacy and terms text needs legal review before launch.

## Docs

- `docs/cutover-plan.md`: the plan for moving jasoncookdesign.com from GitHub Pages to Vercel. Not yet executed.
- `docs/content-token-candidates.md`: draft name candidates for the open content tokens.
