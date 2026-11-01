/**
 * Blog post types and the publishing rule. Each post is one file in data/posts/<slug>.json, loaded on the
 * server by lib/posts.ts. This module stays free of the file system so client components can import it.
 */

export type ContentBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "blockquote"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "img"; src: string; alt: string; credit?: string }
  | { type: "footnotes"; items: Array<{ ref: string; html: string }> };

export interface Post {
  slug: string;
  title: string;
  /** Optional shorter title for the browser tab and search results, when the full title runs long. */
  shortTitle?: string;
  date: string;
  tags: string[];
  excerpt: string;
  /** A phrase inside the excerpt that the post page links to `href`. */
  excerptLink?: { text: string; href: string };
  coverImage?: string;
  /** "figures-right" sets each figure beside the text before it from 1200px, as the case studies do. Default: one column. */
  layout?: "figures-right";
  content: ContentBlock[];
}

/** Blog posts live under /writing/blog; longform works (the book) live under /writing/longform. */
export const postHref = (slug: string) => `/writing/blog/${slug}`;

/** The calendar date (YYYY-MM-DD) right now in Central time, the zone post dates are written in. */
export const todayInChicago = (now: Date): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);

/** A post is public from its date onward. Merging a post to main does not publish it; its date does. */
export const isPublished = (post: { date: string }, now: Date): boolean => post.date <= todayInChicago(now);
