# DNS cutover plan: GitHub Pages to Vercel

**Status: plan only. Nothing in this document has been executed.** The cutover needs Jason's explicit go, and every step that changes DNS, Vercel, or the old Pages repo is his to run or approve.

Moves jasoncookdesign.com from the old static site (repo `jasoncookdesign/jasoncookdesign.github.io`, served by GitHub Pages) to this Next.js site on Vercel. Email and search verification records stay untouched.

## Current setup (read-only checks, 2026-10-11)

Gathered with `dig`, `whois`, `curl -I`, and `gh api repos/jasoncookdesign/jasoncookdesign.github.io/pages`.

**Registrar:** Squarespace Domains II LLC (IANA 895), per `whois`. Registered 2018-10-04; registry expiry 2027-10-04.

**DNS host:** the nameservers are `ns-cloud-b1` to `ns-cloud-b4.googledomains.com`, Google's nameservers carried over from Google Domains. The records are most likely edited in the Squarespace Domains dashboard, but that's an inference from the registrar and nameservers; confirm by logging in before the cutover day.

**DNSSEC:** on (`signedDelegation`, DS key tag 65314, algorithm 8). The plan keeps the current nameservers, so the DS record never has to change. Moving DNS to Vercel's nameservers instead would mean turning DNSSEC off first; this plan avoids that.

| Name | Type | Value | TTL | Cutover action |
|---|---|---|---|---|
| `jasoncookdesign.com` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub Pages) | 3600 | Replace with Vercel's apex record |
| `jasoncookdesign.com` | AAAA | none | — | Leave absent unless Vercel asks for one |
| `www.jasoncookdesign.com` | CNAME | `jasoncookdesign.github.io.` | 3600 | Replace with Vercel's CNAME target |
| `jasoncookdesign.com` | MX | `1 smtp.google.com.` (Google Workspace) | 14400 | Don't touch |
| `jasoncookdesign.com` | TXT | `v=spf1 include:mailgun.org ~all` | 3600 | Don't touch (see note below) |
| `jasoncookdesign.com` | TXT | `google-site-verification=…` (Search Console) | 3600 | Don't touch |
| `google._domainkey` | TXT | Google Workspace DKIM key | 14400 | Don't touch |
| `_dmarc` | TXT | none | — | Out of scope |
| `jasoncookdesign.com` | CAA | none | — | Leave absent; any CA, including Vercel's, can issue |
| SOA | | negative-cache TTL 300 | | — |

