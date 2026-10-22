import Image from "next/image";
import Link from "next/link";
import { book } from "@/lib/book";
import { postHref } from "@/lib/writing";

/** The Writing page's longform module. It reads only the book record; the announcement post is linked by slug. */
export default function LongformEntry() {
  const cover = book.plates[0];
  return (
    <div className="longform">
      <Link href={book.href} className="longform-thumb">
        <Image src={cover.src} alt={`Cover of ${book.title}`} width={cover.width} height={cover.height} sizes="(max-width: 899px) 40vw, 220px" />
      </Link>
      <div className="longform-body">
        <h3>
          <Link href={book.href}>{book.title}</Link>
        </h3>
        <p>{book.subtitle}</p>
        <div className="tags">
          <span className="tag">Free</span>
          <span className="tag">PDF</span>
          <span className="tag">EPUB</span>
        </div>
        <div className="longform-actions">
          <Link href={book.href} className="btn secondary">
            Get the book
          </Link>
          {book.announcementSlug && (
            <Link href={postHref(book.announcementSlug)} className="btn tertiary">
              Read the story behind the book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
