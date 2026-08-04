const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function CtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          When you&apos;re done guessing how to fix it
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          &ldquo;Build the right thing&rdquo; comes before &ldquo;build the thing right.&rdquo;
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
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
