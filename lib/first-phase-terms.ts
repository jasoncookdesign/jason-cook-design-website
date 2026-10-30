/**
 * The public text of the first phase's credit, guarantee and fit. This is the one place the terms are written in
 * full. The terms page renders the long form, and every other page uses a short form that links to it by full path.
 */
export const TERMS_PATH = "/engagements/first-phase";

export const ANCHORS = { whatItAsks: "what-it-asks", fit: "fit", credit: "credit", guarantee: "guarantee" } as const;
export type Anchor = (typeof ANCHORS)[keyof typeof ANCHORS];

/** A link target that resolves from any page, never a bare fragment. */
export const hrefFor = (anchor: Anchor): string => `${TERMS_PATH}#${anchor}`;

export const LONG = {
  whatItAsks: {
    heading: "What the first phase asks of you",
    paragraphs: [
      "It runs about a week. It asks for two to three hours of your time, in a few conversations, plus whatever you can pull together about the problem.",
      "It ends in a written report with a recommendation. The recommendation may be that you shouldn't build. The report is yours to take to anyone.",
    ],
  },
  fit: {
    heading: "Who it is for",
    forYouIntro: "This is for you if:",
    forYou: [
      "You have a problem you can feel but can't yet name or measure",
      'You want an honest answer even when the answer is "don\'t build this"',
      "You can give me two to three hours",
    ],
    notForYouIntro: "This is not for you if:",
    notForYou: [
      "You already know exactly what you want built and you just need implementation (your money is better spent building in that case)",
      "You want me to pick a tool for you",
      "You can't spare two to three hours",
    ],
  },
  credit: {
    heading: "The credit",
    paragraphs: [
      "If you go on to the next phase, the $2,500 comes off its price in full. It is applied automatically on that phase's first invoice.",
      "The credit holds for as long as my quote for the next phase is valid: 45 days from the day I issue it. I can extend it once, by up to 30 days, if nothing about the scope has changed. There is one credit per first phase. It can't move to another project or another company, and it has no cash value.",
      "If you don't go on, the $2,500 pays for the first phase and the report. The credit is part of the price of the next phase and not a deposit.",
    ],
  },
  guarantee: {
    heading: "The guarantee",
    paragraphs: [
      "Before I start, I give you in writing a list of what the report will contain. The list is the same for everyone. Every item on it can be checked on the page: it's there or it isn't, and every conclusion points to the evidence behind it.",
      "If an item is missing from the report, tell me in writing within 15 business days of delivery, and name the item. I answer within 3 business days, either showing you where it is or fixing it. I make the fix within 10 business days. That is one round.",
      "If the item is still missing after that, I refund the $2,500 in full within 10 business days, and you keep the report.",
    ],
    exclusionsIntro: "What the guarantee doesn't cover:",
    exclusions: [
      "The conclusion itself (you may disagree with what the report recommends, including a recommendation not to build)",
      "Anything after the first phase",
      "Missing requested information",
    ],
  },
} as const;

/** What the written list of contents covers for every first phase. The sample report maps each to the part that meets it. */
export const DONE_CRITERIA: string[] = [
  "Your objective, in your terms",
  "A summary you can act on alone",
  "A recommendation with its reason",
  "Every finding linked to its evidence",
  "Remaining unknowns, with how they are handled",
  "A first move",
  "Refusal and ethical flags reported as checked",
];

export const SHORT = {
  credit: {
    text: "If you go on, the $2,500 is credited in full against the next phase.",
    label: "How the credit works",
    href: hrefFor(ANCHORS.credit),
  },
  guarantee: {
    text: "If the report misses anything on the written list we agree before I start, I fix it or refund the $2,500.",
    label: "How the guarantee works",
    href: hrefFor(ANCHORS.guarantee),
  },
  both: {
    text: "If you go on, the $2,500 is credited in full against the next phase. If the report misses anything on the written list we agree before I start, I fix it or refund the $2,500.",
    label: "The credit and the guarantee",
    href: hrefFor(ANCHORS.credit),
  },
  fit: {
    text: "It isn't for you if you already know exactly what you want built, want me to pick a tool, or can't spare two to three hours.",
    label: "Who it is for",
    href: hrefFor(ANCHORS.fit),
  },
} as const;
