// DRAFT — Jason to edit
import EngagementSelector from "@/components/engagements/EngagementSelector";

export default function EngagementsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EngagementSelector />
      {children}
    </>
  );
}
