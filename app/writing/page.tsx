import Link from "next/link";
import { posts } from "@/lib/writing";

export const metadata = {
  title: "Writing | Jason Cook Design",
};

export default function WritingPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-light tracking-tight text-neutral-900 mb-4">
          Writing
        </h1>
        <p className="text-xl text-neutral-500 mb-16 max-w-2xl">
          Notes from the seam between design and engineering.
        </p>

        <ul className="divide-y divide-neutral-200">
          {posts.map((post) => {
            const displayDate = new Date(
              post.date + "T00:00:00"
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <li key={post.slug} className="py-8">
                <Link
                  href={`/writing/${post.slug}`}
                  className="group block"
                >
                  <p className="text-sm text-neutral-400 mb-2">{displayDate}</p>
                  <h2 className="text-xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-base text-neutral-500 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
