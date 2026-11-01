import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/work";
import { publishedPosts } from "@/lib/posts";

const SITE = "https://jasoncookdesign.com";

// /engagements is left out because its canonical is /engagements/offering.
// Fixed pages; case studies and posts come from their registries so a new entry is listed without a second edit.
const pages = ["", "/about", "/capabilities", "/contact", "/engagements/offering", "/engagements/operating", "/engagements/first-phase", "/engagements/sample", "/legal", "/work", "/writing", "/writing/longform"];

// Posts appear once their date arrives; the sitemap is regenerated hourly.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => `${SITE}${p}`),
    ...caseStudies.map((cs) => `${SITE}/work/${cs.slug}`),
    ...publishedPosts().map((p) => `${SITE}/writing/blog/${p.slug}`),
  ].map((url) => ({ url }));
}
