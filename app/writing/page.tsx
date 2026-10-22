import Link from "next/link";
import { posts } from "@/lib/writing";
import { withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: "Writing | Jason Cook Design",
  description:
    "Notes from the seam between design and engineering, by Jason Cook.",
  openGraph: {
    title: "Writing | Jason Cook Design",
    description:
      "Notes from the seam between design and engineering, by Jason Cook.",
  },
});

export default function WritingPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <p className="eyebrow">Writing</p>
          <h1>Writing</h1>
          <div>
            <p className="lead">
              Notes from the seam between design and engineering.
            </p>
          </div>
        </div>
        <div className="side">
          <p className="count">{String(posts.length).padStart(2, "0")}</p>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="INDEX">
        <div className="rows">
          {posts.map((post) => {
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
                <span className="btn secondary sm">
                  Read the post <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
