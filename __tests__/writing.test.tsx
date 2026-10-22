import { render, screen } from "@testing-library/react";
import WritingPage, { metadata as writingMetadata } from "@/app/writing/page";
import WritingPostContent from "@/components/writing/WritingPostContent";
import { posts } from "@/lib/writing";

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

describe("Writing index page, the book entry", () => {
  const BOOK_HREF = "/writing/the-constitution-and-the-machine";

  it("lists the book after every post", () => {
    render(<WritingPage />);
    const book = screen.getByRole("link", { name: /The Constitution and the Machine/ });
    expect(book.getAttribute("href")).toBe(BOOK_HREF);
    const postLinks = screen.getAllByRole("link").filter((l) => /^\/writing\/(?!the-constitution)/.test(l.getAttribute("href") ?? ""));
    expect(postLinks).toHaveLength(posts.length);
    for (const link of postLinks) {
      expect(link.compareDocumentPosition(book) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("sets the book one heading level below the posts, under a Book label", () => {
    render(<WritingPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Book" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "The Constitution and the Machine" })).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBe(posts.length + 1);
  });

  it("shows the subtitle and that the book is free as a PDF and an EPUB", () => {
    render(<WritingPage />);
    expect(screen.getByText("Technology, Governance, and the Limits of Power")).toBeTruthy();
    for (const tag of ["Free", "PDF", "EPUB"]) expect(screen.getByText(tag)).toBeTruthy();
  });

  it("leaves the count in the hero as the number of posts", () => {
    const { container } = render(<WritingPage />);
    expect(container.querySelector(".count")?.textContent).toBe(String(posts.length).padStart(2, "0"));
  });

  it("mentions the book in the page description", () => {
    expect(String(writingMetadata.description)).toMatch(/book/i);
  });
});

describe("Writing post data", () => {
  it("contains all 5 posts with required fields", () => {
    expect(posts).toHaveLength(5);
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
