const options = [
  {
    n: "01",
    label: "End-to-end delivery",
    headline: "I build it, you run it",
    body: "You get a written architecture, a technical specification, implementation, and training to operate it.",
  },
  {
    n: "02",
    label: "Specification and build-out guide",
    headline: "I design it, your people build it, then you run it",
    body: "If you’d rather have your team or a partner build it, I’ll ensure they have what they need to get the job done right.",
  },
];

export default function DeliveryOptionsSection() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="max-w-[760px]">
        <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          How you buy it
        </p>
        <h2 className="text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[52px] sm:leading-[1.12]">
          Two ways to get it built.
        </h2>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {options.map((opt) => (
          <div
            key={opt.label}
            className="flex flex-col gap-[18px] rounded-[6px] border border-border p-9"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-accent font-mono text-xs font-medium text-link">
              {opt.n}
            </span>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {opt.label}
            </p>
            <p className="font-sans text-[28px] font-light leading-[1.25] tracking-[-0.02em] text-ink">
              {opt.headline}
            </p>
            <p className="font-sans text-base leading-relaxed text-body">
              {opt.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
