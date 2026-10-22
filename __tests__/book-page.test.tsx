import fs from "fs";
import path from "path";
import { render, screen, within } from "@testing-library/react";
import BookPage from "@/components/writing/BookPage";
import { metadata } from "@/app/writing/longform/page";
import { book, fileSizeLabel } from "@/lib/book";

jest.mock("@/lib/book", () => ({ ...jest.requireActual("@/lib/book"), fileSizeLabel: jest.fn() }));
const sizeOf = fileSizeLabel as jest.Mock;
import sitemap from "@/app/sitemap";

// The blurb is asserted verbatim.
const BLURB = [
  "The U.S. Constitution keeps one kind of power from turning into another, and it has little to say about technology that now does exactly that. Its clauses still work where they reach: a foreign prince cannot pay a federal officer, and a title cannot be handed down like a crown.",
  "Governments and companies can now see, predict, and decide at a scale the Framers never imagined. That leaves a question every citizen faces: when power in one place can turn into power everywhere, what keeps a free people free?",
  "This book follows the question from ancient Athens to the American founding to the systems running today, and ends where peaceful change can begin: state constitutions, city charters, and the rules your own community already lets you amend.",
  "The Constitution has served for more than two centuries, and it has been amended twenty-seven times along the way. This book invites you to read it as a working design, and to help decide what it needs next.",
];

const PARTS: Array<[string, string, string[]]> = [
  ["I", "The Machine That Was Built", ["The Jury Summons and the Kleroterion", "A Brilliant Machine for 1787", "The Menu of Power in 1787", "Compression"]],
  ["II", "What Changed", ["The Menu Got Longer", "Conversion, Named Plainly", "The Decompression"]],
  ["III", "Two Futures on One Machine", ["The Competent Autocracy", "The Distributed Republic", "How the Good Version Breaks"]],
  ["IV", "The Design Problem", ["From “Who Governs?” to “What Procedure Is Legitimate Here?”", "Non-Convertibility", "The Power Graph", "Constitutional Entropy"]],
  ["V", "Getting There Without Blood", ["How Change Actually Happens", "What You Could Start On Monday"]],
];

