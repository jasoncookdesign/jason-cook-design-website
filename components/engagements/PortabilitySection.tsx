export default function PortabilitySection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            If you replace me
          </p>
          <h2 className="text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
            You can hand this to another provider at any seam.
          </h2>
        </div>
        <div className="flex flex-col gap-5 pt-1">
          <p className="font-sans text-[17px] leading-[1.7] text-body">
            The architecture is written so someone else can follow the
            rationale, the constraints, the boundaries, and the assumptions
            that still need checking.
          </p>
          <p className="font-sans text-[17px] leading-[1.7] text-body">
            The specification is written so someone else can build from it.
          </p>
          <p className="font-sans text-[17px] leading-[1.7] text-body">
            That&apos;s what the written work is for. Every one of those
            documents is meant to be read by someone who isn&apos;t me.
          </p>
          <p className="font-sans text-[17px] leading-[1.7] text-body">
            The tools I use to produce them stay mine. That split is written
            into the roadmap you get at the end of the first step.
          </p>
          <p className="mt-4 border-l border-accent py-1 pl-6 font-sans text-[22px] font-light leading-relaxed text-ink">
            The reason to keep me should be that the work is still worth what
            it costs, not that leaving is hard.
          </p>
        </div>
      </div>
    </section>
  );
}
