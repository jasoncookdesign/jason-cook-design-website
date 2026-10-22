import fs from "fs";
import path from "path";

// Interactivity affordance in the content area: things a visitor can tap or click look that way at rest, in one
// colour (--link) that means "act here". The nav bar and footer are conventional and stay as they are. Orange
// stays reserved for the decision point; the steel-blue --accent stays the selected state.
const read = (f: string) => fs.readFileSync(path.join(process.cwd(), "app", f), "utf8");
const all = ["blueprint.css", "blueprint-patterns.css", "blueprint-motion.css", "bp-content.css", "bp-home.css", "bp-engagements.css"]
  .map(read)
  .join("\n");
// Every rule for the selector, merged: a selector can be styled in more than one sheet.
const rule = (selector: string): string => {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const found = [...all.matchAll(new RegExp(`(?:^|\\})\\s*${esc}\\s*\\{([^}]*)\\}`, "gm"))].map((m) => m[1]);
  if (!found.length) throw new Error(`rule not found: ${selector}`);
  return found.join(" ");
};

describe("interactive things show it at rest", () => {
  it("row buttons are secondary buttons: solid clickable blue with a field-colored label at rest", () => {
    const r = rule(".btn.secondary");
    expect(r).toMatch(/background:\s*var\(--link\)/);
    expect(r).toMatch(/color:\s*var\(--paper\)/);
  });

  it("row buttons fill aqua with an ivory border when the row is hovered or focused", () => {
    const r = rule("a.row:hover .btn.secondary, a.row:focus-visible .btn.secondary");
    expect(r).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(r).toMatch(/border-color:\s*var\(--ink\)/);
  });

  it("the old arrow squares are gone from the stylesheet", () => {
    expect(all).not.toMatch(/\.row \.go|a\.row:hover \.go/);
  });

  it("FAQ plus and minus marks turn the hover color when their row is hovered or focused", () => {
    const r = rule(".faq-trigger:hover .mark::before, .faq-trigger:hover .mark::after, .faq-trigger:focus-visible .mark::before, .faq-trigger:focus-visible .mark::after");
    expect(r).toMatch(/background:\s*var\(--hover-fill\)/);
  });

  it("FAQ plus marks are 20px with 2px strokes in the link colour", () => {
    expect(rule(".faq-trigger .mark::before, .faq-trigger .mark::after")).toMatch(/background:\s*var\(--link\)/);
    expect(rule(".faq-trigger .mark")).toMatch(/width:\s*20px[^}]*height:\s*20px/);
    expect(rule(".faq-trigger .mark::before")).toMatch(/height:\s*2px/);
    expect(rule(".faq-trigger .mark::after")).toMatch(/width:\s*2px/);
  });

  it("the link colour is distinct from the ink (at least 1.9:1 against it) and still reads on the field (at least 4.5:1)", () => {
    const g = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
    const hex = (n: string) => g.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`))![1];
    const lum = (h: string) => {
      const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const cr = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
    expect(cr(hex("link"), hex("ink"))).toBeGreaterThanOrEqual(1.9);
    expect(cr(hex("link"), hex("bg"))).toBeGreaterThanOrEqual(4.5);
  });

  it("unselected booking type buttons use the link colour, and the selected one is framed on the raised surface", () => {
    expect(rule(".cal-typebar button")).toMatch(/color:\s*var\(--link\)/);
    expect(rule('.cal-typebar button[aria-pressed="true"]')).toMatch(/background:\s*var\(--paper2\)/);
    expect(rule('.cal-typebar button[aria-pressed="true"]')).toMatch(/outline:\s*2px solid var\(--ink\)/);
  });

  it("the Cal.com fallback link is underlined in the link colour at rest", () => {
    const r = rule(".book-fallback a");
    expect(r).toMatch(/color:\s*var\(--link\)/);
    expect(r).toMatch(/text-decoration:\s*underline/);
  });

  it("the nav bar and footer are left alone: no link colour in the bar rules", () => {
    expect(rule(".nav a")).not.toMatch(/--link/);
    expect(rule(".colo a")).not.toMatch(/--link/);
  });
});

describe("text links share one underline style", () => {
  // Underlined at rest, in the text colour, 4px below the baseline. Orange is reserved for the decision point,
  // so no link underline takes the --signal colour.
  const textLinkRules = [".privacy a", ".fig figcaption a", ".defs a", ".prose a", ".faq-panel a", ".book-fallback a"];

  it.each(textLinkRules)("%s is underlined at rest with a 4px offset", (selector) => {
    const r = rule(selector);
    expect(r).toMatch(/text-decoration:\s*underline/);
    expect(r).toMatch(/text-underline-offset:\s*4px/);
  });

  it.each(textLinkRules)("%s does not recolour its underline", (selector) => {
    expect(rule(selector)).not.toMatch(/text-decoration-color/);
  });
});
