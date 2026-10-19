// DRAFT — Jason to edit
export interface EngagementType {
  slug: string;
  name: string;
  /** The visitor's situation, phrased as the card heading. */
  situation: string;
  /** One sentence on who the type fits. */
  fit: string;
  /** One-line summary of the arc. */
  arcSummary: string;
}

export const engagementTypes: EngagementType[] = [
  {
    slug: "offering",
    name: "Offering Engagement",
    situation: "I'm building a new product or business line.",
    fit: "An existing business or a new venture with a new product or service line to assess and, if it holds up, launch.",
    arcSummary:
      "Assess the decision, define the model and product, design the technology, build, launch, and stay available if you want that.",
  },
  {
    slug: "operating",
    name: "Operating Engagement",
    situation: "My business has outgrown the systems it runs on.",
    fit: "A business whose people, process, and software no longer fit the work.",
    arcSummary:
      "Diagnose, architect, specify, build, hand over, and stay available if you want that.",
  },
];
