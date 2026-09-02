import Link from "next/link";
import { posts } from "@/lib/writing";

export const metadata = {
  title: "Writing | Jason Cook Design",
  description:
    "Notes from the seam between design and engineering, by Jason Cook.",
  openGraph: {
    title: "Writing | Jason Cook Design",
    description:
      "Notes from the seam between design and engineering, by Jason Cook.",
  },
};

export default function WritingPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-10 border-b border-ink pb-10">
        <div className="max-w-[720px]">
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Writing
          </p>
          <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
            Writing
          </h1>
          <p className="mt-4 max-w-[640px] font-sans text-xl font-light leading-relaxed text-body">
            Notes from the seam between design and engineering.
          </p>
        </div>
        <p className="font-sans text-[80px] font-extralight leading-[0.8] tracking-[-0.05em] text-ghost sm:text-[100px]">
          {String(posts.length).padStart(2, "0")}
        </p>
      </div>

      <ul className="list-none">
        {posts.map((post) => {
          const displayDate = new Date(
            post.date + "T00:00:00"
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <li key={post.slug} className="border-b border-border">
              <Link
                href={`/writing/${post.slug}`}
                className="grid grid-cols-1 items-start gap-3 py-9 transition-colors hover:bg-surface sm:grid-cols-[170px_1fr_240px] sm:gap-12"
              >
                <span className="font-mono text-[13px] text-muted-foreground">
                  {displayDate}
                </span>
                <span className="block max-w-[680px]">
                  <span className="block font-sans text-2xl font-light leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
                    {post.title}
                  </span>
                  <span className="mt-3 block font-sans text-base leading-relaxed text-body">
                    {post.excerpt}
                  </span>
                </span>
                <span className="flex flex-wrap justify-start gap-2 sm:justify-end">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-[6px] border border-border px-[10px] py-[5px] font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
