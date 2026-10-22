import fs from "fs";
import path from "path";
import { render, screen, within } from "@testing-library/react";
import WritingPage, { metadata as writingMetadata } from "@/app/writing/page";
import WritingPostContent from "@/components/writing/WritingPostContent";
import { posts } from "@/lib/writing";
import { book } from "@/lib/book";

describe("Writing alt-text audit", () => {
  it("every img block in every writing post has non-empty alt text", () => {
    for (const post of posts) {
      for (const block of post.content) {
        if (block.type === "img") {
          expect(block.alt.trim()).toBeTruthy();
        }
      }
    }
  });
});

describe("Writing index page", () => {
  it("renders the Writing h1 heading", () => {
    render(<WritingPage />);
    expect(screen.getByRole("heading", { level: 1, name: /^Writing$/i })).toBeTruthy();
  });

  it("renders all 4 post titles", () => {
    render(<WritingPage />);
    expect(screen.getByText(/You're Not Building a Tool/i)).toBeTruthy();
    expect(screen.getByText(/Why This Blog Exists/i)).toBeTruthy();
    expect(screen.getByText(/The Quality Gate/i)).toBeTruthy();
    expect(screen.getByText(/Your AI Doesn't Have to Go Rogue/i)).toBeTruthy();
  });

  it("renders post dates", () => {
    render(<WritingPage />);
    // Multiple date elements exist (one per post) — getAllByText handles multiple matches
    expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
  });

  it("renders links to each post", () => {
    render(<WritingPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href") ?? "");
    expect(hrefs.some((h) => h.includes("/writing/"))).toBe(true);
  });
});

describe("Writing index page, the longform module", () => {
  const BOOK_HREF = "/writing/longform";

  const announced = book.announcementSlug;
  afterEach(() => {
    book.announcementSlug = announced;
  });

  it("shows the book's cover as a thumbnail that links to the book page", () => {
    const { container } = render(<WritingPage />);
    const thumb = container.querySelector(`[data-name="LONGFORM"] a.longform-thumb`)!;
    expect(thumb.getAttribute("href")).toBe(BOOK_HREF);
    expect(thumb.querySelector("img")!.getAttribute("alt")).toMatch(/The Constitution and the Machine/);
  });

  it("names the book as a heading that links to the book page, with its subtitle and format tags", () => {
    render(<WritingPage />);
    const heading = screen.getByRole("heading", { level: 3, name: "The Constitution and the Machine" });
    expect(within(heading).getByRole("link").getAttribute("href")).toBe(BOOK_HREF);
    expect(screen.getByText("Technology, Governance, and the Limits of Power")).toBeTruthy();
    for (const tag of ["Free", "PDF", "EPUB"]) expect(screen.getByText(tag)).toBeTruthy();
  });

  it("separates the format tags", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "app/bp-book.css"), "utf8");
    expect(css).toMatch(/\.longform-body \.tags\s*\{[^}]*gap:\s*8px/);
  });

  it("offers a secondary button to the book page", () => {
    render(<WritingPage />);
    const cta = screen.getByRole("link", { name: "Get the book" });
    expect(cta.getAttribute("href")).toBe(BOOK_HREF);
    expect(cta.className).toMatch(/\bbtn\b/);
    expect(cta.className).toMatch(/\bsecondary\b/);
  });

  it("offers no link to a post about the book until one is set", () => {
    delete book.announcementSlug;
    render(<WritingPage />);
    expect(screen.queryByRole("link", { name: /story behind the book/ })).toBeNull();
  });

  it("offers a tertiary button to the post about the book once one is set", () => {
    book.announcementSlug = "about-the-book";
    render(<WritingPage />);
    const cta = screen.getByRole("link", { name: /story behind the book/ });
    expect(cta.getAttribute("href")).toBe("/writing/blog/about-the-book");
    expect(cta.className).toMatch(/\btertiary\b/);
  });

  it("sits after every post and is not one of the blog rows", () => {
    const { container } = render(<WritingPage />);
    expect(container.querySelectorAll('[data-name="BLOG"] a.row[href^="/writing/longform"]')).toHaveLength(0);
    const last = Array.from(container.querySelectorAll('[data-name="BLOG"] a.row')).pop()!;
    const module = container.querySelector('[data-name="LONGFORM"]')!;
    expect(last.compareDocumentPosition(module) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("is built from the book record alone, not the blog collection", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "components/writing/LongformEntry.tsx"), "utf8");
    expect(src).not.toMatch(/\bposts\b/);
  });

  it("links 'free book' in the lead to the longform section", () => {
    const { container } = render(<WritingPage />);
    const link = container.querySelector(".hero .lead a")!;
    expect(link.textContent).toBe("free book");
    expect(link.getAttribute("href")).toBe("#longform");
    expect(container.querySelector("#longform")?.getAttribute("data-name")).toBe("LONGFORM");
    const css = fs.readFileSync(path.join(process.cwd(), "app/bp-book.css"), "utf8");
    expect(css).toMatch(/scroll-behavior:\s*smooth/);
    expect(css).toMatch(/prefers-reduced-motion:\s*no-preference/);
  });

  it("mentions the book in the page description", () => {
    expect(String(writingMetadata.description)).toMatch(/book/i);
  });
});

describe("The post announcing the book", () => {
  const post = posts.find((p) => p.slug === book.announcementSlug);

  it("is the post the book record points to, and the Writing page links it", () => {
    expect(post).toBeTruthy();
    render(<WritingPage />);
    const cta = screen.getByRole("link", { name: /story behind the book/ });
    expect(cta.getAttribute("href")).toBe(`/writing/blog/${book.announcementSlug}`);
  });

  it("is dated, tagged, and ends by pointing readers to the book page", () => {
    expect(post!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(post!.tags.length).toBeGreaterThan(0);
    const last = [...post!.content].reverse().find((b) => b.type === "p")!;
    expect(last.type === "p" && last.html).toContain(`href="${book.href}"`);
  });

  it("uses the book's mockup as its cover, and the file exists", () => {
    expect(post!.coverImage).toBe("/images/book/book-mockup.jpg");
    expect(fs.existsSync(path.join(process.cwd(), "public", post!.coverImage!))).toBe(true);
  });
});

describe("Writing post data", () => {
  it("contains all 6 posts with required fields", () => {
    expect(posts).toHaveLength(6);
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.content).toBeTruthy();
      expect(post.content.length).toBeGreaterThan(0);
    }
  });

  it("has the correct slugs", () => {
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("youre-not-building-a-tool-youre-building-an-organization");
    expect(slugs).toContain("why-this-blog-exists");
    expect(slugs).toContain("the-quality-gate");
    expect(slugs).toContain("your-ai-doesnt-have-to-go-rogue-to-break-your-rules");
    expect(slugs).toContain("rebuilding-jasoncookdesign-com");
  });
});

describe("Writing post content component", () => {
  it("renders 'You're Not Building a Tool' post content faithfully", () => {
    const post = posts.find(
      (p) => p.slug === "youre-not-building-a-tool-youre-building-an-organization"
    )!;
    render(<WritingPostContent post={post} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    // Key fact from the post — verbatim
    expect(document.body.textContent).toMatch(/RTX Spark/);
    expect(document.body.textContent).toMatch(/governance/i);
  });

  it("renders 'The Quality Gate' post content faithfully", () => {
    const post = posts.find((p) => p.slug === "the-quality-gate")!;
    render(<WritingPostContent post={post} />);
    expect(document.body.textContent).toMatch(/Image Foundry/);
    expect(document.body.textContent).toMatch(/discernment/i);
  });

  it("renders 'Your AI Doesn't Have to Go Rogue' post content faithfully", () => {
    const post = posts.find(
      (p) => p.slug === "your-ai-doesnt-have-to-go-rogue-to-break-your-rules"
    )!;
    render(<WritingPostContent post={post} />);
    expect(document.body.textContent).toMatch(/Security Steward/i);
    expect(document.body.textContent).toMatch(/append-only/i);
  });

  it("renders 'Why This Blog Exists' post content faithfully", () => {
    const post = posts.find((p) => p.slug === "why-this-blog-exists")!;
    render(<WritingPostContent post={post} />);
    expect(document.body.textContent).toMatch(/design and engineering/i);
    expect(document.body.textContent).toMatch(/More soon/);
  });
});
