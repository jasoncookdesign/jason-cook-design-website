import Link from "next/link";

export const metadata = {
  title: "Capabilities | Jason Cook Design",
};

// Structural shell only; full page copy pending.
export default function CapabilitiesPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-light tracking-tight text-neutral-900 mb-10">
          Capabilities
        </h1>

        <p className="text-base text-neutral-700 leading-relaxed mb-8">
          The work speaks most clearly. Eight case studies across enterprise
          software, global consumer platforms, and regulated industries
          demonstrate the range of engagements this practice takes on.
        </p>

        <Link
          href="/work"
          className="inline-block text-base text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
        >
          See all case studies &rarr;
        </Link>

        <aside
          className="mt-12 p-4 border border-dashed border-neutral-400 text-sm text-neutral-500"
          aria-label="Content placeholder"
        >
          More detail on institutional engagements is coming soon.
        </aside>
      </div>
    </section>
  );
}
