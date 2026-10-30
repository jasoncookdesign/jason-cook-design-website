import EngagementsHero from "@/components/engagements/EngagementsHero";
import OperatingProblem from "@/components/engagements/OperatingProblem";
import EngagementPhases from "@/components/engagements/EngagementPhases";
import EngagementPortability from "@/components/engagements/EngagementPortability";
import EngagementPricing from "@/components/engagements/EngagementPricing";
import EngagementClose from "@/components/engagements/EngagementClose";
import EngagementFaq from "@/components/engagements/EngagementFaq";
import { withSocial } from "@/lib/metadata";

// DRAFT — Jason to edit
export const metadata = withSocial({
  title: "Operating Engagement | Jason Cook Design",
  description:
    "For a business that has outgrown its systems. Six phases, each priced and decided on its own, each leaving you something you can use.",
  openGraph: {
    title: "Operating Engagement | Jason Cook Design",
    description:
      "For a business that has outgrown its systems. Six phases, each priced and decided on its own, each leaving you something you can use.",
  },
  twitter: {
    title: "Operating Engagement | Jason Cook Design",
    description:
      "For a business that has outgrown its systems. Six phases, each priced and decided on its own, each leaving you something you can use.",
  },
});

export default function EngagementsPage() {
  return (
    <>
      <EngagementsHero />
      <OperatingProblem />
      <EngagementPhases kind="operating" />
      <EngagementPortability />
      <EngagementPricing />
      <EngagementFaq />
      <EngagementClose />
    </>
  );
}
