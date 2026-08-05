const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function PricingSection() {
  return (
    <section className="mx-auto max-w-[1200px] border-t border-border px-6 py-24 sm:px-10 sm:py-28">
      <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            What it costs
          </p>
          <h2 className="text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[52px] sm:leading-[1.12]">
            The first step costs <span className="whitespace-nowrap">$2,500.</span>
          </h2>
          <p className="mt-6 max-w-[480px] font-sans text-[17px] leading-relaxed text-body">
            Every engagement opens the same way. You buy a diagnosis, not a
            project, and it concludes before anything is built.
          </p>
          <div className="mt-10 flex max-w-[480px] flex-col gap-4">
            <p className="font-sans text-base leading-relaxed text-muted-foreground">
              Everything after that gets quoted against what the diagnosis
              found, one outcome and one fixed price at a time.
            </p>
            <p className="font-sans text-base leading-relaxed text-muted-foreground">
              If you want me around after the build, that&apos;s a separate
              conversation and a separate decision.
            </p>
          </div>
        </div>

        {/* Entry offer card */}
        <div className="flex flex-col gap-6 rounded-[6px] border border-ink p-10">
          <div className="flex items-baseline justify-between gap-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              [ENTRY-OFFER-NAME]
            </p>
            <p className="font-sans text-[44px] font-extralight leading-none tracking-[-0.04em] text-ink">
              $2,500
            </p>
          </div>
          <p className="font-sans text-base leading-relaxed text-body">
            I lead a paid diagnosis personally, looking at what you&apos;re trying
            to do, how the business runs now, what your customers experience,
            and where the friction is.
          </p>
          <p className="font-sans text-base leading-relaxed text-body">
            You leave with a written recommendation: what the real problem is,
            what to address first, and what it takes. If the answer is
            something other than &ldquo;build it,&rdquo; that&apos;s what it says.
          </p>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-3 rounded-[6px] bg-btn-bg px-[22px] py-[14px] font-sans text-[15px] font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
          >
            Book your strategy call
            <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-accent" />
          </a>
        </div>
      </div>
    </section>
  );
}
