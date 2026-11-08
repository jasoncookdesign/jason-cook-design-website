import { book } from "@/lib/book";
import { publishedPosts } from "@/lib/posts";
import { caseStudies } from "@/lib/work";

/** Text for one page's share card (rendered by app/card/[...path]/route.tsx). */
export type SocialCard = { kicker: string; title: string; description: string };

/**
 * Cards for the fixed pages, keyed by path. Card text is short and stands alone in a feed, so it is its own copy
 * and not the page's meta description. `__tests__/share-cards.test.tsx` reads app/ and fails when a page route
 * has no entry here. The home page keeps the site's static card and is not listed.
 */
const STATIC: Record<string, SocialCard> = {
  "/about": { kicker: "About", title: "Enterprise-scale experience, sized for smaller businesses", description: "Strategy, design, research, and implementation in one practice, starting with a paid first step." },
  "/capabilities": { kicker: "Capabilities", title: "Architecture, specification, implementation, and handoff", description: "The range of work Jason Cook Design takes on." },
  "/contact": { kicker: "Contact", title: "Book a strategy call", description: "Free, 20 minutes, no commitment." },
  "/legal": { kicker: "Legal", title: "Privacy, accessibility, and terms", description: "Policies for Jason Cook Design." },
  "/meet": { kicker: "Meet", title: "Book time with Jason Cook", description: "Online, by phone, or in person." },
  "/work": { kicker: "Work", title: "Case studies", description: "Enterprise and institutional work across software, consumer platforms, and regulated industries." },
  "/writing": { kicker: "Writing", title: "Notes from the seam between design and engineering", description: "And a free book on technology and governance." },
  "/writing/longform": { kicker: "Book", title: book.title, description: book.subtitle },
  "/engagements": { kicker: "Engagements", title: "Two kinds of engagement", description: "Start from your situation: a new product or business line, or a business that has outgrown its systems." },
  "/engagements/offering": { kicker: "Offering Engagement", title: "A new product or business line", description: "Six phases from the decision to launch, bought one at a time." },
  "/engagements/operating": { kicker: "Operating Engagement", title: "A business that has outgrown its systems", description: "Six phases, each priced and decided on its own." },
  "/engagements/first-phase": { kicker: "Engagements", title: "The first phase", description: "What it asks of you, who it is for, how the credit works, and what the guarantee covers." },
  "/engagements/sample": { kicker: "Engagements", title: "A sample first-phase report", description: "A written report for an anonymized client, with the guarantee behind it." },
};

const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** The card for a path, or undefined when the path has no page (or a post whose date has not arrived). */
export function socialCard(path: string, now: Date = new Date()): SocialCard | undefined {
  if (STATIC[path]) return STATIC[path];
  const study = caseStudies.find((c) => `/work/${c.slug}` === path);
  if (study) return { kicker: "Work", title: study.title, description: study.subtitle };
  const post = publishedPosts(now).find((p) => `/writing/blog/${p.slug}` === path);
  if (post) return { kicker: `Writing · ${dateLabel(post.date)}`, title: post.title, description: post.excerpt };
  return undefined;
}

/** Every path that has a card as of `now`. A post is listed from its date. */
export function cardPaths(now: Date = new Date()): string[] {
  return [
    ...Object.keys(STATIC),
    ...caseStudies.map((c) => `/work/${c.slug}`),
    ...publishedPosts(now).map((p) => `/writing/blog/${p.slug}`),
  ];
}
