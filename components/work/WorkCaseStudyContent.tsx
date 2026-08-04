import Image from "next/image";
import Link from "next/link";
import { CaseStudy, Block } from "@/lib/work";

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={idx}
          className="text-base leading-relaxed text-neutral-700 mb-4"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "img":
      return (
        <div key={idx} className="my-8">
          <Image
            src={block.src}
            alt={block.alt}
            width={900}
            height={600}
            className="w-full h-auto rounded-sm"
          />
        </div>
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
    case "ol":
      return (
        <ol key={idx} className="list-decimal list-outside pl-6 mb-4 space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-base leading-relaxed text-neutral-700"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ol>
      );
    case "ul-strong":
      return (
        <ul key={idx} className="list-disc list-outside pl-6 mb-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="text-base leading-relaxed text-neutral-700">
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
  return (
    <article>
      {/* Hero */}
      <div className="relative w-full h-64 md:h-96 bg-neutral-900 overflow-hidden mb-12">
        <Image
          src={study.backgroundImage}
          alt={study.client}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <p className="text-sm uppercase tracking-widest text-white/70 mb-2">
            {study.client}
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-white leading-tight">
            {study.title}
          </h1>
          <p className="mt-3 text-lg text-white/80">{study.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {study.sections.map((section, sIdx) => (
          <section key={sIdx} className="mb-12">
            <h2 className="text-2xl font-light text-neutral-900 mb-5 capitalize">
              {section.heading}
            </h2>
            {section.diagnosisNote && (
              <aside className="bg-neutral-50 border-l-4 border-neutral-300 pl-4 py-3 mb-6 text-sm text-neutral-600 italic">
                {section.diagnosisNote}
              </aside>
            )}
            {section.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
          </section>
        ))}

        {/* Testimonial */}
        <blockquote className="border-l-4 border-neutral-800 pl-6 my-12">
          <p className="text-lg leading-relaxed text-neutral-700 italic mb-4">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <footer className="text-sm text-neutral-500">
            <strong className="text-neutral-800 not-italic">
              {study.testimonial.name}
            </strong>
            {" — "}
            {study.testimonial.role}
          </footer>
        </blockquote>

        <div className="mt-16 pt-8 border-t border-neutral-200">
          <Link
            href="/work"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            &larr; All work
          </Link>
        </div>
      </div>
    </article>
  );
}
