import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/work";
import { posts } from "@/lib/writing";

const SITE = "https://jasoncookdesign.com";

// /engagements is left out because its canonical is /engagements/offering.
// Fixed pages; case studies and posts come from their registries so a new entry is listed without a second edit.
const pages = ["", "/about", "/capabilities", "/contact", "/engagements/offering", "/engagements/operating", "/legal", "/work", "/writing", "/writing/longform"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => `${SITE}${p}`),
    ...caseStudies.map((cs) => `${SITE}/work/${cs.slug}`),
    ...posts.map((p) => `${SITE}/writing/blog/${p.slug}`),
  ].map((url) => ({ url }));
}
