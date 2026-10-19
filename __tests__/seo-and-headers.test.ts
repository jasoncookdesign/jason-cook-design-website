import nextConfig from "@/next.config";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { caseStudies } from "@/lib/work";
import { posts } from "@/lib/writing";

const SITE = "https://jasoncookdesign.com";

describe("robots.txt", () => {
  it("allows crawling and names the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${SITE}/sitemap.xml`);
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules).toEqual([expect.objectContaining({ userAgent: "*", allow: "/" })]);
    expect(JSON.stringify(rules)).not.toContain("disallow");
  });
});

describe("sitemap.xml", () => {
  const urls = sitemap().map((e) => e.url);

  it("lists every page, case study, and post on the production host", () => {
    for (const path of ["", "/about", "/capabilities", "/contact", "/engagements", "/engagements/offering", "/engagements/operating", "/legal", "/work", "/writing"]) {
      expect(urls).toContain(`${SITE}${path}`);
    }
    for (const cs of caseStudies) expect(urls).toContain(`${SITE}/work/${cs.slug}`);
    for (const p of posts) expect(urls).toContain(`${SITE}/writing/${p.slug}`);
  });

  it("has no duplicates and no other host", () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((u) => u.startsWith(SITE))).toBe(true);
  });
});

describe("security headers", () => {
  it("sets the baseline headers on every route", async () => {
    const rules = await nextConfig.headers!();
    const all = rules.find((r) => r.source === "/:path*");
    const h = Object.fromEntries((all?.headers ?? []).map((x) => [x.key, x.value]));
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["X-Frame-Options"]).toBe("DENY");
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["Strict-Transport-Security"]).toMatch(/max-age=\d{8,}/);
    expect(h["Permissions-Policy"]).toContain("camera=()");
  });
});
