// DRAFT — Jason to edit
const problemCards = [
  {
    label: "The idea",
    body: "You have a product or business line in mind, and the people around you like it. Their enthusiasm tells you little about whether customers will pay, or what it takes to deliver.",
  },
  {
    label: "The quick build",
    body: "The fastest path looks like building something and seeing what happens. A prototype gets made and money gets spent. By the time the answer arrives, it is expensive to act on.",
  },
  {
    label: "The advice",
    body: "You asked around: a strategy consultant, an agency, a technical person who might join. Each saw the part of it they sell, and none of them owned the whole decision.",
  },
  {
    label: "One owner",
    body: "By now you can describe what you need: one capable expert who tests the decision, defines the product, and builds it, with nothing lost between those steps.",
  },
];

export default function OfferingProblem() {
  return (
    <section data-sheet="A-102" data-name="PROBLEM">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">If you&apos;re launching something new</p>
          <h2>You have an offering in mind and a decision to make.</h2>
        </div>
      </div>
      <div className="cells c2">
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
