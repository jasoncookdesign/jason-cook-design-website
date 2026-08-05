import Image from "next/image";
import Link from "next/link";
import { CaseStudy, Block } from "@/lib/work";

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={idx}
          className="mb-5 font-sans text-lg leading-[1.75] text-body-strong"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "img":
      return (
        <figure key={idx} className="my-14">
          <Image
            src={block.src}
            alt={block.alt}
            width={900}
            height={600}
            className="h-auto w-full rounded-[6px] border border-border"
          />
        </figure>
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
    case "ol":
      return (
        <ol key={idx} className="mb-5 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[20px_1fr] gap-3 font-sans text-lg leading-[1.75] text-body-strong"
            >
              <span className="font-mono text-sm text-muted-foreground">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ol>
      );
    case "ul-strong":
      return (
        <ul key={idx} className="mb-5 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[20px_1fr] gap-3 font-sans text-lg leading-[1.75] text-body-strong"
            >
              <span className="text-accent">&mdash;</span>
              <span>
                <strong className="font-medium">{item.label}</strong>
                {item.rest}
              </span>
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
  return (
    <article>
      {/* Hero — light, text-led. Case-study screenshots appear at full
          opacity in the body; the hero itself carries no dimmed photo. */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28">
          <p className="mb-10 font-sans text-[13px] text-muted-foreground">
            Work <span className="px-2 text-ghost">/</span> {study.client}
          </p>
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {study.client}
          </p>
          <h1 className="max-w-[800px] text-4xl font-extralight leading-[1.1] tracking-[-0.035em] text-ink sm:text-[62px]">
            {study.title}
          </h1>
          <p className="mt-6 max-w-[640px] font-sans text-xl font-light leading-relaxed text-body sm:text-[22px]">
            {study.subtitle}
          </p>
        </div>
      </div>

      {/* Body — long-form reading measure */}
      <div className="mx-auto max-w-[720px] px-6 py-20 sm:py-24">
        {study.sections.map((section, sIdx) => (
          <section key={sIdx} className="mb-14">
            <h2 className="mb-6 font-sans text-[32px] font-light capitalize leading-tight tracking-[-0.02em] text-ink">
              {section.heading}
            </h2>
            {section.diagnosisNote && (
              <aside className="mb-7 rounded-[6px] border border-border bg-surface px-6 py-5 font-sans text-[15px] leading-relaxed text-body">
                {section.diagnosisNote}
              </aside>
            )}
            {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
          </section>
        ))}

        {/* Testimonial */}
        <blockquote className="my-14 flex flex-col gap-5">
          <span className="block h-px w-5 bg-accent" />
          <p className="font-sans text-2xl font-light leading-relaxed text-ink">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <footer className="font-sans text-sm text-muted-foreground">
            <strong className="font-medium text-ink">
              {study.testimonial.name}
            </strong>
            {" — "}
            {study.testimonial.role}
          </footer>
        </blockquote>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/work"
            className="font-sans text-sm text-muted-foreground transition-colors hover:text-ink"
          >
            &larr; All work
          </Link>
        </div>
      </div>
    </article>
  );
}
