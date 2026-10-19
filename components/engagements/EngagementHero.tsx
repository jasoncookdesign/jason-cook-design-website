// DRAFT — Jason to edit
import type { CSSProperties, ReactNode } from "react";

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
    <section className="hero g eng-hero" data-sheet="A-101" data-name="HERO">
      <div className="main">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{headline}</h1>
        <div className="eng-hero-copy">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="side">
        <div className="statrow" style={{ "--n": 1 } as CSSProperties} data-hero-metric>
          <div>
            <span className="v" data-hero-metric-value>
              {metric.value}
            </span>
            <span className="l" data-hero-metric-label>
              {metric.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
