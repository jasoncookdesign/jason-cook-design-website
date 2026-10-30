import Link from "next/link";

export default function EngagementPortability() {
  return (
    <section data-sheet="A-104" data-name="PORTABILITY">
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">If you replace me</p>
          <h2>You can hand this to another provider at any seam.</h2>
        </div>
      </div>
      <div className="eng-body">
        <div className="prose">
          <p>
            No contract covers the whole engagement. Each phase is scoped and
            agreed on its own, so you are never committed to the next one by the
            one before it.
          </p>
          <p>
            The architecture is written so someone else can follow the
            rationale, the constraints, the boundaries, and the assumptions
            that still need checking.
          </p>
          <p>The specification is written so someone else can build from it.</p>
          <p>
            That&apos;s what the written work is for. Every one of those
            documents is meant to be read by someone who isn&apos;t me.
          </p>
          <p>
            The tools I use to produce them stay mine. That split is written
            into the roadmap you get at the end of the first phase.{" "}
            <Link href="/#faq-11" className="underline">What do I keep when it&apos;s over?</Link>
          </p>
          <blockquote>
            The reason to keep me should be that the work is still worth what
            it costs, not that leaving is hard.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
