const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          For startups and midmarket operators outgrowing their systems.
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight leading-tight sm:text-6xl">
          Get a working system that solves the problem you actually have.
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          I&apos;ve built systems like this at enterprise scale. That&apos;s how I know which
          parts you can leave out.
        </p>
        <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
          Architecture, design specification, implementation, and the training to run
          it &mdash; delivered end-to-end, or I&apos;ll help you make it happen.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            Book your strategy call
          </a>
          <p className="text-sm text-muted-foreground">
            No commitment. 20 minutes. Find out what you need &mdash; and what you
            don&apos;t.
          </p>
        </div>
      </div>
    </section>
  );
}
