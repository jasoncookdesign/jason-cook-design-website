import { readdirSync, statSync } from "fs";
import { join, relative, sep } from "path";
import { metadata as layout } from "@/app/layout";
import { generateMetadata as workCaseStudy } from "@/app/work/[slug]/page";
import { generateMetadata as writingPost } from "@/app/writing/blog/[slug]/page";
import { caseStudies } from "@/lib/work";
import { posts } from "@/lib/posts";
import { pageDescription, withSocial } from "@/lib/metadata";
import { cardPaths, socialCard } from "@/lib/social-cards";

// Every HTML page carries its own share card: its own og:url, canonical, title, description, and image. A page
// that inherits the site default would make LinkedIn, SMS, and chat apps show the home card and link to "/".
// The page list is read from app/, so a new page fails here until it has a card (see CLAUDE.md).

const APP = join(process.cwd(), "app");
const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

type Meta = {
  title?: unknown;
  description?: unknown;
  alternates?: { canonical?: string };
  openGraph?: { url?: string; title?: unknown; description?: unknown; images?: Array<{ url: string; alt?: string; width?: number; height?: number }> };
  twitter?: { images?: string[] };
};

function pageFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return pageFiles(full);
    return name === "page.tsx" ? [full] : [];
  });
}

const routes = pageFiles(APP)
  .map((f) => relative(APP, f).split(sep).slice(0, -1))
  .map((segs) => ({ segs, path: "/" + segs.join("/") }));
const DYNAMIC_WITH_CARDS = ["/work/[slug]", "/writing/blog/[slug]"]; // their cards are swept by allDynamic() below
const staticRoutes = routes.filter((r) => !r.segs.some((s) => s.startsWith("[")) && r.path !== "/");
const homeRoute = routes.filter((r) => r.path === "/");

async function allDynamic(): Promise<Array<[string, Meta]>> {
  const out: Array<[string, Meta]> = [];
  for (const cs of caseStudies) out.push([`/work/${cs.slug}`, (await workCaseStudy(params(cs.slug))) as Meta]);
  jest.useFakeTimers({ now: new Date("2100-01-01T12:00:00Z") });
  try {
    for (const p of posts) out.push([`/writing/blog/${p.slug}`, (await writingPost(params(p.slug))) as Meta]);
  } finally {
    jest.useRealTimers();
  }
  return out;
}

async function allPages(): Promise<Array<[string, Meta]>> {
  const out: Array<[string, Meta]> = [["/", (await import("@/app/page")).metadata as Meta]];
  for (const r of staticRoutes) out.push([r.path, (await import(`@/app${r.path}/page`)).metadata as Meta]);
  return [...out, ...(await allDynamic())];
}

describe("withSocial", () => {
  it("sets og:url and canonical to the page path and points the image at the page's own card", () => {
    const m = withSocial({ title: "About | Jason Cook Design", description: "D" }, "/about");
    expect(m.openGraph.url).toBe("/about");
    expect(m.alternates.canonical).toBe("/about");
    expect(m.openGraph.images[0].url).toBe("/card/about");
    expect(m.twitter.images).toEqual(["/card/about"]);
    expect(m.openGraph.images[0].alt).toBe("Jason Cook Design share card: About");
  });

  it("keeps a page's own canonical and uses it for og:url, so the two never disagree", () => {
    const m = withSocial({ title: "T", description: "D", alternates: { canonical: "/engagements/offering" } }, "/engagements");
    expect(m.alternates.canonical).toBe("/engagements/offering");
    expect(m.openGraph.url).toBe("/engagements/offering");
    expect(m.openGraph.images[0].url).toBe("/card/engagements/offering"); // the preview shows the page the canonical names
  });

  it("keeps the site's static card for the home page", () => {
    const m = withSocial({ title: "T", description: "D" }, "/");
    expect(m.openGraph.images[0].url).toBe("/opengraph-image.png");
  });
});

describe("pageDescription", () => {
  it("returns text within 155 characters unchanged", () => {
    expect(pageDescription("Short.")).toBe("Short.");
  });
  it("cuts longer text at a word boundary with an ellipsis, within 155 characters", () => {
    const long = "word ".repeat(60).trim();
    const out = pageDescription(long);
    expect(out.length).toBeLessThanOrEqual(155);
    expect(out.endsWith("…")).toBe(true);
    expect(out).not.toMatch(/wor…$/);
  });
});

