// DRAFT — Jason to edit
export interface EngagementType {
  slug: string;
  name: string;
  /** The visitor's situation, phrased as the card heading. */
  situation: string;
  /** What the row's button says: where the visitor goes next. */
  cta: string;
}

export const engagementTypes: EngagementType[] = [
  {
    slug: "offering",
    name: "Offering Engagement",
    situation: "I'm building a new product or business line.",
    cta: "See the build path",
  },
  {
    slug: "operating",
    name: "Operating Engagement",
    situation: "My business has outgrown the systems it runs on.",
    cta: "See the fix path",
  },
];
