import { engagementTypes } from "@/lib/engagement-types";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

/** Engagements opens on the offering page. The first phase sits beside the two types, not under either. */
const ENGAGEMENT_CHILDREN = [
  ...engagementTypes.map((t) => ({ label: t.name, href: `/engagements/${t.slug}` })),
  { label: "The first phase", href: "/engagements/first-phase" },
];

/** The site's menu, read by the header, the mobile menu, and the footer. */
export const SITE_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Engagements", href: ENGAGEMENT_CHILDREN[0].href, children: ENGAGEMENT_CHILDREN },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

/** The client portal, a separate site. Linked after About in the header bar and the mobile menu, and in the footer. */
export const CLIENT_LOGIN = { label: "Client login", href: "https://clients.jasoncookdesign.com" } as const;
