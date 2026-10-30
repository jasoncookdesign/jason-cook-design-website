// DRAFT — Jason to edit
import { SAMPLE_PATH } from "@/lib/first-phase-terms";

/**
 * Phase 0 is the same process for both engagement types. Only the focus of the examination differs, so the process
 * text is written once and each type adds its own focus sentence.
 */
export const PHASE_ZERO = {
  key: "00",
  process:
    "It takes about a week and two to three hours of your time, in a few conversations. It ends in a written report with a recommendation, and every finding links to its evidence. The $2,500 is credited in full if you go on to the next phase.",
  focus: {
    offering: "The examination covers the decision itself: whether the product or business line is worth building, and what stands in the way.",
    operating: "The examination covers how the business runs today: where the time and money go, and which problem to fix first.",
  },
  sample: { href: SAMPLE_PATH, label: "See a sample of the report" },
} as const;
