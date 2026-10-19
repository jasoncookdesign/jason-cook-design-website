// DRAFT — Jason to edit
export interface EngagementType {
  slug: string;
  name: string;
  /** The visitor's situation, phrased as the card heading. */
  situation: string;
}

export const engagementTypes: EngagementType[] = [
  {
    slug: "offering",
    name: "Offering Engagement",
    situation: "I'm building a new product or business line.",
  },
  {
    slug: "operating",
    name: "Operating Engagement",
    situation: "My business has outgrown the systems it runs on.",
  },
];
