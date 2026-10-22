/**
 * Primary button hover. Only the primary button (ivory with the orange left border) glows: on hover or keyboard
 * focus its face drops to the page's dark blue (a knockout), the label flips to white, the orange bar stays, and a soft conic halo in
 * light orange, white and light blue spins behind it. No other control takes the glow. The halo is a still frame
 * under reduced motion, hidden in forced-colors mode, and hidden while the button is pressed.
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const files = readdirSync(join(process.cwd(), "app")).filter((f) => f.endsWith(".css")).map((f) => `app/${f}`);
const css = files.map((f) => readFileSync(join(process.cwd(), f), "utf8")).join("\n");
const P = "\\.btn:not\\(\\.secondary, ?\\.tertiary\\)";

function block(re: RegExp): string {
  const m = css.match(re);
  if (!m) throw new Error(`rule not found: ${re}`);
  return m[1];
}

describe("primary glow", () => {
  it("registers the angle the halo spins on", () => {
    expect(css).toMatch(/@property\s+--angle\s*\{[^}]*syntax:\s*['"]<angle>['"]/);
  });

  it("takes its colors from three brand tokens", () => {
    expect(css).toMatch(/--glow-orange:\s*#FFB48A/i);
    expect(css).toMatch(/--glow-white:\s*#F4F8FC/i);
    expect(css).toMatch(/--glow-blue:\s*#9CCBFF/i);
  });

  it("is a conic gradient behind the button, soft-edged and kept close", () => {
    const r = block(new RegExp(`${P}::before\\s*\\{([^}]*)\\}`));
    expect(r).toMatch(/conic-gradient\(from var\(--angle\)[^)]*var\(--glow-orange\)[^)]*var\(--glow-white\)[^)]*var\(--glow-blue\)/);
    expect(r).toMatch(/z-index:\s*-1/);
    const blur = Number(r.match(/blur\((\d+)px\)/)![1]);
    const inset = Number(r.match(/inset:\s*-(\d+)px/)![1]);
    expect(blur).toBeLessThanOrEqual(8);
    expect(inset).toBeLessThanOrEqual(4);
    expect(r).toMatch(/animation:\s*btn-glow/);
  });

  it("appears on hover and keyboard focus, and not while the button is pressed", () => {
    expect(block(new RegExp(`${P}:is\\(:hover, ?:focus-visible\\)::before\\s*\\{([^}]*)\\}`))).toMatch(/opacity:\s*1/);
    expect(block(new RegExp(`${P}:active::before\\s*\\{([^}]*)\\}`))).toMatch(/opacity:\s*0/);
  });

  it("knocks the face out to the page's dark blue, with a white label, and keeps the orange bar", () => {
    expect(css).toMatch(/--btn-face-hover:\s*var\(--bg\)/);
    const r = block(new RegExp(`${P}:is\\(:hover, ?:focus-visible\\)\\s*\\{([^}]*)\\}`));
    expect(r).toMatch(/background:\s*var\(--btn-face-hover\)/);
    expect(r).toMatch(/color:\s*#fff/i);
    expect(r).toMatch(/border-left-color:\s*var\(--signal\)/);
    expect(r).toMatch(/border-top-color:\s*transparent/);
  });

  it("is not used on any other control", () => {
    const withoutNots = css.replace(/:not\([^)]*\)/g, ":not()");
    expect(withoutNots).not.toMatch(/\.(secondary|tertiary)[^{]*::before\s*\{[^}]*conic-gradient/);
    expect(css.match(/conic-gradient\(from var\(--angle\)/g) ?? []).toHaveLength(1);
    expect(css).not.toMatch(/(\.lv|\.menu-btn|\.loop-toggle|\.stb|\.seg|\.cal-typebar)[^{]*::before\s*\{[^}]*btn-glow/);
  });

  it("holds still under reduced motion and is hidden in forced-colors mode", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce\)\s*\{[^}]*\.btn:not\([^)]*\)::before\s*\{[^}]*animation:\s*none/);
    expect(css).toMatch(/forced-colors:\s*active\)\s*\{[^}]*\.btn:not\([^)]*\)::before\s*\{[^}]*display:\s*none/);
  });
});
