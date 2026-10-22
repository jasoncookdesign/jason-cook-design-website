import Image from "next/image";
import Link from "next/link";
import { Post, ContentBlock } from "@/lib/writing";
import { renderBeats } from "@/components/ui/beats";

function renderBlock(block: ContentBlock, idx: number, fig: number) {
  switch (block.type) {
    case "p":
      return <p key={idx} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "h2":
      return <h2 key={idx}>{block.text}</h2>;
    case "blockquote":
      return (
        <blockquote key={idx}>
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
        </blockquote>
      );
    case "ul":
      return (
        <ul key={idx}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "img":
      return (
        <figure key={idx} className="fig">
          <Image src={block.src} alt={block.alt} width={960} height={540} />
          <figcaption>
            <span className="idx">FIG. {fig}</span>
            {block.credit && (
              <span dangerouslySetInnerHTML={{ __html: block.credit }} />
            )}
          </figcaption>
        </figure>
      );
    case "footnotes":
      return (
        <footer key={idx} className="fns">
          <p className="eyebrow">Footnotes</p>
          <ol>
            {block.items.map((fn) => (
              <li key={fn.ref} id={`fn-${fn.ref}`}>
                <span>[{fn.ref}]</span>
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
  // Plates are numbered through the post, FIG. 1 onward.
  let figCount = 0;
  const blocks = post.content.map((block) => ({
    block,
    fig: block.type === "img" ? ++figCount : 0,
  }));

  return (
    <article>
      <section className="hero page post g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/writing">Writing</Link>
            <span aria-hidden="true">/</span>
            <span>{displayDate}</span>
          </nav>
          <h1>{post.title}</h1>
          <div>
            <p className="lead">{post.excerpt}</p>
          </div>
          <div className="tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="BODY">
        <div className="pg">
          {post.layout === "figures-right" ? (
            <div className="prose beats">{renderBeats(blocks, renderBlock)}</div>
          ) : (
            <div className="prose">
              {blocks.map(({ block, fig }, idx) => renderBlock(block, idx, fig))}
            </div>
          )}
        </div>
      </section>

      <section className="pgs" data-sheet="A-103" data-name="CLOSE">
        <div className="pg">
          <Link href="/writing" className="btn tertiary">
            &larr; All writing
          </Link>
        </div>
      </section>
    </article>
  );
}
