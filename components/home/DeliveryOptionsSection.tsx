const options = [
  {
    label: "End-to-end delivery",
    headline: "I build it, you run it",
    body: "You get a written architecture, a technical specification, implementation, and training to operate it.",
  },
  {
    label: "Specification and build-out guide",
    headline: "I design it, your people build it, then you run it",
    body: "If you’d rather have your team or a partner build it, I’ll ensure they have what they need to get the job done right.",
  },
];

export default function DeliveryOptionsSection() {
  return (
    <section data-sheet="A-104" data-name="DELIVERY">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">How you buy it</p>
          <h2>Two ways to get it built.</h2>
        </div>
      </div>
      <div className="cells c2" data-build>
        {options.map((opt) => (
          <article key={opt.label} className="cell">
            <p className="lbl">{opt.label}</p>
            <h3>{opt.headline}</h3>
            <p>{opt.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
