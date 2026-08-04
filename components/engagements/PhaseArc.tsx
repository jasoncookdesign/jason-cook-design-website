const phases = [
  {
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          What each one is for
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          What each phase changes, and what it leaves behind.
        </h2>
        <div className="mt-12 space-y-12">
          {phases.map((phase) => (
            <div
              key={phase.label}
              className="rounded-xl ring-1 ring-foreground/8 p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {phase.label}
              </p>
              <div className="mt-4 space-y-3">
                {phase.changes.map((change, i) => (
                  <p key={i} className="text-base leading-relaxed">
                    {change}
                  </p>
                ))}
              </div>
              {phase.evidence && (
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground border-t border-border/40 pt-4">
                  {phase.evidence}
                </p>
              )}
              <p className="mt-3 text-xs text-muted-foreground/70">
                {phase.term}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
