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

const DESCRIPTION_MAX = 155;

/** Meta description from running text: unchanged within 155 characters, otherwise cut at a word boundary with an ellipsis. */
export function pageDescription(text: string): string {
  const t = text.trim();
  if (t.length <= DESCRIPTION_MAX) return t;
  const cut = t.slice(0, DESCRIPTION_MAX - 1);
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > 0 ? cut.slice(0, boundary) : cut).replace(/[\s,;:.\-—]+$/, "")}…`;
}

const CARD = { width: 1200, height: 630 };

/** The home page keeps the site's static card; every other page has its own, rendered by app/card/[...path]/route.tsx. */
export function cardImage(path: string, title: string) {
  const url = path === "/" ? "/opengraph-image.png" : `/card${path}`;
  return {
    url,
    ...CARD,
    alt: path === "/" ? SOCIAL_ALT : `Share card for "${title}", Jason Cook Design.`,
  };
}

const SOCIAL_ALT = 'Jason Cook Design: "Get a working system that solves the problem you actually have." The JCD mark on a blueprint sheet.';

type PageMeta = {
  title: string;
  description: string;
  openGraph?: Record<string, unknown>;
  alternates?: { canonical?: string };
};

/**
 * Gives a page its own share card. A page that sets its own openGraph replaces the root layout's, so each page
 * passes its metadata and its path through here. The result carries og:url and the canonical (the same URL: the
 * page's own canonical if it names one, else its path), the page's title and description for OG and the
 * Twitter-style card, and an image of its own. Paths resolve against metadataBase in the root layout.
 */
export function withSocial<T extends PageMeta>(meta: T, path: string) {
  const canonical = meta.alternates?.canonical ?? path;
  const image = cardImage(path, meta.title);
  return {
    ...meta,
    alternates: { ...meta.alternates, canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: meta.title,
      description: meta.description,
      ...meta.openGraph,
      url: canonical,
      images: [image],
    },
    twitter: { card: "summary_large_image" as const, title: meta.title, description: meta.description, images: [image.url] },
  };
}
