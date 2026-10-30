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
| `/engagements/first-phase` | The first phase: what it asks, who it is for, the credit and the guarantee. The one place the terms are written in full (`lib/first-phase-terms.ts`); other pages carry short forms that link to its anchors |
| `/engagements/sample` | A sample first-phase report for a fictional client: six screenshots, the guarantee checklist, a stop panel, and the PDF download. The PDF, screenshots and `data/sample-manifest.json` come from the private sample-report repository and are copied into `public/sample/` and `data/` by pull request |
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

- `NEXT_PUBLIC_GTM_ID`: the Google Tag Manager container id (`GTM-XXXXXXX`). Optional. Analytics load only when it is set, the page is served from `jasoncookdesign.com`, and the visitor has accepted the privacy notice, so previews and local runs never send data. Events go through the data layer: `generate_lead` with `method` set to `email` (a `mailto:` link was clicked) or `booking` (a Cal.com booking finished). The sample page also sends `sample_download_click`, `sample_call_click` and `sample_checklist_view`, each once per page view. Tags and triggers live in the container, not in this repo.

## Running tests

```bash
npm test          # Jest: components, copy and logic
npm run test:e2e  # Playwright in Google Chrome: layout, scrolling, accessibility (axe) and analytics events; builds and serves the site first
```

## Building for production

```bash
npm run build
```

## Content tokens

No placeholder tokens are open. `[ENTRY-OFFER-NAME]` and `[PRACTICE-NAME]` were retired in favor of plain wording ("the paid first step", "the paid diagnosis"). Any `[GAP: ...]` marker is an open content question and must not render; tests guard the pages that had them. The SAM.gov identifiers (UEI, CAGE code, NAICS codes, registration status) appear in the Capabilities page company data, supplied by the owner and never guessed. The NAICS list is the ratified search scope and should be confirmed against the SAM.gov Goods and Services tab.

Copy marked with a `DRAFT — Jason to edit` comment in the source is placeholder prose awaiting the owner's edit. The `/legal` text (`lib/legal.ts`) is a draft written from what the site does; the privacy and terms text needs legal review before launch.

## Docs

- `docs/cutover-plan.md`: the plan for moving jasoncookdesign.com from GitHub Pages to Vercel. Executed 2026-10-19.
- `docs/content-token-candidates.md`: retired name candidates for the entry offer and practice, and the chosen engagement type names.
