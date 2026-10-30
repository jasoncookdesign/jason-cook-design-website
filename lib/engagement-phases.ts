// DRAFT — Jason to edit
import { PHASE_ZERO } from "@/lib/phase-zero";

/** The six phases, named once. Both engagement types use these names; each type supplies its own content for them. */
export const PHASE_TITLES = ["Assess it", "Shape it", "Specify it", "Build it", "Deliver it", "Stay available"] as const;

export interface PhaseContent {
  /** What happens in the phase, in plain paragraphs. */
  paragraphs: string[];
  /** The artifact you hold when the phase is done. */
  gets: string;
  /** The decision the phase ends in. */
  closes: string;
  /** When the phase is scoped and priced. */
  scoped: string;
  sample?: boolean;
  optional?: boolean;
}

export type EngagementKind = "offering" | "operating";

/** The optional last phase is the same for both types: the pricing for it does not differ. */
const STAY_AVAILABLE: PhaseContent = {
  paragraphs: [
    "The five phases above are meant to end with your team running what was built without me. This one is built to be declined.",
    "If you want me available after that, it's monthly, and it covers what you actually want me for: review, coaching, or capacity held open.",
    "It carries a three-month minimum. You get a quarter where I don't leave for a bigger opportunity, and I get a quarter of steady work.",
    "If you'd rather not commit to that, the other route stays open: another bounded piece of work, scoped and priced when it comes up.",
  ],
  gets: "Defined availability, on terms we agree in advance.",
  closes: "Nothing further. You can stop here, and there is no obligation to continue.",
  scoped: "After delivery, if you want it.",
  optional: true,
};

export const PHASES: Record<EngagementKind, PhaseContent[]> = {
  offering: [
    {
      paragraphs: [PHASE_ZERO.focus.offering, PHASE_ZERO.process],
      gets: "A written verdict on whether to build, with the proof artifacts behind it.",
      closes: "Your decision: go, change course, or stop.",
      scoped: "Before you start, at a fixed price.",
      sample: true,
    },
    {
      paragraphs: [
        "The idea becomes a tested business model and a product definition. What customers will pay for, and what it takes to deliver, get written down before anyone designs anything.",
      ],
      gets: "A tested business model and a product definition you could hand to any team.",
      closes: "Your decision to commit to design, or to stop with the definition in hand.",
      scoped: "After the first phase closes.",
    },
    {
      paragraphs: [
        "The technology gets decided item by item: the architecture, the data, the integrations, and the plan to build it. The build stops being an unknown.",
      ],
      gets: "An architecture and a build plan that anyone capable can build from.",
      closes: "Your decision to build and who builds it, or to stop with the plan in hand.",
      scoped: "After the definition.",
    },
    {
      paragraphs: [
        "The product gets built, by me or directed by me, depending on the client. What's in it comes from the plan you already approved.",
      ],
      gets: "A working product.",
      closes: "Your decision to launch, or to stop with the working product.",
      scoped: "After the build plan.",
    },
    {
      paragraphs: [
        "The product goes live with the brand, the positioning, and the go-to-market plan it needs, so it reaches the people it is for.",
      ],
      gets: "Brand, positioning, and a go-to-market plan, with the product live.",
      closes: "Your decision to scale, hold, or stop.",
      scoped: "After the product is built.",
    },
    STAY_AVAILABLE,
  ],
  operating: [
    {
      paragraphs: [PHASE_ZERO.focus.operating, PHASE_ZERO.process],
      gets: "A written diagnosis of the real problem, what to address first, and what addressing it takes. It may say you shouldn't build.",
      closes: "Your decision: go, change course, or stop.",
      scoped: "Before you start, at a fixed price.",
      sample: true,
    },
    {
      paragraphs: [
        "You get one recommendation. It says what to do, why it fits your business, what got rejected, and which tradeoffs you're taking.",
        "You also come out with cost ranges for building it and for running it afterward, and the things that move those numbers.",
      ],
      gets: "An architecture: the systems the business should run on, and the order to get there in.",
      closes: "Your decision to commit to a specification, or to stop with the architecture in hand.",
      scoped: "After the first phase closes.",
    },
    {
      paragraphs: [
        "The build stops being an unknown. What it takes gets decided item by item, and that's what the build gets priced from.",
        "This is where deployment, data, access, integrations, and testing get decided, before anyone starts building.",
      ],
      gets: "A technical specification: the build, described closely enough to hand to whoever builds it.",
      closes: "Your decision to build and who builds it, or to stop with the specification in hand.",
      scoped: "After the architecture.",
    },
    {
      paragraphs: [
        "The manual step goes away. What replaces it runs in your environment, with your data moved over and the connections in place.",
        "This is the phase that varies most. What's in it comes from the specification you already approved.",
      ],
      gets: "The system itself: built, configured, tested, migrated, delivered.",
      closes: "Your decision to take it live, or to stop with the working system.",
      scoped: "After the specification.",
    },
    {
      paragraphs: [
        "Your team runs it while I'm still on the engagement, so the questions get answered while I'm still the one answering them.",
        "What they learn is the operating part: reading its health, approving changes, adding workflows, and knowing when something needs escalating.",
      ],
      gets: "A handoff package. Your team being able to run it is the deliverable, not a bonus.",
      closes: "Your decision to run it yourselves, or to keep me on.",
      scoped: "After the build is planned.",
    },
    STAY_AVAILABLE,
  ],
};
