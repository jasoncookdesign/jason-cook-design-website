// DRAFT — Jason to edit
const solutionCards = [
  {
    n: "01",
    label: "Find the real problem",
    body: "It starts with a paid first phase: a diagnosis of how you run, or an assessment of what you plan to launch. Nothing gets designed or built until we write down the real question, with a shared definition of success. If the answer is not to build, that is what it says.",
  },
  {
    n: "02",
    label: "Design and build",
    body: "I write the architecture, specify what gets built, and build it. The diagnosis and the build stay in the same hands.",
  },
  {
    n: "03",
    label: "Hand it over",
    body: "Then I train your team and step back. What stays behind is something your people can run without my help.",
  },
];

export default function StartSection() {
  return (
    <section data-sheet="A-103" data-name="START">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">Where I start</p>
          <h2>I find the real problem first. Then I build the answer.</h2>
        </div>
      </div>
      <div className="cells c3">
        {solutionCards.map((card) => (
          <article key={card.label} className="cell">
            <span className="idx">{card.n}</span>
            <h3>{card.label}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
