// DRAFT — Jason to edit
export default function OfferingHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28">
      <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Offering Engagement
      </p>
      <h1 className="max-w-[900px] text-4xl font-extralight leading-[1.1] tracking-[-0.035em] text-ink sm:text-[62px] lg:text-[72px] lg:leading-[1.08]">
        Decide whether to build it.{" "}
        <span className="text-muted-foreground font-medium">Then decide how.</span>
      </h1>
      <div className="mt-12 grid gap-6 sm:max-w-[840px] sm:grid-cols-2 sm:gap-14">
        <p className="font-sans text-lg font-light leading-relaxed text-body">
          This is for a new product or business line. It starts with the
          decision itself, so you know what you are betting on before anything
          is designed or built.
        </p>
        <p className="font-sans text-lg font-light leading-relaxed text-body">
          You buy one phase at a time. Each phase has its own scope and its
          own decision, and each leaves you something you can use.
        </p>
      </div>
    </section>
  );
}