**GitHub Pages settings:** legacy build from `main` at `/`; custom domain `jasoncookdesign.com` (the repo's `CNAME` file lists `jasoncookdesign.com` and `www.jasoncookdesign.com`); HTTPS enforced; certificate covers both names and expires 2026-11-20 (GitHub renews it while the domain points at Pages). The domain isn't verified in GitHub (`protected_domain_state: null`). Today `http://www.` returns a 301 to the apex.

**Old URLs still served today** that this site doesn't redirect: `/resume.pdf`, `/resume_designproduction.pdf`, `/archive/portfolio-old-mobile.pdf`, and `/blog/feed.xml` (all return 200 now). The feed is meant to 404 after cutover (ruled 2026-10-07). The three PDFs need a decision.

**Analytics:** the old site loads a Google Analytics 4 tag. This site has none, so traffic measurement stops at cutover unless one is added.

**Mail note, separate from the cutover:** the SPF record names only Mailgun while MX points at Google Workspace. Mail sent through Workspace may fail SPF. Fix it on its own day, never in the same change as the cutover, so a mail problem can't be confused with a web one.

## What must be true before Jason's go

1. Jason has done his content and polish pass and reviewed a Vercel preview deployment of `main`.
2. Placeholder tokens are resolved, or Jason has accepted each one going live: `[ENTRY-OFFER-NAME]`, `[PRACTICE-NAME]`, the `[LEGAL: …]` sections, and the Capabilities company-data tokens (`[UEI]`, `[CAGE-CODE]`, `[NAICS-CODES]`, `[SAM-STATUS]`). Check the preview with a search for `[` followed by capitals, and confirm the new routes `/engagements`, `/engagements/operating`, and `/engagements/offering` load.
3. No page cites a case without the client's consent.
4. A decision on the three old PDFs: redirect them (for example to `/about`), copy them into `public/`, or let them 404.
5. A decision on analytics: add a tag before cutover, or accept a gap.
6. The Vercel project exists, builds `main` as production, and passes on the preview: `npm test`, `npm run build`, and the redirect spot checks below.
7. Recommended: verify `jasoncookdesign.com` in the GitHub account's Pages settings (adds a `_github-pages-challenge-…` TXT record). Once the old repo's custom domain is removed, any DNS record still pointing at GitHub (for example during a late rollback) could let another account's Pages site claim the domain; verification blocks that.
8. Access confirmed: Jason can log in to the DNS dashboard and to Vercel, and has a copy of the current record table above.

## Steps, in order

**T−1 day: lower the TTLs.** Change the apex A records and the `www` CNAME from 3600 to 300 seconds. Leave MX and TXT alone. Wait at least the old TTL (one hour); a full day is safer. If the dashboard won't accept 300, use the lowest value it allows.

**T0: add the domains in Vercel first.** In the Vercel project, add `jasoncookdesign.com` and `www.jasoncookdesign.com`, with the apex as primary and `www` redirecting to it (this keeps today's canonical host). Vercel shows the exact records it wants and marks the domains as misconfigured until DNS changes; that's expected. Use the values Vercel displays. Its long-standing defaults were an apex A record of `76.76.21.21` and a `www` CNAME of `cname.vercel-dns.com`, but newer projects can be given different targets, so the dashboard wins. If Vercel asks for a `_vercel` TXT verification record, add it.

**T0: switch DNS, both records in one sitting.**
1. Delete the four GitHub A records on the apex and add Vercel's apex record.
2. Change the `www` CNAME from `jasoncookdesign.github.io.` to Vercel's target.
3. Touch nothing else.

**T0 to T+1 hour: verify.** Vercel can only issue its certificate after DNS points at it, so expect a few minutes of HTTPS errors right after the switch; that alone isn't a reason to roll back.
- Authoritative answer: `dig @ns-cloud-b1.googledomains.com jasoncookdesign.com A` and the same for `www` show the new values.
- Public resolvers: `dig @1.1.1.1` and `dig @8.8.8.8` for both names, until they match.
- Vercel's Domains panel shows both names as valid with a certificate issued.
- `curl -sI https://jasoncookdesign.com` shows a Vercel server header and a 200.
- `curl -sI https://www.jasoncookdesign.com` redirects to the apex.
- Redirects: `/cs01.html` returns a permanent redirect to `/work/osisoft`, `/blog` to `/writing`, a sample post under `/blog/` to its `/writing/` page, and `/calendar/coffee` a temporary redirect to the booking page.
- Mail: send a test message to and from a jasoncookdesign.com address.
- Search Console still shows the property as verified.

**T+2 days, once stable: retire the old Pages site.** Remove the custom domain from the old repo's Pages settings (or delete its `CNAME` file through a PR in that repo). Doing this earlier would break the old site for visitors whose resolvers still hold the old records, and would remove the fast rollback. Whether to archive the old repo is a separate decision.

**T+1 week: raise the TTLs** on the apex and `www` records back to 3600.

## Rollback

While the old Pages site still has its custom domain (until the T+2 days step), rollback is a DNS edit:

1. Remove the Vercel apex record and, in the same edit, restore the four apex A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, so the apex never answers with a mix of both hosts.
2. Restore the `www` CNAME to `jasoncookdesign.github.io.`
3. Remove any `_vercel` TXT record.

With TTLs at 300, most visitors are back on the old site within minutes. GitHub may need some time to confirm its certificate again, so HTTPS can show errors briefly; if it does, re-save the custom domain in the old repo's Pages settings. The GitHub certificate on record expires 2026-11-20; a rollback after GitHub has stopped renewing it also needs a fresh certificate. After the old site's custom domain is removed, rollback also means re-adding it there and waiting for GitHub to issue a new certificate.

## Out of scope

Registrar transfer, nameserver moves, DNSSEC changes, the SPF fix, and DMARC. None are needed for the cutover.
