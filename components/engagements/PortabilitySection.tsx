export default function PortabilitySection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          If you replace me
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          You can hand this to another provider at any seam.
        </h2>
        <div className="mt-8 space-y-4">
          <p className="text-base leading-relaxed text-muted-foreground">
            The architecture is written so someone else can follow the rationale,
            the constraints, the boundaries, and the assumptions that still need
            checking.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The specification is written so someone else can build from it.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            That&apos;s what the written work is for. Every one of those documents is
            meant to be read by someone who isn&apos;t me.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The tools I use to produce them stay mine. That split is written into
            the roadmap you get at the end of the first step.
          </p>
          <p className="text-base leading-relaxed">
            The reason to keep me should be that the work is still worth what it
            costs, not that leaving is hard.
          </p>
        </div>
      </div>
    </section>
  );
}
