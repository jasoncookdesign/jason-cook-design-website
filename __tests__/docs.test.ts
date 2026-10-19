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

  it("README's token list carries the price-pending token with its reason, and no longer says none should render", () => {
    const readme = read("README.md");
    expect(readme).toMatch(/^- `\[GAP: Phase 0 price pending\]`:.*(by design|until).*$/m);
    expect(readme).not.toMatch(/None should render\./);
  });

  it("cutover plan's placeholder check (pre-go step 2) lists the price-pending token", () => {
    const line = read("docs/cutover-plan.md")
      .split("\n")
      .find((l) => /^2\. Placeholder tokens/.test(l));
    expect(line).toBeDefined();
    expect(line).toContain(GAP);
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
