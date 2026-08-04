export default function PricingSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          What it costs
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          The first step costs $2,500.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every engagement opens the same way. You buy a diagnosis, not a
          project, and it concludes before anything is built.
        </p>

        {/* Entry offer card */}
        <div className="mt-10 rounded-xl ring-1 ring-foreground/10 p-8">
          <p className="text-lg font-semibold">
            [ENTRY-OFFER-NAME] &mdash; $2,500
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            I lead a paid diagnosis personally, looking at what you&apos;re trying to
            do, how the business runs now, what your customers experience, and
            where the friction is.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            You leave with a written recommendation: what the real problem is,
            what to address first, and what it takes. If the answer is something
            other than &ldquo;build it,&rdquo; that&apos;s what it says.
          </p>
        </div>

        {/* Beyond */}
        <div className="mt-8 space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            Everything after that gets quoted against what the diagnosis found,
            one outcome and one fixed price at a time.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            If you want me around after the build, that&apos;s a separate conversation
            and a separate decision.
          </p>
        </div>
      </div>
    </section>
  );
}
