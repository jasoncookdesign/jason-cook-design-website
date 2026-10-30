// Skeleton: the public text of the first phase's credit, guarantee and fit. Behavior is specified by __tests__/first-phase-terms.test.ts.
export const TERMS_PATH = "/engagements/first-phase";
export const ANCHORS = { whatItAsks: "what-it-asks", fit: "fit", credit: "credit", guarantee: "guarantee" } as const;
export const hrefFor = (_anchor: string): string => "";
export const LONG = {
  whatItAsks: { heading: "", paragraphs: [] as string[] },
  fit: { heading: "", forYouIntro: "", forYou: [] as string[], notForYouIntro: "", notForYou: [] as string[] },
  credit: { heading: "", paragraphs: [] as string[] },
  guarantee: { heading: "", paragraphs: [] as string[], exclusionsIntro: "", exclusions: [] as string[] },
};
export const SHORT = {
  credit: { text: "", label: "", href: "" },
  guarantee: { text: "", label: "", href: "" },
  both: { text: "", label: "", href: "" },
  fit: { text: "", label: "", href: "" },
};
export const DONE_CRITERIA: string[] = [];
