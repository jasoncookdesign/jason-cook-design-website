import Image from "next/image";
import Link from "next/link";
import { Post, ContentBlock } from "@/lib/writing";

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={idx}
          className="text-base leading-relaxed text-neutral-700 mb-4"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "h2":
      return (
        <h2
          key={idx}
          className="text-2xl font-light text-neutral-900 mt-10 mb-4"
        >
          {block.text}
        </h2>
      );
    case "blockquote":
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-neutral-300 pl-5 my-6 italic text-neutral-600"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "ul":
      return (
        <ul key={idx} className="list-disc list-outside pl-6 mb-4 space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-base leading-relaxed text-neutral-700"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      );
    case "img":
      return (
        <figure key={idx} className="my-8">
          <Image
            src={block.src}
            alt={block.alt}
            width={900}
            height={500}
            className="w-full h-auto rounded-sm"
          />
          {block.credit && (
            <figcaption
              className="text-xs text-neutral-500 mt-2 text-center"
              dangerouslySetInnerHTML={{ __html: block.credit }}
            />
          )}
        </figure>
      );
    case "footnotes":
      return (
        <footer key={idx} className="mt-12 pt-6 border-t border-neutral-200">
          <ol className="space-y-2 text-sm text-neutral-500">
            {block.items.map((fn) => (
              <li key={fn.ref} id={`fn-${fn.ref}`} className="flex gap-2">
                <span className="shrink-0 font-medium">[{fn.ref}]</span>
                <span dangerouslySetInnerHTML={{ __html: fn.html }} />
              </li>
            ))}
          </ol>
        </footer>
      );
    default:
      return null;
  }
}

interface Props {
  post: Post;
}

export default function WritingPostContent({ post }: Props) {
  const displayDate = new Date(post.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="text-sm text-neutral-500 mb-3">{displayDate}</p>
        <h1 className="text-3xl md:text-4xl font-light text-neutral-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-neutral-600">{post.excerpt}</p>
      </header>

      <div>
        {post.content.map((block, idx) => renderBlock(block, idx))}
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-200">
        <Link
          href="/writing"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          &larr; All writing
        </Link>
      </div>
    </article>
  );
}
