const problemCards = [
  {
    n: "01",
    label: "The old way",
    body: "The spreadsheet, the manual step, the tool you picked when the company was half this size. It still works. It just takes more of you every month.",
  },
  {
    n: "02",
    label: "The internal attempt",
    body: "You put someone on it. Between their real job and the parts nobody owned, it stalled and nobody can say exactly when.",
  },
  {
    n: "03",
    label: "The search outside",
    body: "Then you went looking outside. The question you couldn’t get answered was whether any of it is sized for a business like yours.",
  },
  {
    n: "04",
    label: "The split",
    body: "By now you can describe what you need: the diagnosis and the build held by one capable expert. That’s the requirement you keep having to explain.",
  },
];

const solutionCards = [
  {
    n: "01",
    label: "Find the real problem",
    body: "It starts with a paid diagnosis. Nothing gets designed or built until we write down what the problem is, with a shared definition of success.",
  },
  {
    n: "02",
    label: "Design and build",
    body: "I write the architecture, specify the system, and build it. The diagnosis and the build stay in the same hands.",
  },
  {
    n: "03",
    label: "Hand it over",
    body: "Then I train your team and step back. What stays behind is a system your people can operate without my help.",
  },
];

export default function ProblemSection() {
  return (
    <>
      {/* Problem */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
          <h2 className="max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
            You&apos;ve outgrown the systems you built to get here.
          </h2>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {problemCards.map((card) => (
              <div
                key={card.label}
                className="flex items-start gap-6 rounded-[6px] border border-border p-7"
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

      {/* Solution */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
        <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Where I start
        </p>
        <h2 className="max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
          I find the real problem first. Then I build the fix.
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {solutionCards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col gap-5 rounded-[6px] border border-border p-8"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-accent font-mono text-xs font-medium text-link">
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
    </>
  );
}
