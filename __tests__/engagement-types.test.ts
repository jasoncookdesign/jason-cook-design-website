import { engagementTypes } from "@/lib/engagement-types";
import { hasFeeFigure } from "./helpers/prices";

describe("engagement-type registry", () => {
  it("holds exactly the two types, in order, with their public names", () => {
    expect(engagementTypes.map((t) => t.slug)).toEqual(["operating", "offering"]);
    expect(engagementTypes.map((t) => t.name)).toEqual(["Operating Engagement", "Offering Engagement"]);
  });

  it("has a real sentence in every descriptive field", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) {
      for (const key of ["situation", "fit", "arcSummary"] as const) {
        expect(t[key].trim().split(/\s+/).length).toBeGreaterThanOrEqual(5);
      }
    }
  });

  it("uses URL-safe slugs", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) expect(t.slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it("shows no fee figure on either entry, in any form", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) {
      expect(hasFeeFigure([t.name, t.situation, t.fit, t.arcSummary].join(" "))).toBe(false);
    }
  });

  it("keeps situation, fit, and arc summary different between the two types", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const key of ["situation", "fit", "arcSummary"] as const) {
      expect(engagementTypes[0][key]).not.toBe(engagementTypes[1][key]);
    }
  });
});
