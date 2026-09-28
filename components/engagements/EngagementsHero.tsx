export default function EngagementsHero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28">
      <div className="flex flex-col items-start gap-16 lg:flex-row">
        <div className="flex-1">
          <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            After the first step
          </p>
          <h1 className="max-w-[900px] text-4xl font-extralight leading-[1.1] tracking-[-0.035em] text-ink sm:text-[62px] lg:text-[72px] lg:leading-[1.08]">
            Every phase leaves you something{" "}
            <span className="text-muted-foreground font-medium">you can use.</span>
          </h1>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-14 sm:max-w-[840px]">
            <p className="font-sans text-lg font-light leading-relaxed text-body">
              The question that follows a published price is what else
              you&apos;re agreeing to. Here, the answer is nothing yet.
            </p>
            <p className="font-sans text-lg font-light leading-relaxed text-body">
              You buy one phase at a time. Each gets its own scope, its own
              price, and its own decision.
            </p>
            <p className="font-sans text-lg font-light leading-relaxed text-body">
              No contract covers the whole engagement. Stop after any phase
              and you keep what it produced.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 border-border pl-0 lg:w-[260px] lg:border-l lg:pl-8">
          <p className="font-sans text-[72px] font-extralight leading-none tracking-[-0.04em] text-ink">
            5
          </p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
            phases, each priced and decided on its own
          </p>
        </div>
      </div>
    </section>
  );
}
