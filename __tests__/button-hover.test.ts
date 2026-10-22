/**
 * Button hover. A solid button stays solid on hover: the primary button's ivory fill moves to the aqua
 * hover fill (token --hover-fill), keeping the field-colored label, instead of going hollow (field fill, ivory
 * border). Other solid-on-hover controls take the same fill. Low-emphasis rows, cells and tabs keep their raised
 * surface on hover, since their light labels would not survive a light fill.
 */
import { readFileSync } from "fs";
import { join } from "path";

const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
const globals = read("app/globals.css");
const blueprint = read("app/blueprint.css");
const patterns = read("app/blueprint-patterns.css");
const content = read("app/bp-content.css");
const design = read("design/blueprint/DESIGN.md");

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("hover-fill token", () => {
  it("is defined once, as the aqua", () => {
    expect(globals).toMatch(/--hover-fill:\s*#58C4C6;/i);
  });

  it("keeps the field-colored label readable on it (WCAG AA for text)", () => {
    expect(contrast("#0D2438", "#58C4C6")).toBeGreaterThanOrEqual(4.5);
  });

  it("is documented in the design spec", () => {
    expect(design).toMatch(/hover-fill:\s*"#58C4C6"/i);
    expect(design).toMatch(/hover/i);
  });
});

describe("solid buttons stay solid on hover", () => {
  it("fills the primary button with the hover fill and keeps its label field-colored", () => {
    const m = blueprint.match(/\.btn:hover\s*\{([^}]*)\}/);
    expect(m).not.toBeNull();
    expect(m![1]).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/border-color:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/color:\s*var\(--paper\)/);
  });

  it("no longer turns the primary button hollow (field fill with the ivory label)", () => {
    const m = blueprint.match(/\.btn:hover\s*\{([^}]*)\}/);
    expect(m![1]).not.toMatch(/background:\s*var\(--paper\)/);
  });

  it("fills the ghost button on hover the same way", () => {
    const m = patterns.match(/\.btn\.ghost:hover\s*\{([^}]*)\}/);
    expect(m).not.toBeNull();
    expect(m![1]).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/border-color:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/color:\s*var\(--paper\)/);
  });

  it("fills the media pause/play button the same way", () => {
    const m = content.match(/\.loop-toggle:hover\s*\{([^}]*)\}/);
    expect(m).not.toBeNull();
    expect(m![1]).toMatch(/background:\s*var\(--hover-fill\)/);
  });

  it("leaves rows, cells and tabs on their raised surface, where a light fill would bury the light label", () => {
    expect(patterns).toMatch(/a\.row:hover\s*\{\s*background:\s*var\(--paper2\)/);
    expect(patterns).toMatch(/a\.cell:hover\s*\{\s*background:\s*var\(--paper2\)/);
  });
});
