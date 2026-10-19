const SITE_NAME = "Jason Cook Design";
const TITLE_MAX = 60;

/**
 * Document title for a content page, kept within TITLE_MAX characters.
 * Prefers "<title> | Jason Cook Design"; drops the suffix when only the title fits;
 * otherwise cuts the title at the last word boundary that fits and adds an ellipsis.
 */
export function pageTitle(title: string): string {
  const suffixed = `${title} | ${SITE_NAME}`;
  if (suffixed.length <= TITLE_MAX) return suffixed;
  if (title.length <= TITLE_MAX) return title;
  const cut = title.slice(0, TITLE_MAX); // room for the ellipsis comes from dropping the partial word
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > 0 ? cut.slice(0, boundary) : cut.slice(0, TITLE_MAX - 1)).trimEnd()}…`;
}

/** The share card, served from app/opengraph-image.png. Absolute URLs come from metadataBase in the root layout. */
export const SOCIAL_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: 'Jason Cook Design: "Get a working system that solves the problem you actually have." The JCD mark on a blueprint sheet.',
};

type PageMeta = { title: string; description: string; openGraph?: Record<string, unknown> };

/**
 * Adds the share card to a page's metadata. A page that sets its own openGraph replaces the root layout's, which
 * would drop the image, so each page passes its metadata through here: OG gets the site name, the image, and the
 * page's own title and description, and the Twitter-style card matches.
 */
export function withSocial<T extends PageMeta>(meta: T) {
  return {
    ...meta,
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", ...meta.openGraph, images: [SOCIAL_IMAGE] },
    twitter: { card: "summary_large_image" as const, title: meta.title, description: meta.description, images: [SOCIAL_IMAGE.url] },
  };
}
