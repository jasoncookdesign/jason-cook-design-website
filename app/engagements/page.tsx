// DRAFT — Jason to edit
import OfferingEngagementPage from "./offering/page";
import { withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: "Engagements | Jason Cook Design",
  description:
    "Two kinds of engagement, for a new product or business line and for a business that has outgrown its systems. Start from your situation.",
  openGraph: {
    title: "Engagements | Jason Cook Design",
    description:
      "Two kinds of engagement, for a new product or business line and for a business that has outgrown its systems. Start from your situation.",
  },
  twitter: {
    title: "Engagements | Jason Cook Design",
    description:
      "Two kinds of engagement, for a new product or business line and for a business that has outgrown its systems. Start from your situation.",
  },
  alternates: { canonical: "/engagements/offering" },
});

// The selector in the layout lists every type. This route shows the first one.
export default OfferingEngagementPage;
