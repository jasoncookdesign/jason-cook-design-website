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

  it("dims emphasis only in the hero headline, in the same ink2 as the engagements hero; other headlines stay ink", () => {
    const home = read("app/bp-home.css");
    expect(home).not.toMatch(/(^|\n)\.em\s*\{[^}]*color:/);
    expect(home).toMatch(/\.hero h1 \.em\s*\{[^}]*color:\s*var\(--ink2\)/);
    expect(read("app/bp-engagements.css")).toMatch(/\.eng-hero h1 span\s*\{[^}]*color:\s*var\(--ink2\)/);
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

describe("bar with the desktop links hidden", () => {
  it("pins the trailing controls (button, layers, menu) to the right corner by pushing the wordmark's free space, not by auto-margining the menu", () => {
    const g = read("app/globals.css");
    expect(g).toMatch(/@media \(max-width: 1199px\)\s*\{[^@]*\.bar > \.wordmark\s*\{\s*margin-right:\s*auto/);
    expect(g).toMatch(/@media \(max-width: 1199px\)\s*\{[^@]*\.bar \.menu\s*\{\s*margin-left:\s*0/);
  });
});

describe("bar just above the desktop breakpoint", () => {
  it("shows the docked sheet cue only where the full bar has room (1360px and up), and never wraps or shrinks the action", () => {
    const g = read("app/globals.css") + read("app/blueprint-motion.css");
    expect(g).toMatch(/\.bar\.docked > \.cue\s*\{\s*display:\s*none/);
    expect(g).toMatch(/@media \(min-width: 1360px\)\s*\{\s*\.bar\.docked > \.cue\s*\{\s*display:\s*inline/);
    expect(g).toMatch(/\.bar \.btn\.sm\s*\{[^}]*white-space:\s*nowrap[^}]*flex:\s*none/);
  });
});

describe("bar at the narrowest desktop widths", () => {
  it("tightens the link and bar gaps between 1200 and 1279px so the layers toggle stays inside the frame", () => {
    expect(read("app/globals.css")).toMatch(/@media \(min-width: 1200px\) and \(max-width: 1279px\)\s*\{[^@]*\.bar \.nav ul\s*\{\s*gap:\s*18px[^@]*\.bar\s*\{\s*gap:\s*20px/);
  });
});
