import { readFileSync } from "fs";
import { join } from "path";

// Secondary colours, used sparingly to direct the eye: the signal orange on the primary action, and the warm
// over cool pair on the hero mark. Palette from the approved lockups (design/logo/final).
const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
const all = ["app/globals.css", "app/blueprint.css", "app/blueprint-patterns.css", "app/bp-drawing.css", "app/bp-home.css"].map((f) => readFileSync(join(process.cwd(), f), "utf8")).join("\n");
const tok = (n: string) => css.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`))?.[1] ?? "";
const lum = (h: string) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe("secondary colours", () => {
  it("defines signal, warm, and cool tokens from the approved lockups", () => {
    expect(tok("signal").toUpperCase()).toBe("#E8723C");
    expect(tok("warm").toUpperCase()).toBe("#FFB48A");
    expect(tok("cool").toUpperCase()).toBe("#5E9BD6");
  });

  it("keeps navy text on the signal fill readable (4.5:1) and the pair visible on the sheet (3:1)", () => {
    expect(ratio(tok("bg"), tok("signal"))).toBeGreaterThanOrEqual(4.5);
    expect(ratio(tok("warm"), tok("bg"))).toBeGreaterThanOrEqual(3);
    expect(ratio(tok("cool"), tok("bg"))).toBeGreaterThanOrEqual(3);
  });

  it("fills the primary button with the signal, and inverts it on hover", () => {
    expect(all).toMatch(/\.btn\s*\{[^}]*background:\s*var\(--signal\)[^}]*color:\s*var\(--bg\)/);
    expect(all).toMatch(/\.btn:hover\s*\{[^}]*background:\s*var\(--bg\)[^}]*color:\s*var\(--signal\)/);
    expect(all).toMatch(/\.btn\.ghost[^{]*\{[^}]*background:\s*transparent/);
  });

  it("two-tones the hero mark: warm above the stripe, cool below", () => {
    const d = readFileSync(join(process.cwd(), "app/bp-drawing.css"), "utf8");
    expect(d).toMatch(/\.drawing \.mark rect:first-child\s*\{\s*fill:\s*var\(--warm\)/);
    expect(d).toMatch(/\.drawing \.mark rect:last-child\s*\{\s*fill:\s*var\(--cool\)/);
  });
});
