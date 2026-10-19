/**
 * The pattern kit that extends the concept for a whole site: ruled cells, ledger rows, definition rows,
 * FAQ rows, quotes, a logo strip, long-form prose, a stat row, a segmented control, and a breadcrumb.
 * All of it is ink-and-rule on one paper field: no fills, no radius, no shadow.
 */
import fs from "fs";
import path from "path";

const css = fs.readFileSync(path.join(process.cwd(), "app/blueprint-patterns.css"), "utf8");
const globals = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

describe("blueprint patterns", () => {
  it("is imported after the kit", () => {
    expect(globals.indexOf("blueprint-patterns.css")).toBeGreaterThan(globals.indexOf("blueprint.css"));
  });

  it.each([
    ".cells", ".cell", ".rows", ".row", ".defs", ".faq-item", ".faq-trigger", ".faq-panel",
    ".quotes", ".logos", ".prose", ".statrow", ".seg", ".crumb", ".btn.ghost",
  ])("defines %s", (sel) => {
    expect(css).toContain(sel);
  });

  it("uses no fill other than the paper tones, no radius, and no shadow", () => {
    expect(css).not.toMatch(/border-radius\s*:\s*[1-9]/);
    // the one allowed shadow is the 1px inset rule under an active segment
    expect(css.replace(/box-shadow:\s*inset 0 -1px 0 var\(--rule\)/g, "")).not.toMatch(/box-shadow/);
    expect(css).not.toMatch(/linear-gradient|radial-gradient/);
    expect(css).not.toMatch(/background(-color)?\s*:\s*#/);
  });

  it("lets a linked row and a linked cell respond to hover with the raised paper tone", () => {
    expect(css).toMatch(/a\.row:hover[^}]*background:\s*var\(--paper2\)/);
    expect(css).toMatch(/a\.cell:hover[^}]*background:\s*var\(--paper2\)/);
  });

  it("collapses cells to a single ruled column on phones", () => {
    expect(css).toMatch(/@media \(max-width: 899px\)[\s\S]*\.cells[\s\S]*grid-template-columns:\s*1fr/);
  });
});
