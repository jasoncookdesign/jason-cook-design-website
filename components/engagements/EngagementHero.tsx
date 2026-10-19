// DRAFT — Jason to edit
import type { ReactNode } from "react";

interface EngagementHeroProps {
  /** The engagement type's name. */
  eyebrow: string;
  /** Headline; the second clause goes in a muted span. */
  headline: ReactNode;
  /** Who it is for and how it opens, how it is bought, and what you keep if you stop. */
  paragraphs: [string, string, string];
  metric: { value: string; label: string };
}

/** Shared by every engagement type's page, so the views behind the selector line up. */
export default function EngagementHero({ eyebrow, headline, paragraphs, metric }: EngagementHeroProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28">
      <div className="flex flex-col items-start gap-16 lg:flex-row">
        <div className="flex-1">
          <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="max-w-[900px] text-4xl font-extralight leading-[1.1] tracking-[-0.035em] text-ink sm:text-[62px] lg:text-[72px] lg:leading-[1.08]">
            {headline}
          </h1>
          <div className="mt-12 grid gap-6 sm:max-w-[840px] sm:grid-cols-2 sm:gap-14">
            {paragraphs.map((p) => (
              <p key={p} className="font-sans text-lg font-light leading-relaxed text-body">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div
          data-hero-metric
          className="flex-shrink-0 border-border pl-0 lg:w-[260px] lg:border-l lg:pl-8"
        >
          <p
            data-hero-metric-value
            className="font-sans text-[72px] font-extralight leading-none tracking-[-0.04em] text-ink"
          >
            {metric.value}
          </p>
          <p
            data-hero-metric-label
            className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground"
          >
            {metric.label}
          </p>
        </div>
      </div>
    </section>
  );
}
