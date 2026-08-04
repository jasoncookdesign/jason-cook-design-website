const options = [
  {
    label: "End-to-end delivery",
    headline: "I build it, you run it",
    body: "You get a written architecture, a technical specification, implementation, and training to operate it.",
  },
  {
    label: "Specification and build-out guide",
    headline: "I design it, your people build it, then you run it",
    body: "If you’d rather have your team or a partner build it, I’ll ensure they have what they need to get the job done right.",
  },
];

export default function DeliveryOptionsSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          How you buy it
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          Two ways to get it built.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {options.map((opt) => (
            <div
              key={opt.label}
              className="rounded-xl ring-1 ring-foreground/8 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {opt.label}
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug">
                {opt.headline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {opt.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
