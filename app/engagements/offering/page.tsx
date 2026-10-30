// DRAFT — Jason to edit
import OfferingHero from "@/components/engagements/offering/OfferingHero";
import OfferingProblem from "@/components/engagements/offering/OfferingProblem";
import EngagementPhases from "@/components/engagements/EngagementPhases";
import EngagementPortability from "@/components/engagements/EngagementPortability";
import EngagementPricing from "@/components/engagements/EngagementPricing";
import EngagementFaq from "@/components/engagements/EngagementFaq";
import EngagementClose from "@/components/engagements/EngagementClose";
import { withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: "Offering Engagement | Jason Cook Design",
  description:
    "For a new product or business line. Six phases from the decision to launch, bought one at a time, each leaving you something you can use.",
  openGraph: {
    title: "Offering Engagement | Jason Cook Design",
    description:
      "For a new product or business line. Six phases from the decision to launch, bought one at a time, each leaving you something you can use.",
  },
  twitter: {
    title: "Offering Engagement | Jason Cook Design",
    description:
      "For a new product or business line. Six phases from the decision to launch, bought one at a time, each leaving you something you can use.",
  },
});

export default function OfferingEngagementPage() {
  return (
    <>
      <OfferingHero />
      <OfferingProblem />
      <EngagementPhases kind="offering" />
      <EngagementPortability />
      <EngagementPricing />
      <EngagementFaq />
      <EngagementClose />
    </>
  );
}
