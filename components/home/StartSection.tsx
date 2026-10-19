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
      <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
        <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Where I start
        </p>
        <h2 className="max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
          I find the real problem first. Then I build the answer.
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {solutionCards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col gap-5 rounded-md border border-border p-8"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent font-mono text-xs font-medium text-link">
                {card.n}
              </span>
              <p className="font-sans text-[22px] font-normal leading-tight tracking-[-0.015em] text-ink">
                {card.label}
              </p>
              <p className="font-sans text-base leading-relaxed text-body">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>
  );
}
