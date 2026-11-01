import fs from "fs";
import os from "os";
import path from "path";
import { render, screen } from "@testing-library/react";
import { isPublished, todayInChicago } from "@/lib/writing";
import { loadPosts, posts, publishedPosts } from "@/lib/posts";
import sitemap from "@/app/sitemap";
import WritingPage from "@/app/writing/page";
import WritingPostPage, { generateMetadata, generateStaticParams } from "@/app/writing/blog/[slug]/page";
import PostLayout from "@/app/writing/blog/[slug]/layout";
import { book } from "@/lib/book";

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
  it("loads every post in data/posts, oldest first", () => {
    expect(posts.length).toBeGreaterThanOrEqual(7);
    expect(posts.map((p) => p.slug)).toContain(FIRST_POST);
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort());
  });

  it("gives an unpublished post no metadata, and a published one its title", async () => {
    at("2026-06-10T18:00:00Z");
    expect(await generateMetadata({ params: Promise.resolve({ slug: SECOND_POST }) })).toEqual({});
    expect(await generateMetadata({ params: Promise.resolve({ slug: FIRST_POST }) })).toHaveProperty("title");
  });

  it("never points the book module at a post that is not public yet", () => {
    // The module reads only the book record, so the guard is here: a slug set ahead of its post's date fails this.
    if (!book.announcementSlug) return;
    const announcement = posts.find((p) => p.slug === book.announcementSlug);
    expect(announcement).toBeTruthy();
    expect(isPublished(announcement!, new Date())).toBe(true);
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

describe("the post page's breadcrumb", () => {
  const layoutFor = async (slug: string) =>
    render(await PostLayout({ children: <p>page</p>, params: Promise.resolve({ slug }) }));

  it("names the post once it is public, built from the post itself on every visit", async () => {
    at("2026-06-10T18:00:00Z");
    const { container } = await layoutFor(FIRST_POST);
    const labels = Array.from(container.querySelectorAll("nav.crumb li")).map((li) => li.textContent);
    expect(labels).toEqual(["Home/", "Writing/", "You're Building an Organization, Not a Tool"]);
    expect(container.textContent).toContain("page");
  });

  it("shows no crumb for a post that has not reached its date", async () => {
    at("2026-06-10T18:00:00Z");
    const { container } = await layoutFor(SECOND_POST);
    expect(container.querySelector("nav.crumb")).toBeNull();
    expect(container.textContent).not.toMatch(/Why This Blog Exists/);
  });
});

describe("what the loader checks beyond the top-level fields", () => {
  const dirWith = (body: unknown, name = "a") => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "posts-"));
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(body));
    return dir;
  };
  const base = { slug: "a", title: "T", date: "2026-01-02", tags: ["t"], excerpt: "e", content: [{ type: "p", html: "x" }] };

  it("rejects a date that is not on the calendar", () => {
    expect(() => loadPosts(dirWith({ ...base, date: "2026-02-30" }))).toThrow(/a\.json.*date/);
  });

  it("rejects an unknown content block and a block missing its text", () => {
    expect(() => loadPosts(dirWith({ ...base, content: [{ type: "paragraph", html: "x" }] }))).toThrow(/a\.json.*block 1/);
    expect(() => loadPosts(dirWith({ ...base, content: [{ type: "p" }] }))).toThrow(/a\.json.*block 1/);
  });

  it("rejects tags that are not all strings", () => {
    expect(() => loadPosts(dirWith({ ...base, tags: ["ok", 3] }))).toThrow(/a\.json.*tags/);
  });

  it("says which folder is missing", () => {
    expect(() => loadPosts("/nonexistent/posts-dir")).toThrow(/\/nonexistent\/posts-dir/);
  });
});
