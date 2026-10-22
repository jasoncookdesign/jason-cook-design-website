// DRAFT — Jason to edit
const problemCards = [
  {
    label: "The old way",
    body: "The spreadsheet, the manual step, the tool you picked when the company was half this size. It still works. It just takes more of you every month.",
  },
  {
    label: "The internal attempt",
    body: "You put someone on it. Between their real job and the parts nobody owned, it stalled and nobody can say exactly when.",
  },
  {
    label: "The search outside",
    body: "Then you went looking outside. The question you couldn’t get answered was whether any of it is sized for a business like yours.",
  },
  {
    label: "The split",
    body: "By now you can describe what you need: the diagnosis and the build held by one capable expert. That’s the requirement you keep having to explain.",
  },
];

export default function OperatingProblem() {
  return (
    <section data-sheet="A-102" data-name="PROBLEM">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">If you&apos;re fixing how you run</p>
          <h2>You&apos;ve outgrown the systems you built to get here.</h2>
        </div>
      </div>
      <div className="cells c2" data-build>
        {problemCards.map((card) => (
          <article key={card.label} className="cell">
            <h3>{card.label}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
