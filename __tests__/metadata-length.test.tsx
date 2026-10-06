import type { Metadata } from "next";
import { metadata as layout } from "@/app/layout";
import { metadata as about } from "@/app/about/page";
import { metadata as capabilities } from "@/app/capabilities/page";
import { metadata as contact } from "@/app/contact/page";
import { metadata as engagements } from "@/app/engagements/page";
import { metadata as legal } from "@/app/legal/page";
import { metadata as work } from "@/app/work/page";
import { metadata as writing } from "@/app/writing/page";
import { generateMetadata as workCaseStudy } from "@/app/work/[slug]/page";
import { generateMetadata as writingPost } from "@/app/writing/[slug]/page";
import { caseStudies } from "@/lib/work";
import { posts } from "@/lib/writing";
import { pageTitle } from "@/lib/metadata";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

type Meta = Pick<Metadata, "title" | "description"> & {
  openGraph?: { title?: unknown; description?: unknown } | null;
  twitter?: { title?: unknown; description?: unknown } | null;
};

const staticPages: Array<[string, Meta]> = [
  ["layout (site defaults)", layout],
  ["/about", about],
  ["/capabilities", capabilities],
  ["/contact", contact],
  ["/engagements", engagements],
  ["/legal", legal],
  ["/work", work],
  ["/writing", writing],
];

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

async function allPages(): Promise<Array<[string, Meta]>> {
  const dynamic: Array<[string, Meta]> = [];
  for (const cs of caseStudies) dynamic.push([`/work/${cs.slug}`, await workCaseStudy(params(cs.slug))]);
  for (const p of posts) dynamic.push([`/writing/${p.slug}`, await writingPost(params(p.slug))]);
  return [...staticPages, ...dynamic];
}

// Every rendered title/description string on a page, labelled by field.
function fields(m: Meta): Array<[string, string, number]> {
  const out: Array<[string, string, number]> = [];
  const add = (name: string, value: unknown, max: number) => {
    if (typeof value === "string") out.push([name, value, max]);
  };
  add("title", m.title, TITLE_MAX);
  add("description", m.description, DESCRIPTION_MAX);
  add("openGraph.title", m.openGraph?.title, TITLE_MAX);
  add("openGraph.description", m.openGraph?.description, DESCRIPTION_MAX);
  add("twitter.title", m.twitter?.title, TITLE_MAX);
  add("twitter.description", m.twitter?.description, DESCRIPTION_MAX);
  return out;
}

describe("page metadata lengths", () => {
  it("covers every case study and every post", async () => {
    const pages = await allPages();
    expect(pages).toHaveLength(staticPages.length + caseStudies.length + posts.length);
    for (const [, m] of pages) expect(typeof m.title).toBe("string");
  });

  it("keeps every title within 60 and every description within 155 characters", async () => {
    const overruns: string[] = [];
    for (const [page, m] of await allPages()) {
      for (const [name, value, max] of fields(m)) {
        if (value.length > max) overruns.push(`${page} ${name}: ${value.length} > ${max}`);
      }
    }
    expect(overruns).toEqual([]);
  });

  it("keeps the site suffix on dynamic titles that fit with it", async () => {
    const ford = await workCaseStudy(params("ford"));
    expect(ford.title).toBe("Ford Build and Price | Jason Cook Design");
    const meevo = await workCaseStudy(params("millennium-meevo"));
    expect(meevo.title).toBe("Millennium Systems International — Meevo | Jason Cook Design");
    const quality = await writingPost(params("the-quality-gate"));
    expect(quality.title).toBe("The Quality Gate | Jason Cook Design");
  });

  it("drops the site suffix when only the post title fits", async () => {
    const m = await writingPost(params("your-ai-doesnt-have-to-go-rogue-to-break-your-rules"));
    expect(m.title).toBe("Your AI Doesn't Have to Go Rogue to Break Your Rules");
  });

  it("uses a post's short title when it has one", async () => {
    const m = await writingPost(params("youre-not-building-a-tool-youre-building-an-organization"));
    expect(m.title).toBe("You're Building an Organization, Not a Tool");
  });

  it("falls back to cutting an over-long title at a word boundary with an ellipsis", () => {
    expect(pageTitle("You're Not Building a Tool. You're Building an Organization. Treat it That Way.")).toBe(
      "You're Not Building a Tool. You're Building an…"
    );
  });

  it("keeps description and openGraph.description identical where both are set", async () => {
    for (const [, m] of await allPages()) {
      if (m.openGraph?.description !== undefined) expect(m.openGraph.description).toBe(m.description);
    }
  });

  it("keeps placeholder tokens out of descriptions", async () => {
    for (const [, m] of await allPages()) {
      for (const [name, value] of fields(m)) {
        if (name.endsWith("description")) expect(value).not.toMatch(/\[[A-Z-]+[\]:]/);
      }
    }
  });
});
