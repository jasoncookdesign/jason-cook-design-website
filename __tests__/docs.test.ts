import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const GAP = "[GAP: Phase 0 price pending]";

describe("docs track the new routes and tokens (INV-08)", () => {
  it("README route table has a row for the chooser and for each type route", () => {
    const readme = read("README.md");
    expect(readme).toMatch(/^\| `\/engagements` \|/m);
    expect(readme).toMatch(/^\| `\/engagements\/operating` \|/m);
    expect(readme).toMatch(/^\| `\/engagements\/offering` \|/m);
  });

  it("README no longer lists the price-pending token, and does not say the Offering price is pending", () => {
    const readme = read("README.md");
    expect(readme).not.toContain(GAP);
    expect(readme).not.toMatch(/price pending/i);
    expect(readme).not.toMatch(/None should render\./);
  });

  it("cutover plan's placeholder check (pre-go step 2) no longer waits on the price-pending token", () => {
    const line = read("docs/cutover-plan.md")
      .split("\n")
      .find((l) => /^2\. Placeholder tokens/.test(l));
    expect(line).toBeDefined();
    expect(line).not.toContain(GAP);
  });

  it("token-candidates doc has a names section recording both chosen names and the alternatives not taken", () => {
    const doc = read("docs/content-token-candidates.md");
    const section = doc.split(/^## /m).find((s) => /^Engagement type names/i.test(s));
    expect(section).toBeDefined();
    for (const name of ["Operating Engagement", "Offering Engagement", "Product Engagement", "Systems Build"]) {
      expect(section).toContain(name);
    }
  });
});
