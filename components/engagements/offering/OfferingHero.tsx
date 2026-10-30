// DRAFT — Jason to edit
import EngagementHero from "../EngagementHero";

export default function OfferingHero() {
  return (
    <EngagementHero
      eyebrow="Offering Engagement"
      headline={
        <>
          Decide whether to build it.{" "}
          <span className="text-muted-foreground font-medium">Then decide how.</span>
        </>
      }
      paragraphs={[
        "This is for a new product or business line. It starts with the decision itself, so you know what you are betting on before anything is designed or built.",
        "You buy one phase at a time. Each gets its own scope, its own price, and its own decision.",
        "No contract covers the whole engagement. Stop after any phase and you keep what it produced.",
      ]}
      metric={{ value: "6", label: "phases, each priced and decided on its own" }}
    />
  );
}
