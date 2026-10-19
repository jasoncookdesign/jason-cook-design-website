import { readFileSync } from "fs";
import { join } from "path";

// The signal orange (#E8723C, from the approved lockups) is a fine accent, never a fill: the primary button and
// the hero mark stay monochrome. It appears only in small places: a marker on the hero eyebrow, the underline
// on nav hover, the keyboard focus ring, and the pressed layers icon.
const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
const css = read("app/globals.css");
const all = ["app/globals.css", "app/blueprint.css", "app/blueprint-patterns.css", "app/bp-drawing.css", "app/bp-home.css"].map(read).join("\n");
const tok = (n: string) => css.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`))?.[1] ?? "";
const lum = (h: string) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe("signal accent", () => {
  it("defines one signal token and drops the warm and cool pair", () => {
    expect(tok("signal").toUpperCase()).toBe("#E8723C");
    expect(css).not.toMatch(/--warm:|--cool:/);
  });

  it("is visible against the sheet where it carries meaning (focus ring, markers): 3:1", () => {
    expect(ratio(tok("signal"), tok("bg"))).toBeGreaterThanOrEqual(3);
  });

  it("keeps the primary button monochrome and the hero mark in ink", () => {
    expect(all).toMatch(/\.btn\s*\{[^}]*background:\s*var\(--ink\)/);
    expect(all).not.toMatch(/\.btn\s*\{[^}]*background:\s*var\(--signal\)/);
    expect(read("app/bp-drawing.css")).not.toMatch(/\.mark rect/);
  });

  it("uses the signal in small places only", () => {
    expect(all).toMatch(/\.hero \.eyebrow::before\s*\{[^}]*background:\s*var\(--signal\)/);
    expect(all).toMatch(/\.nav a:hover\s*\{[^}]*text-decoration-color:\s*var\(--signal\)/);
    expect(all).toMatch(/:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--signal\)/);
    expect(all).toMatch(/\.bar \.lv\[aria-pressed="true"\]\s*\{[^}]*color:\s*var\(--signal\)/);
  });
});
