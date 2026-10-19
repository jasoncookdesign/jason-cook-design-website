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
  it("row chevron boxes on links use the link colour for border and glyph", () => {
    const r = rule("a.row .go");
    expect(r).toMatch(/border-color:\s*var\(--link\)/);
    expect(r).toMatch(/color:\s*var\(--link\)/);
  });

  it("row chevron boxes fill with the link colour when the row is hovered or focused", () => {
    const r = rule("a.row:hover .go, a.row:focus-visible .go");
    expect(r).toMatch(/background:\s*var\(--link\)/);
    expect(r).toMatch(/color:\s*var\(--bg\)/);
  });

  it("FAQ plus marks use the link colour", () => {
    expect(rule(".faq-trigger .mark::before, .faq-trigger .mark::after")).toMatch(/background:\s*var\(--link\)/);
  });

  it("unselected booking type buttons use the link colour, and the selected one keeps the accent fill", () => {
    expect(rule(".cal-typebar button")).toMatch(/color:\s*var\(--link\)/);
    expect(rule('.cal-typebar button[aria-pressed="true"]')).toMatch(/background:\s*var\(--accent\)/);
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
