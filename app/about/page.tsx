export const metadata = {
  title: "About | Jason Cook Design",
};

// Verified facts only; full biography copy pending.
export default function AboutPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-light tracking-tight text-neutral-900 mb-10">
          About
        </h1>

        <div className="space-y-4 text-base text-neutral-700 leading-relaxed">
          <p>
            <strong>Jason Cook</strong> is the founder and principal of{" "}
            <strong>Jason Cook Design LLC</strong>, a design and strategy
            consultancy based in <strong>Texas</strong>.
          </p>
          <p>
            The firm advises enterprise clients on coherence — the alignment of
            customer experience, product strategy, and organizational structure.
          </p>
        </div>

        <aside
          className="mt-12 p-4 border border-dashed border-neutral-400 text-sm text-neutral-500"
          aria-label="Content placeholder"
        >
          More about the practice is coming soon.
        </aside>
      </div>
    </section>
  );
}
