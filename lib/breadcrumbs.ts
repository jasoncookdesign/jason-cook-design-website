import { engagementTypes } from "@/lib/engagement-types";
import { caseStudies } from "@/lib/work";

export interface Crumb {
  label: string;
  href: string;
}

export const HOME: Crumb = { label: "Home", href: "/" };
const ENGAGEMENTS: Crumb = { label: "Engagements", href: "/engagements" };
const WORK: Crumb = { label: "Work", href: "/work" };
export const WRITING: Crumb = { label: "Writing", href: "/writing" };

/**
 * Pages with a fixed place in the site. The engagement types, the first phase, and the sample are siblings under
 * Engagements: the first phase belongs to neither type.
 */
const STATIC: Record<string, Crumb[]> = {
  "/engagements": [ENGAGEMENTS],
  ...Object.fromEntries(engagementTypes.map((t) => [`/engagements/${t.slug}`, [ENGAGEMENTS, { label: t.name, href: `/engagements/${t.slug}` }]])),
  "/engagements/first-phase": [ENGAGEMENTS, { label: "The first phase", href: "/engagements/first-phase" }],
  "/engagements/sample": [ENGAGEMENTS, { label: "Sample report", href: "/engagements/sample" }],
  "/work": [WORK],
  "/writing": [WRITING],
  "/writing/longform": [WRITING, { label: "Longform", href: "/writing/longform" }],
  "/about": [{ label: "About", href: "/about" }],
  "/capabilities": [{ label: "Capabilities", href: "/capabilities" }],
  "/contact": [{ label: "Contact", href: "/contact" }],
  "/legal": [{ label: "Legal", href: "/legal" }],
  "/meet": [{ label: "Meet", href: "/meet" }],
};

/** The trail from Home to the page, or null for the home page, for routes the site does not have, and for blog posts (the post page's layout builds those). */
export function trailFor(pathname: string | null): Crumb[] | null {
  if (!pathname) return null;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (path === "/") return null;

  const fixed = STATIC[path];
  if (fixed) return [HOME, ...fixed];

  const study = path.startsWith("/work/") && caseStudies.find((s) => `/work/${s.slug}` === path);
  if (study) return [HOME, WORK, { label: study.client, href: path }];

  // A post's crumb is built by app/writing/blog/[slug]/layout.tsx from the post itself, so this client-side
  // lookup never holds post titles (and cannot show one before its date).

  return null;
}
