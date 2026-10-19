// DRAFT — Jason to edit
import EngagementTypeCards from "@/components/engagements/EngagementTypeCards";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export const metadata = {
  title: "Engagements | Jason Cook Design",
  description:
    "Two kinds of engagement: one builds how your business runs, the other builds what it sells. Pick the one that matches your situation.",
};

export default function EngagementsChooserPage() {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28">
        <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Engagements
        </p>
        <h1 className="max-w-[900px] text-4xl font-extralight leading-[1.1] tracking-[-0.035em] text-ink sm:text-[62px] lg:text-[72px] lg:leading-[1.08]">
          Two kinds of work.{" "}
          <span className="text-muted-foreground font-medium">Pick your situation.</span>
        </h1>
        <p className="mt-12 max-w-[640px] font-sans text-lg font-light leading-relaxed text-body">
          One builds how your business runs. The other builds what it sells.
          Both are bought one phase at a time, and each phase leaves you
          something you can use.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-10 sm:pb-28">
        <EngagementTypeCards />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-6 py-24 text-center sm:px-10 sm:py-28">
          <h2 className="max-w-[840px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[48px] sm:leading-[1.15]">
            Not sure which one fits? Talk it through.
          </h2>
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
            No commitment. 20 minutes. Find out what you need &mdash; and what you
            don&apos;t.
          </p>
        </div>
      </section>
    </>
  );
}
