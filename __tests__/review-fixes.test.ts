import { readFileSync } from "fs";
import { join } from "path";

// Defects found by the fresh-context fidelity review of the port against the concept. Each assertion is
// the CSS rule that fixes one; the visual result was checked in a browser.
const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
const all = ["app/globals.css", "app/blueprint.css", "app/blueprint-patterns.css", "app/bp-home.css", "app/bp-engagements.css", "app/bp-content.css"].map(read).join("\n");

describe("fidelity review fixes", () => {
  it("never stacks a section's ink rule on its first child's own top rule", () => {
    expect(all).toMatch(/main section > :first-child:is\([^)]*\.intro[^)]*\.logos[^)]*\)\s*\{\s*border-top:\s*0/);
    expect(all).toMatch(/\.foot-sheet > \.cells:first-child\s*\{\s*border-top:\s*0/);
    expect(all).toMatch(/\.pl > \.sp:last-child\s*\{\s*border-bottom:\s*0/);
  });

  it("keeps display headlines in ink: no dimmed emphasis span", () => {
    expect(read("app/bp-home.css")).not.toMatch(/\.em\s*\{[^}]*color:\s*var\(--ink2\)/);
  });

  it("left-aligns the home close sheet on the grid", () => {
    const m = read("app/bp-home.css").match(/\.close\s*\{[^}]*\}/)![0];
    expect(m).not.toMatch(/align-items:\s*center|text-align:\s*center/);
  });

  it("fits the bar on a phone: a tighter wordmark and a menu CTA with no side margin", () => {
    const g = read("app/globals.css");
    expect(g).toMatch(/@media \(max-width: 899px\)\s*\{[^@]*\.bar \.wordmark\s*\{[^}]*letter-spacing:\s*0\.0[0-6]/);
    expect(g).toMatch(/\.bar \.menu nav \.menu-cta\s*\{[^}]*margin:\s*12px 0/);
  });

  it("makes the wordmark link and footer links 44px targets", () => {
    const g = read("app/globals.css");
    expect(g).toMatch(/\.bar \.wordmark\s*\{[^}]*min-height:\s*44px/);
    expect(g).toMatch(/\.foot-sheet \.cell a\s*\{[^}]*min-height:\s*44px/);
  });
});
