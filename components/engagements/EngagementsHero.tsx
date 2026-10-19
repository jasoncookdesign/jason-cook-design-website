// DRAFT — Jason to edit
import EngagementHero from "./EngagementHero";

export default function EngagementsHero() {
  return (
    <EngagementHero
      eyebrow="Operating Engagement"
      headline={
        <>
          Every phase leaves you something{" "}
          <span className="text-muted-foreground font-medium">you can use.</span>
        </>
      }
      paragraphs={[
        "This is for a business that has outgrown its systems. It starts with a diagnosis, so the problem is written down before anything is designed or built.",
        "You buy one phase at a time. Each gets its own scope, its own price, and its own decision.",
        "No contract covers the whole engagement, so what else you're agreeing to is nothing yet. Stop after any phase and you keep what it produced.",
      ]}
      metric={{ value: "5", label: "phases, each priced and decided on its own" }}
    />
  );
}
