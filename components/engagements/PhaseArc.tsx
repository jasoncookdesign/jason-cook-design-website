import Link from "next/link";
import { SAMPLE_PATH } from "@/lib/first-phase-terms";

const phases = [
  {
    n: "00",
    label: "Zero — diagnose it",
    changes: [
      "You get a written report on what the real problem is, what to address first, and what addressing it takes. It may say you shouldn't build.",
      "It takes about a week and two to three hours of your time. The $2,500 is credited in full if you go on to the next phase.",
    ],
    evidence: "The artifact is the report and the recommendation it ends in, with every finding linked to its evidence.",
    term: "Fixed price, quoted before you start.",
    sample: true,
  },
  {
    n: "01",
    label: "One — understand it, then decide the shape",
    changes: [
      "You get one recommendation. It says what to do, why it fits your business, what got rejected, and which tradeoffs you're taking.",
      "You also come out with cost ranges for building it and for running it afterward, and the things that move those numbers.",
    ],
    evidence:
      "The artifact is an architecture: the systems the business should run on, and the order to get there in.",
    term: "Scoped after the first step.",
  },
  {
    n: "02",
    label: "Two — specify it in detail",
    changes: [
      "The build stops being an unknown. What it takes gets decided item by item, and that's what the build gets priced from.",
      "This is where deployment, data, access, integrations, and testing get decided, before anyone starts building.",
    ],
    evidence:
      "The artifact is a technical specification: the build, described closely enough to hand to whoever builds it.",
    term: "Scoped after the architecture.",
  },
  {
    n: "03",
    label: "Three — build it",
    changes: [
      "The manual step goes away. What replaces it runs in your environment, with your data moved over and the connections in place.",
      "This is the phase that varies most. What's in it comes from the specification you already approved.",
    ],
    evidence:
      "The artifact is the system itself: built, configured, tested, migrated, delivered.",
    term: "Scoped after the specification.",
  },
  {
    n: "04",
    label: "Four — hand it over",
    changes: [
      "Your team runs it while I'm still on the engagement, so the questions get answered while I'm still the one answering them.",
      "What they learn is the operating part: reading its health, approving changes, adding workflows, and knowing when something needs escalating.",
    ],
    evidence:
      "The artifact is a handoff package. Your team being able to run it is the deliverable, not a bonus.",
    term: "Scoped after the build is planned.",
  },
  {
    n: "05",
    label: "Five — stay available",
    changes: [
      "The four phases above are meant to end with your team running the system without me. This one is built to be declined.",
      "If you want me available after that, it's monthly, and it covers what you actually want me for: review, coaching, or capacity held open.",
      "It carries a three-month minimum. You get a quarter where I don't leave for a bigger opportunity, and I get a quarter of steady work.",
      "If you'd rather not commit to that, the other route stays open: another bounded piece of work, scoped and priced when it comes up.",
    ],
    evidence: null, // Phase 5 deliberately has no artifact at point of sale
    term: "Scoped after handoff, if you want it.",
  },
];

export default function PhaseArc() {
  return (
    <section data-sheet="A-103" data-name="PHASES">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">What each one is for</p>
          <h2>What each phase changes, and what it leaves behind.</h2>
        </div>
      </div>
      <ol className="rows" data-build>
        {phases.map((phase) => (
          <li key={phase.label} className="row hold">
            <span className="k">{phase.n}</span>
            <div>
              <h3>{phase.label}</h3>
              {phase.changes.map((change, ci) => (
                <p key={ci}>{change}</p>
              ))}
              <dl className="pair">
                <dt>What it leaves behind</dt>
                <dd>
                  {phase.evidence && <p>{phase.evidence}</p>}
                  <p className="term">{phase.term}</p>
                </dd>
              </dl>
              {phase.sample && (
                <p>
                  <Link href={SAMPLE_PATH} className="underline">
                    See a sample of the report
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
