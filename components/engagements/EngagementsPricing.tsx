const pricingCards = [
  {
    n: "01",
    label: "Set in advance",
    body: "The [ENTRY-OFFER-NAME] is the only part with a price I can publish: $2,500. It’s the same number for everyone.",
  },
  {
    n: "02",
    label: "Quoted per phase",
    body: "The four phases after it are quoted one at a time, each at a fixed price for that phase. You’re buying an outcome, not hours.",
  },
  {
    n: "03",
    label: "Monthly, if you want it",
    body: "The last one is a subscription. What it buys is defined availability, response expectations, and where my responsibility stops.",
  },
];

const terms = [
  "A quote can’t be issued before the phase has a stated outcome and a written definition of done.",
  "Payments are milestone-based, three parts by default, each one tied to a point in the phase.",
  "The price moves when the work changes: a new objective, a system nobody mentioned, a decision reversed, feedback after the window closed.",
  "I absorb my own errors, my own learning curve, and ordinary variation inside what I quoted.",
  "A late payment pauses the work. It never accrues interest, a finance charge, or a late fee.",
];

export default function EngagementsPricing() {
  return (
    <section className="mx-auto max-w-[1200px] border-t border-border px-6 py-24 sm:px-10 sm:py-28">
      <div className="max-w-[800px]">
        <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          How it&apos;s priced
        </p>
        <h2 className="text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[52px] sm:leading-[1.12]">
          Three ways this gets priced, and only{" "}
          <span className="text-muted-foreground font-medium">one of them is published.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {pricingCards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-4 rounded-[6px] border border-border p-8"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-accent font-mono text-xs font-medium text-link">
              {card.n}
            </span>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {card.label}
            </p>
            <p className="font-sans text-base leading-relaxed text-body">
              {card.body}
            </p>
          </div>
        ))}
      </div>
      <ul className="mt-14 max-w-[900px] list-none border-t border-border p-0">
        {terms.map((term, i) => (
          <li
            key={i}
            className="grid grid-cols-[32px_1fr] gap-5 border-b border-border py-5 font-sans text-base leading-relaxed text-body"
          >
            <span className="font-mono text-[13px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{term}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
