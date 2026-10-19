// DRAFT — Jason to edit
const problemCards = [
  {
    n: "01",
    label: "The idea",
    body: "You have a product or business line in mind, and the people around you like it. Their enthusiasm tells you little about whether customers will pay, or what it takes to deliver.",
  },
  {
    n: "02",
    label: "The quick build",
    body: "The fastest path looks like building something and seeing what happens. A prototype gets made and money gets spent. By the time the answer arrives, it is expensive to act on.",
  },
  {
    n: "03",
    label: "The advice",
    body: "You asked around: a strategy consultant, an agency, a technical person who might join. Each saw the part of it they sell, and none of them owned the whole decision.",
  },
  {
    n: "04",
    label: "One owner",
    body: "By now you can describe what you need: one capable expert who tests the decision, defines the product, and builds it, with nothing lost between those steps.",
  },
];

export default function OfferingProblem() {
  return (
  <section className="border-t border-ink">
    <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        If you&apos;re launching something new
      </p>
      <h2 className="max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
        You have an offering in mind and a decision to make.
      </h2>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {problemCards.map((card) => (
          <div
            key={card.label}
            className="flex items-start gap-6 rounded-md border border-border p-7"
          >
            <span className="flex-shrink-0 font-sans text-4xl font-extralight leading-none tracking-[-0.04em] text-ghost">
              {card.n}
            </span>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-3 font-sans text-base leading-relaxed text-body">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}
