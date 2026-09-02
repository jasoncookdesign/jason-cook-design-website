import Link from "next/link";

export const metadata = {
  title: "Capabilities | Jason Cook Design",
  description:
    "Architecture, specification, implementation, and handoff — the range of work Jason Cook Design takes on.",
  openGraph: {
    title: "Capabilities | Jason Cook Design",
    description:
      "Architecture, specification, implementation, and handoff — the range of work Jason Cook Design takes on.",
  },
};

// Structural shell only; full page copy pending.
export default function CapabilitiesPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="max-w-[800px]">
        <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Capabilities and institutional work
        </p>
        <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
          Capabilities
        </h1>

        <p className="mt-8 font-sans text-xl font-light leading-relaxed text-body">
          The work speaks most clearly. Eight case studies across enterprise
          software, global consumer platforms, and regulated industries
          demonstrate the range of engagements this practice takes on.
        </p>

        <Link
          href="/work"
          className="mt-8 inline-block font-sans text-base text-link transition-colors hover:text-accent"
        >
          See all case studies &rarr;
        </Link>

        <aside
          className="mt-10 rounded-[6px] border border-dashed border-ghost px-6 py-5 font-mono text-[13px] leading-relaxed text-muted-foreground"
          aria-label="Content placeholder"
        >
          More detail on institutional engagements is coming soon.
        </aside>
      </div>
    </section>
  );
}
