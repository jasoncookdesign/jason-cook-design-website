import Image from "next/image";
import Link from "next/link";
import { book, fileSizeLabel } from "@/lib/book";

function Plate({ index }: { index: number }) {
  const plate = book.plates[index];
  return (
    <figure className="fig book-plate">
      <Image src={plate.src} alt={plate.alt} width={plate.width} height={plate.height} sizes={index === 0 ? "(max-width: 899px) 90vw, 690px" : "(max-width: 1199px) 340px, 420px"} priority={index === 0} />
      <figcaption>
        <span className="idx">FIG. {index + 1}</span>
        {plate.caption}
      </figcaption>
    </figure>
  );
}

export default function BookPage() {
  const pdfSize = fileSizeLabel(book.formats.pdf.file);
  const epubSize = fileSizeLabel(book.formats.epub.file);
  // each part's first chapter number, so the list numbers run 1 to 16 across the parts
  const firstChapter = book.parts.map((_, i) => 1 + book.parts.slice(0, i).reduce((n, p) => n + p.chapters.length, 0));

  return (
    <article>
      <section className="hero page post book g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/writing">Writing</Link>
            <span aria-hidden="true">/</span>
            <span>Longform</span>
          </nav>
          <h1>{book.title}</h1>
          <div>
            <p className="lead">{book.subtitle}</p>
          </div>
          <p className="sub">By {book.author}</p>
          <div className="book-actions">
            <div className="book-action">
              <a className="btn secondary" href={book.formats.pdf.href} download>
                Download the PDF
              </a>
              {pdfSize && <span className="book-size">{pdfSize}</span>}
            </div>
            <div className="book-action">
              <a className="btn secondary" href={book.formats.epub.href} download>
                Download the EPUB
              </a>
              {epubSize && <span className="book-size">{epubSize}</span>}
            </div>
          </div>
          <p className="book-facts">{`Free \u00b7 ${book.pages} pages`}</p>
        </div>
        <div className="side">
          <Plate index={0} />
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="ABOUT">
        <div className="pg book-body">
          <div className="book-body-main">
            <div className="prose">
              {book.blurb.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="book-contents" role="region" aria-label="Contents">
              <h2 className="book-contents-title">Contents</h2>
              <div className="toc">
                <ul className="toc-matter">
                  <li>{book.frontMatter}</li>
                </ul>
                {book.parts.map((part, partIndex) => (
                  <div className="toc-part" key={part.numeral}>
                    <p className="lbl">Part {part.numeral}</p>
                    <h3>{part.title}</h3>
                    <ol>
                      {part.chapters.map((title, i) => (
                        <li key={title} value={firstChapter[partIndex] + i}>
                          <span>{title}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
                <ul className="toc-matter">
                  <li>{book.backMatter}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="book-plates">
            <Plate index={1} />
            <Plate index={2} />
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-103" data-name="CLOSE">
        <div className="pg">
          <p className="book-disclaimer">{book.disclaimer}</p>
          <Link href="/writing" className="btn tertiary">
            &larr; All writing
          </Link>
        </div>
      </section>
    </article>
  );
}
