import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/work";

export const metadata = {
  title: "Work | Jason Cook Design",
};

export default function WorkPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-12 border-b border-ink pb-10">
        <div className="max-w-[720px]">
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Work
          </p>
          <h1 className="text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-5xl">
            Work
          </h1>
          <p className="mt-4 font-sans text-xl font-light leading-relaxed text-body">
            Eight enterprise engagements — each starting with a diagnosis of
            the actual problem before any design work began.
          </p>
        </div>
        <p className="whitespace-nowrap font-sans text-[80px] font-extralight leading-[0.8] tracking-[-0.05em] text-ghost sm:text-[100px]">
          08
        </p>
      </div>

      <ul className="list-none">
        {caseStudies.map((cs, i) => (
          <li key={cs.slug} className="border-b border-border">
            <Link
              href={`/work/${cs.slug}`}
              className="group grid grid-cols-1 items-center gap-6 py-7 sm:grid-cols-[56px_340px_1fr_44px] sm:gap-10"
            >
              <span className="pl-2 font-mono text-[13px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative block h-[160px] overflow-hidden rounded-[6px] border border-border sm:h-[186px]">
                <Image
                  src={cs.backgroundImage}
                  alt={cs.client}
                  fill
                  className="object-cover"
                />
              </span>
              <span className="block pr-6">
                <span className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {cs.client}
                </span>
                <span className="mt-3 block font-sans text-2xl font-light leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
                  {cs.title}
                </span>
                <span className="mt-3 block max-w-[560px] font-sans text-base leading-relaxed text-body">
                  {cs.indexOneLiner}
                </span>
              </span>
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[6px] border border-border transition-colors group-hover:border-ink">
                <span className="block h-[11px] w-[11px] -translate-x-[1px] rotate-45 border-r border-t border-accent" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
