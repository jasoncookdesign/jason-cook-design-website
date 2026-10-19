// DRAFT — Jason to edit
import EngagementTypeCards from "@/components/engagements/EngagementTypeCards";

export default function EngagementFork() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-10 sm:pb-28">
      <h2 className="mb-10 max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
        Two ways to start. Pick the one that sounds like you.
      </h2>
      <EngagementTypeCards />
    </section>
  );
}
