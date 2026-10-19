// DRAFT — Jason to edit
export default function OfferingPricing() {
  return (
    <section className="mx-auto max-w-[1200px] border-t border-border px-6 py-24 sm:px-10 sm:py-28">
      <h2 className="max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
        What it costs
      </h2>
      <div className="mt-10 flex max-w-[520px] flex-col gap-4 rounded-[6px] border border-ink p-6 sm:p-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Assess the decision
        </p>
        <p className="font-sans text-2xl font-extralight tracking-[-0.02em] text-ink">
          [GAP: Phase 0 price pending]
        </p>
        <p className="font-sans text-base leading-relaxed text-body">
          The first phase is paid. It concludes before anything is designed or
          built.
        </p>
        <p className="font-sans text-base leading-relaxed text-muted-foreground">
          Every later phase is quoted on its own, once the one before it has
          closed.
        </p>
      </div>
    </section>
  );
}
