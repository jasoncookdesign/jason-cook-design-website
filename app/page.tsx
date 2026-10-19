import Hero from "@/components/home/Hero";
import EngagementFork from "@/components/home/EngagementFork";
import ProblemSection from "@/components/home/ProblemSection";
import DeliveryOptionsSection from "@/components/home/DeliveryOptionsSection";
import ProofSection from "@/components/home/ProofSection";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EngagementFork />
      <ProblemSection />
      <DeliveryOptionsSection />
      <ProofSection />
      <PricingSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
