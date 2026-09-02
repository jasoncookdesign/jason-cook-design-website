export const metadata = {
  title: "About | Jason Cook Design",
  description:
    "Jason Cook is the founder and principal of Jason Cook Design LLC, a design and strategy consultancy based in Texas.",
  openGraph: {
    title: "About | Jason Cook Design",
    description:
      "Jason Cook is the founder and principal of Jason Cook Design LLC, a design and strategy consultancy based in Texas.",
  },
};

// Verified facts only; full biography copy pending.
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <div className="max-w-[720px] flex-1">
          <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            About
          </p>
          <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
            About
          </h1>

          <div className="mt-10 flex flex-col gap-5">
            <p className="font-sans text-xl font-light leading-relaxed text-body-strong">
              <strong className="font-medium">Jason Cook</strong> is the
              founder and principal of{" "}
              <strong className="font-medium">Jason Cook Design LLC</strong>,
              a design and strategy consultancy based in{" "}
              <strong className="font-medium">Texas</strong>.
            </p>
            <p className="font-sans text-[17px] leading-[1.7] text-body">
              The firm advises enterprise clients on coherence — the
              alignment of customer experience, product strategy, and
              organizational structure.
            </p>
          </div>

          <aside
            className="mt-10 rounded-[6px] border border-dashed border-ghost px-6 py-5 font-mono text-[13px] leading-relaxed text-muted-foreground"
            aria-label="Content placeholder"
          >
            More about the practice is coming soon.
          </aside>
        </div>

        <dl className="flex flex-col gap-7 border-border pl-0 lg:mt-24 lg:w-[280px] lg:flex-shrink-0 lg:border-l lg:pl-8">
          <div className="flex flex-col gap-2">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Based in
            </dt>
            <dd className="font-sans text-base leading-snug text-ink">
              Texas, working remotely
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Practice
            </dt>
            <dd className="font-sans text-base leading-snug text-ink">
              Architecture, specification, implementation, handoff
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Contact
            </dt>
            <dd className="font-sans text-base leading-snug">
              <a
                href="mailto:hello@jasoncookdesign.com"
                className="text-link transition-colors hover:text-accent"
              >
                hello@jasoncookdesign.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
