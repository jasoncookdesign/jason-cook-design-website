import Link from "next/link";
import { PHASE_ZERO } from "@/lib/phase-zero";
import { SHORT } from "@/lib/first-phase-terms";

const pricingCards: { label: string; body: string; link?: { text: string; label: string; href: string } }[] = [
  {
    label: "Set in advance",
    body: "The paid diagnosis is the only part with a price I can publish: $2,500. It’s the same number for everyone.",
    link: SHORT.credit,
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
    <section data-sheet="A-105" data-name="PRICE">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">How it&apos;s priced</p>
          <h2>
            Three ways this gets priced, and only{" "}
            <span className="muted">one of them is published.</span>
          </h2>
        </div>
      </div>
      <div className="plate eng-plate g">
        <div className="pl" data-build>
          <span className="regs" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          {pricingCards.map((card) => (
            <div key={card.label} className="sp">
              <div className="k">
                <span className="sq" />
                <span className="w">
                  {card.label}
                </span>
              </div>
              <div className="v">
                <p>{card.body}</p>
                {card.link && (
                  <p>
                    {card.link.text}{" "}
                    <Link href={card.link.href} className="underline">
                      {card.link.label}
                    </Link>
                    {card.label === "Set in advance" && (
                      <>
                        {" · "}
                        <Link href={PHASE_ZERO.sample.href} className="underline">
                          {PHASE_ZERO.sample.label}
                        </Link>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ul className="rows">
        {terms.map((term, i) => (
          <li key={i} className="row hold plain">
            <div>
              <p>{term}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
