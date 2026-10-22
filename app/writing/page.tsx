import Link from "next/link";
import { posts } from "@/lib/writing";
import { book } from "@/lib/book";
import { withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: "Writing | Jason Cook Design",
  description:
    "Notes from the seam between design and engineering, and a free book on technology and governance, by Jason Cook.",
  openGraph: {
    title: "Writing | Jason Cook Design",
    description:
      "Notes from the seam between design and engineering, and a free book on technology and governance, by Jason Cook.",
  },
});

// Newest first. The registry stays in the order posts were added; the index sorts a copy by date.
const newestFirst = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function WritingPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <h1>Writing</h1>
          <div>
            <p className="lead">
              Notes from the seam between design and engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="INDEX">
        <div className="rows" data-build>
          {newestFirst.map((post) => {
            const displayDate = new Date(
              post.date + "T00:00:00"
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="row"
              >
                <span className="k">{displayDate}</span>
                <div>
                  <h2 className="title">{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="btn secondary icon">
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pgs" data-sheet="A-103" data-name="BOOK">
        <div className="rows">
          <Link href={`/writing/${book.slug}`} className="row book-entry">
            <h2 className="k">Book</h2>
            <div>
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <div className="tags">
                <span className="tag">Free</span>
                <span className="tag">PDF</span>
                <span className="tag">EPUB</span>
              </div>
            </div>
            <span className="go" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
