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

export default function OfferingPhases() {
  return (
    <section data-sheet="A-103" data-name="PHASES">
      <div className="intro g">
        <div className="t">
          <h2>Six phases. Each one is a place you can stop.</h2>
        </div>
      </div>
      <ol className="rows" data-build>
        {phases.map((p, i) => (
          <li key={p.label} className="row hold">
            <span className="k">{String(i).padStart(2, "0")}</span>
            <div>
              <h3>{p.label}</h3>
              <dl className="pair">
                <dt>{HOLDS}</dt>
                <dd>{p.holds}</dd>
                <dt>{CLOSES}</dt>
                <dd>{p.closes}</dd>
              </dl>
            </div>
          </li>
        ))}
        <li className="row hold opt">
          <span className="k">05</span>
          <div>
            <h3>{availability.label}</h3>
            <p>{availability.intro}</p>
            <ul>
              {availability.forms.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <dl className="pair">
              <dt>{HOLDS}</dt>
              <dd>{availability.holds}</dd>
              <dt>{CLOSES}</dt>
              <dd>{availability.closes}</dd>
            </dl>
          </div>
        </li>
      </ol>
    </section>
  );
}
