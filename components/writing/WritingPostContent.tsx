import Image from "next/image";
import Link from "next/link";
import { Post, ContentBlock } from "@/lib/writing";

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={idx}
          className="mb-5 font-sans text-lg leading-[1.75] text-body-strong"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "h2":
      return (
        <h2
          key={idx}
          className="mb-5 mt-12 font-sans text-[32px] font-light leading-tight tracking-[-0.02em] text-ink"
        >
          {block.text}
        </h2>
      );
    case "blockquote":
      return (
        <blockquote
          key={idx}
          className="my-8 border-l border-accent pl-7"
        >
          <p
            className="font-sans text-2xl font-light leading-relaxed text-ink"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </blockquote>
      );
    case "ul":
      return (
        <ul key={idx} className="mb-5 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[20px_1fr] gap-3 font-sans text-lg leading-[1.75] text-body-strong"
            >
              <span className="text-accent">&mdash;</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case "img":
      return (
        <figure key={idx} className="my-14">
          <Image
            src={block.src}
            alt={block.alt}
            width={960}
            height={540}
            className="h-auto w-full rounded-[6px] border border-border"
          />
          {block.credit && (
            <figcaption
              className="ml-0.5 mt-3.5 font-sans text-[13px] leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: block.credit }}
            />
          )}
        </figure>
      );
    case "footnotes":
      return (
        <footer key={idx} className="mt-14 border-t border-border pt-6">
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Footnotes
          </p>
          <ol className="flex flex-col gap-2">
            {block.items.map((fn) => (
              <li
                key={fn.ref}
                id={`fn-${fn.ref}`}
                className="grid grid-cols-[32px_1fr] gap-3 font-sans text-sm leading-[1.7] text-muted-foreground"
              >
                <span className="font-mono text-muted-foreground">
                  [{fn.ref}]
                </span>
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
    <article className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-8 font-sans text-[13px] text-muted-foreground">
          Writing <span className="px-2 text-ghost">/</span> {displayDate}
        </p>
        <h1 className="text-3xl font-extralight leading-[1.12] tracking-[-0.035em] text-ink sm:text-[52px]">
          {post.title}
        </h1>
        <p className="mt-6 font-sans text-xl font-light leading-[1.55] text-body sm:text-[22px]">
          {post.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-[6px] border border-border px-[10px] py-[5px] font-mono text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[720px]">
        {post.content.map((block, idx) => renderBlock(block, idx))}
      </div>

      <div className="mx-auto mt-16 max-w-[720px] border-t border-border pt-8">
        <Link
          href="/writing"
          className="font-sans text-sm text-muted-foreground transition-colors hover:text-ink"
        >
          &larr; All writing
        </Link>
      </div>
    </article>
  );
}
