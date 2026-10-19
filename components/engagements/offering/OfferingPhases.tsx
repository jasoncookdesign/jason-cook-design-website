// DRAFT — Jason to edit
const HOLDS = "You hold";
const CLOSES = "Closes with";

const phases = [
  {
    label: "Assess the decision",
    holds:
      "A written verdict on whether to build, with the proof artifacts behind it.",
    closes: "Your decision: go, change course, or stop.",
  },
  {
    label: "Define the model and product",
    holds:
      "A tested business model and a product definition you could hand to any team.",
    closes: "Your decision to commit to design, or to stop with the definition in hand.",
  },
  {
    label: "Design the technology",
    holds:
      "An architecture and a build plan that anyone capable can build from.",
    closes: "Your decision to build and who builds it, or to stop with the plan in hand.",
  },
  {
    label: "Build the product",
    holds:
      "A working product, built by me or directed by me, depending on the client.",
    closes: "Your decision to launch, or to stop with the working product.",
  },
  {
    label: "Launch",
    holds:
      "Brand, positioning, and a go-to-market plan, with the product live.",
    closes: "Your decision to scale, hold, or stop.",
  },
];

const availability = {
  label: "Ongoing availability (optional)",
  intro:
    "This phase is optional and entirely your choice. If you want it, it takes one of these forms:",
  forms: [
    "Fractional technical and product leadership",
    "Periodic review of the product and the plan",
    "Coaching for you or your team",
    "Held capacity, so I can start quickly when you call",
  ],
  holds: "Whichever form you chose, on terms we agree in advance.",
  closes: "Nothing further. You can stop here, and there is no obligation to continue.",
};

const dtClass =
  "font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:pt-1";
const ddClass = "font-sans text-base leading-relaxed text-body";
const dlClass = "mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-[120px_1fr]";

export default function OfferingPhases() {
  return (
    <section className="border-t border-ink">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
        <h2 className="max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
          Six phases. Each one is a place you can stop.
        </h2>
        <ol className="mt-14 flex list-none flex-col gap-6">
          {phases.map((p, i) => (
            <li key={p.label} className="rounded-md border border-border p-6 sm:p-8">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-2xl font-light tracking-[-0.02em] text-ink">
                {p.label}
              </h3>
              <dl className={dlClass}>
                <dt className={dtClass}>{HOLDS}</dt>
                <dd className={ddClass}>{p.holds}</dd>
                <dt className={dtClass}>{CLOSES}</dt>
                <dd className={ddClass}>{p.closes}</dd>
              </dl>
            </li>
          ))}
          <li className="rounded-md border border-dashed border-border p-6 sm:p-8">
            <span className="font-mono text-xs text-muted-foreground">05</span>
            <h3 className="mt-2 text-2xl font-light tracking-[-0.02em] text-ink">
              {availability.label}
            </h3>
            <p className="mt-4 font-sans text-base leading-relaxed text-body">
              {availability.intro}
            </p>
            <ul className="mt-3 flex list-none flex-col gap-2">
              {availability.forms.map((f) => (
                <li key={f} className="font-sans text-base leading-relaxed text-body">
                  {f}
                </li>
              ))}
            </ul>
            <dl className={dlClass}>
              <dt className={dtClass}>{HOLDS}</dt>
              <dd className={ddClass}>{availability.holds}</dd>
              <dt className={dtClass}>{CLOSES}</dt>
              <dd className={ddClass}>{availability.closes}</dd>
            </dl>
          </li>
        </ol>
      </div>
    </section>
  );
}
