// DRAFT — Jason to edit
import OfferingHero from "@/components/engagements/offering/OfferingHero";
import OfferingProblem from "@/components/engagements/offering/OfferingProblem";
import OfferingPhases from "@/components/engagements/offering/OfferingPhases";
import OfferingPortability from "@/components/engagements/offering/OfferingPortability";
import OfferingPricing from "@/components/engagements/offering/OfferingPricing";
import OfferingClose from "@/components/engagements/offering/OfferingClose";

export const metadata = {
  title: "Offering Engagement | Jason Cook Design",
  description:
    "For a new product or business line. Six phases from the decision to launch, bought one at a time, each leaving you something you can use.",
};

export default function OfferingEngagementPage() {
  return (
    <>
      <OfferingHero />
      <OfferingProblem />
      <OfferingPhases />
      <OfferingPortability />
      <OfferingPricing />
      <OfferingClose />
    </>
  );
}