describe("Book page content", () => {
  beforeEach(() => {
    sizeOf.mockImplementation((file: string) => (file.endsWith(".pdf") ? "2.4 MB" : "0.9 MB"));
    render(<BookPage />);
  });

  it("names the book, its subtitle, and its author", () => {
    expect(screen.getByRole("heading", { level: 1, name: "The Constitution and the Machine" })).toBeTruthy();
    expect(screen.getByText("Technology, Governance, and the Limits of Power")).toBeTruthy();
    expect(screen.getByText("By Jason Cook")).toBeTruthy();
  });

  it("says the book is free and offers the PDF and the EPUB as downloads", () => {
    expect(screen.getAllByText(/\bfree\b/i).length).toBeGreaterThan(0);
    const pdf = screen.getByRole("link", { name: /Download the PDF/ });
    const epub = screen.getByRole("link", { name: /Download the EPUB/ });
    expect(pdf.getAttribute("href")).toBe("/book/the-constitution-and-the-machine.pdf");
    expect(epub.getAttribute("href")).toBe("/book/the-constitution-and-the-machine.epub");
    expect(pdf.hasAttribute("download")).toBe(true);
    expect(epub.hasAttribute("download")).toBe(true);
  });

  it("names the page in the breadcrumb after its route segment", () => {
    const crumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(crumb.textContent).toBe("Writing/Longform");
    expect(book.href.split("/").pop()).toBe("longform");
  });

  it("puts each file size under its own button, and the free line on its own line below", () => {
    const pdf = screen.getByRole("link", { name: /Download the PDF/ });
    const epub = screen.getByRole("link", { name: /Download the EPUB/ });
    expect(within(pdf.parentElement as HTMLElement).getByText("2.4 MB")).toBeTruthy();
    expect(within(epub.parentElement as HTMLElement).getByText("0.9 MB")).toBeTruthy();
    expect(pdf.parentElement).not.toBe(epub.parentElement);
    const free = screen.getByText("Free \u00b7 173 pages");
    expect(free.parentElement).not.toBe(pdf.parentElement);
    expect(pdf.compareDocumentPosition(free) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(epub.compareDocumentPosition(free) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(document.body.textContent).not.toMatch(/Screen PDF, 173/);
  });

  it("sets both downloads as secondary buttons", () => {
    for (const name of [/Download the PDF/, /Download the EPUB/]) {
      const cls = screen.getByRole("link", { name }).className;
      expect(cls).toMatch(/\bsecondary\b/);
      expect(cls).not.toMatch(/ghost/);
    }
  });

  it("prints the blurb verbatim", () => {
    for (const paragraph of BLURB) expect(screen.getByText(paragraph)).toBeTruthy();
  });

  it("lists the five parts with their chapters, between a Foreword and a Coda", () => {
    const contents = screen.getByRole("region", { name: "Contents" });
    expect(within(contents).getByText("Foreword")).toBeTruthy();
    expect(within(contents).getByText("Coda: The Window")).toBeTruthy();
    for (const [numeral, title, chapters] of PARTS) {
      expect(within(contents).getByText(`Part ${numeral}`)).toBeTruthy();
      expect(within(contents).getByText(title)).toBeTruthy();
      for (const chapter of chapters) expect(within(contents).getByText(chapter)).toBeTruthy();
    }
    expect(within(contents).getAllByRole("listitem").length).toBeGreaterThanOrEqual(16 + 2);
  });

  it("runs the contents after the blurb in the page's one content section, with the plates beside them", () => {
    const sections = document.querySelectorAll("article > section");
    expect(Array.from(sections).map((s) => s.getAttribute("data-name"))).toEqual(["HERO", "ABOUT", "CLOSE"]);
    const about = document.querySelector('[data-name="ABOUT"]')!;
    const contents = within(about as HTMLElement).getByRole("region", { name: "Contents" });
    expect(about.querySelector(".prose")!.compareDocumentPosition(contents) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const figures = within(about as HTMLElement).getAllByRole("figure");
    expect(figures).toHaveLength(2);
    expect(within(figures[0]).getByText("FIG. 2")).toBeTruthy();
    expect(within(figures[1]).getByText("FIG. 3")).toBeTruthy();
  });

  it("sets the plates in a wider right-hand column from the wide breakpoint, the list in one column, and stacks below it", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "app/bp-book.css"), "utf8");
    expect(css).toMatch(/\.book-body\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+4\d\dpx/);
    expect(css).toMatch(/\.book-body \.book-plates\s*\{[^}]*justify-self:\s*end/);
    expect(css).toMatch(/@media \(max-width: 1199px\)[^@]*\.book-body\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(css).not.toMatch(/\.toc\s*\{[^}]*repeat\(2/);
  });

  it("shows three numbered plates of the book, each with alt text and a factual caption", () => {
    const figures = screen.getAllByRole("figure");
    expect(figures).toHaveLength(3);
    figures.forEach((figure, i) => {
      expect(within(figure).getByText(`FIG. ${i + 1}`)).toBeTruthy();
      const img = within(figure).getByRole("img");
      expect(img.getAttribute("alt")?.trim().length).toBeGreaterThan(15);
      expect(within(figure).getByText(book.plates[i].caption)).toBeTruthy();
    });
  });

  it("carries the book's own disclaimer and a way back to Writing", () => {
    expect(screen.getByText("The views in this book are his own and do not represent any client or employer.")).toBeTruthy();
    const back = screen.getByRole("link", { name: /All writing/ });
    expect(back.getAttribute("href")).toBe("/writing");
    expect(back.className).toMatch(/\btertiary\b/);
  });
});

describe("Book page before the files are added", () => {
  it("shows no size for a file that is not there, and keeps the downloads and the free line", () => {
    sizeOf.mockReturnValue(null);
    render(<BookPage />);
    expect(document.body.textContent).not.toMatch(/\bMB\b/);
    expect(screen.getByRole("link", { name: /Download the PDF/ })).toBeTruthy();
    expect(screen.getByText("Free \u00b7 173 pages")).toBeTruthy();
  });
});

describe("Book page route", () => {
  it("has a title within 60 characters and a description within 155 that names the two formats", () => {
    expect(String(metadata.title)).toBe("The Constitution and the Machine | Jason Cook Design");
    expect(String(metadata.title).length).toBeLessThanOrEqual(60);
    const description = String(metadata.description);
    expect(description.length).toBeGreaterThan(60);
    expect(description.length).toBeLessThanOrEqual(155);
    expect(description).not.toMatch(/online/i); // the page offers downloads, not a reader
    expect(description).toMatch(/PDF/);
    expect(description).toMatch(/EPUB/);
  });

  it("is listed in the sitemap", () => {
    expect(sitemap().map((e) => e.url)).toContain("https://jasoncookdesign.com/writing/longform");
  });
});