describe("card registry", () => {
  it("has an entry with a kicker, title, and description for every page route", async () => {
    for (const r of staticRoutes) {
      const c = socialCard(r.path);
      expect(c).toBeDefined();
      for (const f of [c?.kicker, c?.title, c?.description]) expect(String(f ?? "").trim().length).toBeGreaterThan(2);
    }
    const later = new Date("2100-01-01T12:00:00Z");
    for (const cs of caseStudies) expect(socialCard(`/work/${cs.slug}`)?.title).toBe(cs.title);
    for (const p of posts) expect(socialCard(`/writing/blog/${p.slug}`, later)?.title).toBe(p.title);
  });

  it("lists every card path once, and answers undefined for a path that has no page", () => {
    const paths = cardPaths(new Date("2100-01-01T12:00:00Z"));
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual(expect.arrayContaining(staticRoutes.map((r) => r.path)));
    expect(socialCard("/no-such-page")).toBeUndefined();
  });

  it("does not describe a post before its date", () => {
    const post = posts[posts.length - 1];
    const before = new Date(`${post.date}T00:00:00Z`);
    before.setUTCDate(before.getUTCDate() - 2);
    expect(socialCard(`/writing/blog/${post.slug}`, before)).toBeUndefined();
    expect(cardPaths(before)).not.toContain(`/writing/blog/${post.slug}`);
    expect(cardPaths(new Date(`${post.date}T18:00:00Z`))).toContain(`/writing/blog/${post.slug}`);
  });
});

describe("every page has its own share card", () => {
  it("covers every route: a dynamic route outside the swept list fails until it is added to this test", () => {
    expect(homeRoute).toHaveLength(1);
    const unknown = routes.filter((r) => r.segs.some((s) => s.startsWith("["))).map((r) => r.path).filter((p) => !DYNAMIC_WITH_CARDS.includes(p));
    expect(unknown).toEqual([]);
  });

  it("gives every page, case study, and post a distinct og:url equal to its canonical, a card image, and matching titles", async () => {
    const pages = await allPages();
    expect(pages.length).toBe(1 + staticRoutes.length + caseStudies.length + posts.length);
    const problems: string[] = [];
    for (const [path, m] of pages) {
      const canonical = m.alternates?.canonical;
      if (canonical !== undefined && typeof canonical !== "string") problems.push(`${path}: canonical not a string`);
      if (!m.openGraph?.url) problems.push(`${path}: no og:url`);
      if (m.openGraph?.url !== (canonical ?? path)) problems.push(`${path}: og:url ${m.openGraph?.url} != ${canonical ?? path}`);
      if (m.alternates?.canonical !== (m.openGraph?.url ?? "")) problems.push(`${path}: no canonical equal to og:url`);
      const img = m.openGraph?.images?.[0];
      const expectedImage = path === "/" ? "/opengraph-image.png" : `/card${canonical ?? path}`;
      if (img?.url !== expectedImage) problems.push(`${path}: og:image is ${img?.url}, expected ${expectedImage}`);
      if (path !== "/" && !socialCard(canonical ?? path, new Date("2100-01-01T12:00:00Z"))) problems.push(`${path}: no card entry for ${canonical ?? path}`);
      if (path !== "/" && !/^Jason Cook Design share card: .+/.test(img?.alt ?? "")) problems.push(`${path}: alt is "${img?.alt}"`);
      if (img?.alt?.includes("| Jason Cook Design")) problems.push(`${path}: alt repeats the site suffix`);
      if (img && (img.width !== 1200 || img.height !== 630 || !img.alt)) problems.push(`${path}: image needs 1200x630 and alt`);
      if (m.twitter?.images?.[0] !== img?.url) problems.push(`${path}: twitter image differs from og:image`);
      if (m.openGraph?.title !== m.title) problems.push(`${path}: og:title differs from title`);
      if (typeof m.description !== "string" || m.openGraph?.description !== m.description) problems.push(`${path}: og:description missing or differs`);
    }
    expect(problems).toEqual([]);
  });

  it("makes no two pages share an og:url (except pages that name the same canonical on purpose)", async () => {
    const urls = (await allPages()).map(([path, m]) => m.openGraph?.url ?? path);
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
    expect(dupes).toEqual(["/engagements/offering"]); // /engagements renders the Offering page and names it canonical
  });

  it("gives each post its own description (its excerpt) and its own image path", async () => {
    const byPost = await allDynamic();
    for (const [path, m] of byPost.filter(([p]) => p.startsWith("/writing/blog/"))) {
      const post = posts.find((p) => path.endsWith(p.slug))!;
      expect(m.description).toBe(pageDescription(post.excerpt));
      expect(m.openGraph?.images?.[0].url).toBe(`/card${path}`);
    }
  });

  it("keeps og:url out of the root layout, so no page or 404 can inherit the home URL", () => {
    expect((layout.openGraph as { url?: string }).url).toBeUndefined();
  });
});
