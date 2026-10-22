import Link from "next/link";
import { posts, postHref } from "@/lib/writing";
import LongformEntry from "@/components/writing/LongformEntry";
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
              Notes from the seam between design and engineering, and a{" "}
              <a href="#longform">free book</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="BLOG">
        <div className="pg">
          <h2 className="eyebrow">Blog</h2>
        </div>
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
                href={postHref(post.slug)}
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

      <section className="pgs" id="longform" data-sheet="A-103" data-name="LONGFORM">
        <div className="pg">
          <h2 className="eyebrow">Longform</h2>
        </div>
        <div className="rows">
          <div className="pg">
            <LongformEntry />
          </div>
        </div>
      </section>
    </>
  );
}
