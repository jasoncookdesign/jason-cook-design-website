import { render, screen } from "@testing-library/react";
import WritingPage from "@/app/writing/page";
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

describe("Writing post data", () => {
  it("contains all 4 posts with required fields", () => {
    expect(posts).toHaveLength(4);
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
