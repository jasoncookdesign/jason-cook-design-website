// DRAFT — Jason to edit
import Link from "next/link";
import { PHASES, PHASE_TITLES, type EngagementKind } from "@/lib/engagement-phases";
import { PHASE_ZERO } from "@/lib/phase-zero";

/** The phase list for either engagement type: the same titles, fields, and order, with each type's own content. */
export default function EngagementPhases({ kind }: { kind: EngagementKind }) {
  return (
    <section data-sheet="A-103" data-name="PHASES">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">What each one is for</p>
          <h2>What each phase gets you, and where you can stop.</h2>
        </div>
      </div>
      <ol className="rows" data-build>
        {PHASES[kind].map((phase, i) => (
          <li key={PHASE_TITLES[i]} className={`row hold${phase.optional ? " opt" : ""}`}>
            <span className="k">{String(i).padStart(2, "0")}</span>
            <div>
              <h3>{PHASE_TITLES[i]}</h3>
              {phase.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <dl className="pair">
                <dt>What you get</dt>
                <dd>{phase.gets}</dd>
                <dt>Closes with</dt>
                <dd>{phase.closes}</dd>
                <dt>Scoped and priced</dt>
                <dd>{phase.scoped}</dd>
              </dl>
              {phase.sample && (
                <p>
                  <Link href={PHASE_ZERO.sample.href} className="underline">
                    {PHASE_ZERO.sample.label}
                  </Link>
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
