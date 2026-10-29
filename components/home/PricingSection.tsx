// DRAFT — Jason to edit

function Regs() {
  return (
    <span className="regs" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Key({ k }: { k: string }) {
  return (
    <div className="k">
      <span className="sq" aria-hidden="true" />
      <span className="w">
        <span className="l">{k}</span>
      </span>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="plate g" data-sheet="A-106" data-name="PRICE">
      <div className="t">
        <p className="eyebrow">What it costs</p>
        <h2>Where you start, and what it costs.</h2>
        <p className="lede">
          The Offering Engagement opens with a paid assessment of the decision.
          The Operating Engagement opens with a diagnosis that concludes
          before anything is built.
        </p>
        <div className="notes">
          <p>
            Before either one, there&apos;s a free 20-minute call. I listen,
            then send you a summary of how, and whether, I can help.
          </p>
          <p>
            Everything after that gets quoted against what the diagnosis
            found, one outcome and one fixed price at a time.
          </p>
          <p>
            If you want me around after the build, that&apos;s a separate
            conversation and a separate decision.
          </p>
        </div>
      </div>

      <div className="plates" data-build>
        {/* Offering Engagement entry plate. */}
        <div className="pl">
          <Regs />
          <div className="pl-h">
            <p>Offering Engagement</p>
            <p className="price">$2,500</p>
          </div>
          <div className="sp">
            <Key k="What happens" />
            <div className="v">
              <p>
                For a new product or business line, the first phase is a paid
                assessment of the decision itself.
              </p>
            </div>
          </div>
          <div className="sp">
            <Key k="What you keep" />
            <div className="v">
              <p>
                You leave with a written verdict and the proof behind it.
              </p>
            </div>
          </div>
        </div>

        {/* Operating Engagement entry plate. */}
        <div className="pl">
          <Regs />
          <div className="pl-h">
            <p>Operating Engagement</p>
            <p className="price">$2,500</p>
          </div>
          <div className="sp">
            <Key k="What happens" />
            <div className="v">
              <p>
                I lead a paid diagnosis personally, looking at what you&apos;re trying
                to do, how the business runs now, what your customers experience,
                and where the friction is.
              </p>
            </div>
          </div>
          <div className="sp">
            <Key k="What you keep" />
            <div className="v">
              <p>
                You leave with a written recommendation: what the real problem is,
                what to address first, and what it takes. If the answer is
                something other than &ldquo;build it,&rdquo; that&apos;s what it says.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
