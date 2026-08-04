const pricingCards = [
  {
    label: "Set in advance",
    body: "The [ENTRY-OFFER-NAME] is the only part with a price I can publish: $2,500. It’s the same number for everyone.",
  },
  {
    label: "Quoted per phase",
    body: "The four phases after it are quoted one at a time, each at a fixed price for that phase. You’re buying an outcome, not hours.",
  },
  {
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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          How it&apos;s priced
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Three ways this gets priced, and only one of them is published.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pricingCards.map((card) => (
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
        <div className="mt-12 space-y-3">
          {terms.map((term, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
              {term}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
