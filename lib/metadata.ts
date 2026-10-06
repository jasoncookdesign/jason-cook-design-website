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
