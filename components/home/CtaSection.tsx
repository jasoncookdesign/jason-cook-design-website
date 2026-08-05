const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function CtaSection() {
  return (
    <section className="border-t border-border bg-band-bg text-band-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-7 px-6 py-24 text-center sm:px-10 sm:py-[120px]">
        <h2 className="max-w-[900px] text-3xl font-extralight tracking-[-0.035em] sm:text-[56px] sm:leading-[1.12]">
          When you&apos;re done guessing how to fix it
        </h2>
        <p className="font-sans text-xl font-light leading-relaxed text-band-body">
          &ldquo;Build the right thing&rdquo; comes before &ldquo;build the thing right.&rdquo;
        </p>
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-3 rounded-[6px] bg-band-btn-bg px-[26px] py-4 font-sans text-[15px] font-medium text-band-btn-ink transition-colors hover:bg-band-btn-hover"
        >
          Book your strategy call
          <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-link" />
        </a>
        <p className="font-sans text-sm leading-relaxed text-band-muted">
          No commitment. 20 minutes. Find out what you need &mdash; and what you
          don&apos;t.
        </p>
      </div>
    </section>
  );
}
