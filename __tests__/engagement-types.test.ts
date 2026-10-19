import { engagementTypes } from "@/lib/engagement-types";
import { hasFeeFigure } from "./helpers/prices";

describe("engagement-type registry", () => {
  it("holds exactly the two types, in order, with their public names", () => {
    expect(engagementTypes.map((t) => t.slug)).toEqual(["offering", "operating"]);
    expect(engagementTypes.map((t) => t.name)).toEqual(["Offering Engagement", "Operating Engagement"]);
  });

  it("has a real sentence in every descriptive field", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) {
      expect(t.situation.trim().split(/\s+/).length).toBeGreaterThanOrEqual(5);
    }
  });

  it("uses URL-safe slugs", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) expect(t.slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it("shows no fee figure on either entry, in any form", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) {
      expect(hasFeeFigure([t.name, t.situation].join(" "))).toBe(false);
    }
  });

  it("keeps the situation different between the two types", () => {
    expect(engagementTypes).toHaveLength(2);
    expect(engagementTypes[0].situation).not.toBe(engagementTypes[1].situation);
  });
});
