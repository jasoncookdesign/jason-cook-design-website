import fs from "fs";
import os from "os";
import path from "path";
import { render, screen } from "@testing-library/react";
import { isPublished, todayInChicago } from "@/lib/writing";
import { loadPosts, posts, publishedPosts } from "@/lib/posts";
import { trailFor } from "@/lib/breadcrumbs";
import sitemap from "@/app/sitemap";
import WritingPage from "@/app/writing/page";
import WritingPostPage, { generateStaticParams } from "@/app/writing/blog/[slug]/page";

const SITE = "https://jasoncookdesign.com";

// Post dates are fixed history, so these clock settings stay valid as the site grows.
const FIRST_POST = "youre-not-building-a-tool-youre-building-an-organization"; // 2026-06-09
const SECOND_POST = "why-this-blog-exists"; // 2026-06-23

const at = (iso: string) => jest.useFakeTimers({ now: new Date(iso) });

afterEach(() => jest.useRealTimers());

describe("the publishing day", () => {
  it("is the calendar date in Central time, not UTC", () => {
    expect(todayInChicago(new Date("2026-11-22T05:30:00Z"))).toBe("2026-11-21");
    expect(todayInChicago(new Date("2026-11-22T06:00:00Z"))).toBe("2026-11-22");
    expect(todayInChicago(new Date("2026-07-22T04:59:00Z"))).toBe("2026-07-21");
    expect(todayInChicago(new Date("2026-07-22T05:00:00Z"))).toBe("2026-07-22");
  });

  it("publishes a post on its date and not before", () => {
    const post = { date: "2026-11-22" };
    expect(isPublished(post, new Date("2026-11-22T06:00:00Z"))).toBe(true);
    expect(isPublished(post, new Date("2026-11-22T05:59:00Z"))).toBe(false);
    expect(isPublished(post, new Date("2026-12-30T12:00:00Z"))).toBe(true);
  });
});

describe("loading posts from files", () => {
  const make = (files: Record<string, unknown>) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "posts-"));
    for (const [name, body] of Object.entries(files)) {
      fs.writeFileSync(path.join(dir, name), typeof body === "string" ? body : JSON.stringify(body));
    }
    return dir;
  };
  const post = (slug: string, extra: object = {}) => ({
    slug, title: `Title ${slug}`, date: "2026-01-02", tags: ["t"], excerpt: "e",
    content: [{ type: "p", html: "x" }], ...extra,
  });

  it("returns one post per .json file and ignores other files", () => {
    const dir = make({ "a.json": post("a"), "b.json": post("b"), "notes.txt": "ignore me" });
    expect(loadPosts(dir).map((p) => p.slug).sort()).toEqual(["a", "b"]);
  });

  it("returns posts oldest first, ties by slug, whatever the file names sort to", () => {
    const dir = make({
      "a.json": post("a", { date: "2026-03-01" }),
      "b.json": post("b", { date: "2026-01-01" }),
      "d.json": post("d", { date: "2026-02-01" }),
      "c.json": post("c", { date: "2026-02-01" }),
    });
    expect(loadPosts(dir).map((p) => p.slug)).toEqual(["b", "c", "d", "a"]);
  });

  it("names the file when the slug does not match its file name", () => {
    expect(() => loadPosts(make({ "a.json": post("b") }))).toThrow(/a\.json.*slug/);
  });

  it("names the file and the field when a required field is missing", () => {
    const { title, ...noTitle } = post("a");
    expect(() => loadPosts(make({ "a.json": noTitle }))).toThrow(/a\.json.*title/);
  });

  it("rejects a date that is not YYYY-MM-DD", () => {
    expect(() => loadPosts(make({ "a.json": post("a", { date: "Nov 22" }) }))).toThrow(/a\.json.*date/);
  });

  it("names the file when the JSON is malformed", () => {
    expect(() => loadPosts(make({ "a.json": "{ nope" }))).toThrow(/a\.json/);
  });
});

describe("the real site content", () => {
  it("loads every post in data/posts, sorted newest first by the index", () => {
    expect(posts.length).toBeGreaterThanOrEqual(7);
    expect(posts.map((p) => p.slug)).toContain(FIRST_POST);
  });

  it("shows only what has reached its date: index, post page, static params, sitemap, breadcrumb labels", async () => {
    at("2026-06-10T18:00:00Z"); // after the first post, before the second
    expect(publishedPosts().map((p) => p.slug)).toEqual([FIRST_POST]);

    const { container } = render(<WritingPage />);
    expect(screen.getByText(/You're Not Building a Tool/i)).toBeTruthy();
    expect(container.querySelector(`a[href="/writing/blog/${SECOND_POST}"]`)).toBeNull();
    expect(container.querySelector(`a[href="/writing/blog/${FIRST_POST}"]`)).not.toBeNull();

    expect((await generateStaticParams()).map((p) => p.slug)).toEqual([FIRST_POST]);

    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(`${SITE}/writing/blog/${FIRST_POST}`);
    expect(urls).not.toContain(`${SITE}/writing/blog/${SECOND_POST}`);

    await expect(WritingPostPage({ params: Promise.resolve({ slug: FIRST_POST }) })).resolves.toBeTruthy();
    await expect(WritingPostPage({ params: Promise.resolve({ slug: SECOND_POST }) })).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/);
  });

  it("shows the post on its date", async () => {
    at("2026-06-23T12:00:00Z");
    expect(publishedPosts().map((p) => p.slug)).toContain(SECOND_POST);
    expect(sitemap().map((e) => e.url)).toContain(`${SITE}/writing/blog/${SECOND_POST}`);
    await expect(WritingPostPage({ params: Promise.resolve({ slug: SECOND_POST }) })).resolves.toBeTruthy();
  });
});

describe("breadcrumbs for posts", () => {
  it("name a post from the labels the layout passes in, and know no others", () => {
    const labels = { [FIRST_POST]: "Short label" };
    expect(trailFor(`/writing/blog/${FIRST_POST}`, labels)?.map((c) => c.label)).toEqual(["Home", "Writing", "Short label"]);
    expect(trailFor(`/writing/blog/${SECOND_POST}`, labels)).toBeNull();
  });
});
