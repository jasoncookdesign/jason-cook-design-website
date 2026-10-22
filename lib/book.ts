import fs from "fs";
import path from "path";

export interface BookPart { numeral: string; title: string; chapters: string[] }
export interface BookFormat { name: string; href: string; file: string }
export interface BookPlate { src: string; alt: string; caption: string; width: number; height: number }
export interface Book {
  slug: string; href: string; announcementSlug?: string; title: string; subtitle: string; author: string; description: string; blurb: string[]; disclaimer: string;
  pages: number; formats: { pdf: BookFormat; epub: BookFormat };
  frontMatter: string; backMatter: string; parts: BookPart[]; plates: BookPlate[];
}

/** The free book, listed under Writing. The downloads live in public/book/; the page shows a size for a file only when the file is present at build time. */
export const book: Book = {
  slug: "the-constitution-and-the-machine",
  href: "/writing/longform",
  // The slug of the blog post that announces the book, linked from the Writing page. A slug only, so this module does not depend on the blog collection.
  announcementSlug: "the-blog-post-that-became-a-book",
  title: "The Constitution and the Machine",
  subtitle: "Technology, Governance, and the Limits of Power",
  author: "Jason Cook",
  description:
    "A free book by Jason Cook on how constitutions handle technology that turns one kind of power into another. Download the PDF or the EPUB.",
  blurb: [
    "The U.S. Constitution keeps one kind of power from turning into another, and it has little to say about technology that now does exactly that. Its clauses still work where they reach: a foreign prince cannot pay a federal officer, and a title cannot be handed down like a crown.",
    "Governments and companies can now see, predict, and decide at a scale the Framers never imagined. That leaves a question every citizen faces: when power in one place can turn into power everywhere, what keeps a free people free?",
    "This book follows the question from ancient Athens to the American founding to the systems running today, and ends where peaceful change can begin: state constitutions, city charters, and the rules your own community already lets you amend.",
    "The Constitution has served for more than two centuries, and it has been amended twenty-seven times along the way. This book invites you to read it as a working design, and to help decide what it needs next.",
  ],
  disclaimer: "The views in this book are his own and do not represent any client or employer.",
  pages: 173,
  formats: {
    pdf: { name: "Screen PDF", href: "/book/the-constitution-and-the-machine.pdf", file: "book/the-constitution-and-the-machine.pdf" },
    epub: { name: "EPUB", href: "/book/the-constitution-and-the-machine.epub", file: "book/the-constitution-and-the-machine.epub" },
  },
  frontMatter: "Foreword",
  backMatter: "Coda: The Window",
  parts: [
    { numeral: "I", title: "The Machine That Was Built", chapters: ["The Jury Summons and the Kleroterion", "A Brilliant Machine for 1787", "The Menu of Power in 1787", "Compression"] },
    { numeral: "II", title: "What Changed", chapters: ["The Menu Got Longer", "Conversion, Named Plainly", "The Decompression"] },
    { numeral: "III", title: "Two Futures on One Machine", chapters: ["The Competent Autocracy", "The Distributed Republic", "How the Good Version Breaks"] },
    { numeral: "IV", title: "The Design Problem", chapters: ["From “Who Governs?” to “What Procedure Is Legitimate Here?”", "Non-Convertibility", "The Power Graph", "Constitutional Entropy"] },
    { numeral: "V", title: "Getting There Without Blood", chapters: ["How Change Actually Happens", "What You Could Start On Monday"] },
  ],
  plates: [
    {
      src: "/images/book/book-mockup.jpg", width: 1600, height: 1100, caption: "The book",
      alt: "A mockup of the book as a hardcover at an angle, with its spine showing: a parchment cover with a script texture above a dark cover with the title The Constitution and the Machine, by Jason Cook.",
    },
    {
      src: "/images/book/chapter-opener.png", width: 935, height: 1445, caption: "A chapter opener",
      alt: "A page from the book: the opener of Chapter 2, “A Brilliant Machine for 1787”, with the first paragraphs of the chapter.",
    },
    {
      src: "/images/book/notes-page.png", width: 935, height: 1445, caption: "A page with chapter notes",
      alt: "A page from the book: the end of Chapter 2, followed by its numbered notes, each citing a source.",
    },
  ],
};

/** "2.4 MB" for a file under public/, or null when it is not there (it is added at go-live). */
export function fileSizeLabel(file: string): string | null {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", file)).size;
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
  } catch {
    return null;
  }
}
