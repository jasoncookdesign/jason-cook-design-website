const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function EngagementsClose() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 py-24 text-center sm:px-10 sm:py-28">
        <h2 className="max-w-[840px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[48px] sm:leading-[1.15]">
          Every phase here is meant to be a place you can stop.
        </h2>
        <p className="font-sans text-xl font-light leading-relaxed text-body">
          The first one is the only one you&apos;re deciding on now.
        </p>
        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-3 rounded-[6px] bg-btn-bg px-6 py-[15px] font-sans text-[15px] font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
        >
          Book your strategy call
          <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-accent" />
        </a>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          No commitment. 20 minutes.
        </p>
      </div>
    </section>
  );
}
