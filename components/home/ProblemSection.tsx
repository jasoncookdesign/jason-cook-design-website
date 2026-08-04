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

const solutionCards = [
  {
    label: "Find the real problem",
    body: "It starts with a paid diagnosis. Nothing gets designed or built until we write down what the problem is, with a shared definition of success.",
  },
  {
    label: "Design and build",
    body: "I write the architecture, specify the system, and build it. The diagnosis and the build stay in the same hands.",
  },
  {
    label: "Hand it over",
    body: "Then I train your team and step back. What stays behind is a system your people can operate without my help.",
  },
];

export default function ProblemSection() {
  return (
    <>
      {/* Problem */}
      <section className="py-20 sm:py-28 bg-muted/20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight">
            You&apos;ve outgrown the systems you built to get here.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {problemCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl ring-1 ring-foreground/8 p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-3 text-base leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Where I start
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            I find the real problem first. Then I build the fix.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {solutionCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl ring-1 ring-foreground/8 p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-3 text-base leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
