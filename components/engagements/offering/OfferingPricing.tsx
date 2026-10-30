// DRAFT — Jason to edit
import Link from "next/link";
import { PHASE_ZERO } from "@/lib/phase-zero";
import { SHORT } from "@/lib/first-phase-terms";

export default function OfferingPricing() {
  return (
    <section className="eng-price" data-sheet="A-105" data-name="PRICE">
      <div className="plate eng-plate g">
        <div className="t">
          <h2>What it costs</h2>
        </div>
        <div className="pl" data-build>
          <span className="regs" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <div className="pl-h">
            <span>Assess the decision</span>
            <span className="price">$2,500</span>
          </div>
          <div className="sp">
            <div className="k">
              <span className="sq" />
              <span className="w">
                <span className="l">A</span>
              </span>
            </div>
            <div className="v">
              <p>The first phase is paid. It concludes before anything is designed or built.</p>
              <p>
                <Link href={PHASE_ZERO.sample.href} className="underline">
                  {PHASE_ZERO.sample.label}
                </Link>
              </p>
            </div>
          </div>
          <div className="sp">
            <div className="k">
              <span className="sq" />
              <span className="w">
                <span className="l">B</span>
              </span>
            </div>
            <div className="v">
              <p>Every later phase is quoted on its own, once the one before it has closed.</p>
              <p>
                {SHORT.both.text}{" "}
                <Link href={SHORT.both.href} className="underline">
                  {SHORT.both.label}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
