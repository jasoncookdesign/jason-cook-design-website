import Image from "next/image";
import Link from "next/link";
import { CaseStudy, Block } from "@/lib/work";
import { renderBeats } from "@/components/ui/beats";
import LoopVideo from "./LoopVideo";

function renderBlock(block: Block, idx: number, fig: number) {
  switch (block.type) {
    case "p":
      return <p key={idx} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "img":
      return (
        <figure key={idx} className="fig">
          {block.loop ? (
            <LoopVideo src={block.src} alt={block.alt} width={block.loop.width} height={block.loop.height} />
          ) : (
            <Image src={block.src} alt={block.alt} width={900} height={600} />
          )}
          <figcaption>FIG. {fig}</figcaption>
        </figure>
      );
    case "ul":
      return (
        <ul key={idx}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case "ul-strong":
      return (
        <ul key={idx}>
          {block.items.map((item, i) => (
            <li key={i}>
              <strong>{item.label}</strong>
              {item.rest}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

interface Props {
  cs: CaseStudy;
}

export default function WorkCaseStudyContent({ cs: study }: Props) {
  // Plates are numbered through the whole study, FIG. 1 onward.
  let figCount = 0;
  const sheets = study.sections.map((section) => ({
    section,
    blocks: section.blocks.map((block) => ({
      block,
      fig: block.type === "img" ? ++figCount : 0,
    })),
  }));
  const proofSheet = 102 + study.sections.length;

  return (
    <article>
      {/* Title block: a light, text-led hero. Screenshots appear at full opacity as plates in the body. */}
      <section className="hero page long g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <p className="eyebrow">{study.client}</p>
          <h1>{study.title}</h1>
          <div>
            <p className="lead">{study.subtitle}</p>
          </div>
        </div>
      </section>

      {sheets.map(({ section, blocks }, sIdx) => (
        <section
          key={sIdx}
          className="pgs"
          data-sheet={`A-${102 + sIdx}`}
          data-name="BODY"
        >
          <div className="intro g">
            <div className="t">
              <h2>{section.heading}</h2>
            </div>
          </div>
          <div className="pg">
            {section.diagnosisNote && (
              <aside className="note">{section.diagnosisNote}</aside>
            )}
            <div className="prose beats">{renderBeats(blocks, renderBlock)}</div>
          </div>
        </section>
      ))}

      {study.testimonial && (
        <section className="pgs" data-sheet={`A-${proofSheet}`} data-name="PROOF">
          <div className="quotes one">
            <figure>
              <blockquote>
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className={study.testimonial.photo ? "byline" : undefined}>
                {study.testimonial.photo && (
                  <Image src={study.testimonial.photo} alt="" width={60} height={60} />
                )}
                <span>
                  <b>{study.testimonial.name}</b>
                  {study.testimonial.role}
                </span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section
        className="pgs"
        data-sheet={`A-${proofSheet + (study.testimonial ? 1 : 0)}`}
        data-name="CLOSE"
      >
        <div className="pg">
          <Link href="/work" className="btn tertiary">
            &larr; All work
          </Link>
        </div>
      </section>
    </article>
  );
}
