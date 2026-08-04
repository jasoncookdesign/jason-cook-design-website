import EngagementsHero from "@/components/engagements/EngagementsHero";
import PhaseArc from "@/components/engagements/PhaseArc";
import PortabilitySection from "@/components/engagements/PortabilitySection";
import EngagementsPricing from "@/components/engagements/EngagementsPricing";
import EngagementsClose from "@/components/engagements/EngagementsClose";
import EngagementsFaq from "@/components/engagements/EngagementsFaq";

export const metadata = {
  title: "Engagements | Jason Cook Design",
  description:
    "Every phase leaves you something you can use. How the work is structured, priced, and handed over.",
};

export default function EngagementsPage() {
  return (
    <>
      <EngagementsHero />
      <PhaseArc />
      <PortabilitySection />
      <EngagementsPricing />
      <EngagementsClose />
      <EngagementsFaq />
    </>
  );
}
