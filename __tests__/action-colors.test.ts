/**
 * Action colors. One color per job: orange marks the decision, one clickable blue marks what you can click, and
 * the aqua hover-fill marks what you are touching. The primary button is ivory with a thick orange left border;
 * secondary and icon controls are outlined in the clickable blue. Hover fills any of them aqua with a navy label.
 * Selection is carried by shape (an inset ivory border on a raised surface), never by a color of its own.
 * The old pale blue and the old saturated link blue are retired.
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
const files = readdirSync(join(process.cwd(), "app")).filter((f) => f.endsWith(".css")).map((f) => `app/${f}`);
const css = files.map(read).join("\n");
const globals = read("app/globals.css");
const design = read("design/blueprint/DESIGN.md");

function rule(selector: string): string {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const all = [...css.matchAll(new RegExp(`(?:^|[},\\s])${esc}\\s*(?:,[^{}]*)?\\{([^}]*)\\}`, "gm"))].map((m) => m[1]);
  if (!all.length) throw new Error(`rule not found: ${selector}`);
  return all.join(";");
}
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("tokens", () => {
  it("has one clickable blue, and the link color is it", () => {
    expect(globals).toMatch(/--link:\s*#8FB2CC;/i);
    expect(globals).toMatch(/--accent:\s*var\(--link\);/);
  });

  it("retires the old pale blue and the old saturated link blue", () => {
    expect(css).not.toMatch(/C9D8E5/i);
    expect(css).not.toMatch(/5CB0FF/i);
    expect(globals).not.toMatch(/--btn-bg-hover|--band-btn-hover|--color-btn-bg-hover|--color-band-btn-hover/);
  });

  it("keeps the colors readable: the blue on the page, navy on the aqua, the orange edge against the page", () => {
    expect(contrast("#8FB2CC", "#0D2438")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#0D2438", "#58C4C6")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#E8723C", "#0D2438")).toBeGreaterThanOrEqual(3);
  });
});

describe("primary button", () => {
  it("is ivory with a thick orange left border", () => {
    const r = rule(".btn");
    expect(r).toMatch(/background:\s*var\(--ink\)/);
    expect(r).toMatch(/border-left:\s*8px solid var\(--signal\)/);
  });

  it("knocks out to the page's dark blue with a white label on hover and keeps its orange bar (the glow is in primary-glow.test)", () => {
    const r = rule(".btn:not(.secondary,.tertiary):is(:hover,:focus-visible)");
    expect(r).toMatch(/background:\s*var\(--btn-face-hover\)/);
    expect(r).toMatch(/border-left-color:\s*var\(--signal\)/);
    expect(r).toMatch(/color:\s*#fff/i);
  });
});

describe("secondary button", () => {
  it("is filled with the clickable blue and a field-colored label, with no orange bar", () => {
    const r = rule(".btn.secondary");
    expect(r).toMatch(/background:\s*var\(--link\)/);
    expect(r).toMatch(/color:\s*var\(--paper\)/);
    expect(r).toMatch(/border-left-width:\s*1\.5px/);
    expect(r).not.toMatch(/--signal/);
  });

  it("goes aqua on hover and takes an ivory border, so the change is unmistakable against the blue", () => {
    const r = rule(".btn.secondary:hover");
    expect(r).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(r).toMatch(/border-color:\s*var\(--ink\)/);
    expect(r).toMatch(/color:\s*var\(--paper\)/);
  });
});

describe("tertiary button", () => {
  it("is outlined in the clickable blue, with no fill and no orange bar", () => {
    const r = rule(".btn.tertiary");
    expect(r).toMatch(/background:\s*transparent/);
    expect(r).toMatch(/color:\s*var\(--link\)/);
    expect(r).toMatch(/border:\s*1\.5px solid var\(--link\)/);
    expect(r).toMatch(/border-left-width:\s*1\.5px/);
    expect(r).not.toMatch(/--signal/);
  });

  it("goes aqua on hover", () => {
    const r = rule(".btn.tertiary:hover");
    expect(r).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(r).toMatch(/color:\s*var\(--paper\)/);
  });

  it("is retired from the old ghost name", () => {
    expect(css).not.toMatch(/\.btn\.ghost/);
  });
});

describe("icon buttons", () => {
  it.each([".bar .lv", ".bar .menu-btn", ".loop-toggle", ".stb"])("%s is outlined in the clickable blue", (sel) => {
    const r = rule(sel);
    expect(r).toMatch(/color:\s*var\(--link\)/);
    expect(r).toMatch(/border(-color)?:[^;]*var\(--link\)/);
  });

  it.each([".bar .lv:hover", ".bar .menu-btn:hover", ".loop-toggle:hover", ".stb:hover"])("%s fills aqua with a navy glyph", (sel) => {
    const r = rule(sel);
    expect(r).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(r).toMatch(/color:\s*var\(--(paper|bg)\)/);
  });
});

describe("selected state", () => {
  const frame = /outline:\s*2px solid var\(--ink\);\s*outline-offset:\s*-2px/;

  it("is an inset ivory border on the raised surface, for the segmented control, the booking tabs and the layers toggle", () => {
    for (const sel of ['.seg > [aria-current="page"], .seg > [aria-current="true"]', '.cal-typebar button[aria-pressed="true"]', '.bar .lv[aria-pressed="true"]']) {
      const r = rule(sel);
      expect(r).toMatch(frame);
      expect(r).toMatch(/background:\s*var\(--paper2\)/);
      expect(r).not.toMatch(/var\(--accent\)|var\(--link\)|var\(--signal\)/);
    }
  });

  it("no longer fills the chosen option with a blue", () => {
    expect(css).not.toMatch(/\.seg > \[aria-current[^{]*\{[^}]*background:\s*var\(--accent\)/);
    expect(css).not.toMatch(/\.cal-typebar button\[aria-pressed="true"\]\s*\{[^}]*background:\s*var\(--accent\)/);
  });

  it("keeps the chosen option's text light: nothing recolors it to the field color", () => {
    const chosenOnly = css.replace(/[^{}]*:not\(\[aria-current\]\)[^{}]*\{[^}]*\}/g, "");
    expect(chosenOnly).not.toMatch(/aria-current[^{]*\.(sit|lbl)\s*\{[^}]*color:\s*var\(--(bg|paper)\)/);
  });

  it("fills an option aqua on hover only while choosing it would change something, with navy labels", () => {
    for (const sel of [".seg > *:not([aria-current]):hover", '.cal-typebar button:not([aria-pressed="true"]):hover']) {
      const r = rule(sel);
      expect(r).toMatch(/background:\s*var\(--hover-fill\)/);
      expect(r).toMatch(/color:\s*var\(--paper\)/);
    }
    expect(css).toMatch(/\.seg > \*:not\(\[aria-current\]\):hover \.lbl[^{]*\{[^}]*color:\s*var\(--paper\)/);
  });

  it("gives the chosen option no hover response and no pointer, since choosing it again does nothing", () => {
    expect(css).not.toMatch(/\.seg > \[aria-current[^{]*:hover[^{]*\{/);
    expect(css).not.toMatch(/\.cal-typebar button\[aria-pressed="true"\]:hover/);
    expect(rule('.seg > [aria-current="page"], .seg > [aria-current="true"]')).toMatch(/cursor:\s*default/);
    expect(rule('.cal-typebar button[aria-pressed="true"]')).toMatch(/cursor:\s*default/);
  });

  it("keeps the layers toggle responsive while pressed, since pressing it again turns the view off", () => {
    expect(rule('.bar .lv[aria-pressed="true"]:hover')).toMatch(/background:\s*var\(--hover-fill\)/);
  });
});

describe("design spec", () => {
  it("states the color rule", () => {
    expect(design).toMatch(/clickable blue/i);
    expect(design).toMatch(/orange left border/i);
    expect(design).toMatch(/inset/i);
  });
});

describe("secondary icon button", () => {
  it("is a 44px square with a centered arrow, and no orange bar", () => {
    const r = rule(".btn.icon");
    expect(r).toMatch(/width:\s*44px/);
    expect(r).toMatch(/min-height:\s*44px/);
    expect(r).toMatch(/justify-content:\s*center/);
    expect(r).toMatch(/padding:\s*0/);
  });
});
