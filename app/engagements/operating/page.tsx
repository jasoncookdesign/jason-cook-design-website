import EngagementsHero from "@/components/engagements/EngagementsHero";
import OperatingProblem from "@/components/engagements/OperatingProblem";
import PhaseArc from "@/components/engagements/PhaseArc";
import PortabilitySection from "@/components/engagements/PortabilitySection";
import EngagementsPricing from "@/components/engagements/EngagementsPricing";
import EngagementsClose from "@/components/engagements/EngagementsClose";
import EngagementsFaq from "@/components/engagements/EngagementsFaq";
import { withSocial } from "@/lib/metadata";

// DRAFT — Jason to edit
export const metadata = withSocial({
  title: "Operating Engagement | Jason Cook Design",
  description:
    "For a business that has outgrown its systems. Five phases, each priced and decided on its own, each leaving you something you can use.",
  openGraph: {
    title: "Operating Engagement | Jason Cook Design",
    description:
      "For a business that has outgrown its systems. Five phases, each priced and decided on its own, each leaving you something you can use.",
  },
  twitter: {
    title: "Operating Engagement | Jason Cook Design",
    description:
      "For a business that has outgrown its systems. Five phases, each priced and decided on its own, each leaving you something you can use.",
  },
});

export default function EngagementsPage() {
  return (
    <>
      <EngagementsHero />
      <OperatingProblem />
      <PhaseArc />
      <PortabilitySection />
      <EngagementsPricing />
      <EngagementsClose />
      <EngagementsFaq />
    </>
  );
}
