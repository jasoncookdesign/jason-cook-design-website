const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

const stats = [
  { value: "8", label: "enterprise engagements" },
  { value: "143", label: "countries unified in one system" },
  { value: "40", plus: true, label: "industry awards for shipped work" },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-32">
      <div className="flex flex-col items-start gap-16 lg:flex-row">
        <div className="max-w-[900px] flex-1">
          <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            For startups and midmarket operators outgrowing their systems
          </p>
          <h1 className="text-[42px] font-extralight leading-[1.1] tracking-[-0.035em] text-ink sm:text-[62px] lg:text-[76px] lg:leading-[1.08]">
            Get a working system that solves the problem you{" "}
            <span className="text-muted-foreground font-medium">actually</span> have.
          </h1>
          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:gap-14 sm:max-w-[840px]">
            <p className="flex-1 font-sans text-lg font-light leading-relaxed text-body">
              I&apos;ve built systems like this at enterprise scale. That&apos;s how I
              know which parts you can leave out.
            </p>
            <p className="flex-1 font-sans text-lg font-light leading-relaxed text-body">
              Architecture, design specification, implementation, and the
              training to run it &mdash; delivered end-to-end, or I&apos;ll help
              you make it happen.
            </p>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-[6px] bg-btn-bg px-6 py-[15px] font-sans text-[15px] font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
            >
              Book your strategy call
              <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-accent" />
            </a>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              No commitment. 20 minutes.
              <br />
              Find out what you need &mdash; and what you don&apos;t.
            </p>
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-9 border-border pt-2 lg:w-[200px] lg:border-l lg:pl-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-sans text-[60px] font-extralight leading-none tracking-[-0.04em] text-ink">
                {stat.value}
                {stat.plus && <span className="text-accent">+</span>}
              </p>
              <p className="mt-2 font-sans text-[13px] leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
