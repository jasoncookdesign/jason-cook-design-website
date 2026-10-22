/**
 * Link hover. A text link takes the hover-fill (aqua) as its color and underline on hover or keyboard focus,
 * the same token a solid control takes as a fill. The aqua keeps 4.5:1 or better against the page color, so it
 * is safe as text. Navigation links keep their orange underline and the row/cell lists keep their raised surface.
 */
import { readFileSync } from "fs";
import { join } from "path";

const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
const css = ["app/globals.css", "app/blueprint.css", "app/blueprint-patterns.css", "app/bp-content.css", "app/blueprint-motion.css"]
  .map(read)
  .join("\n");

function rule(selector: string): string {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = css.match(new RegExp(`(?:^|[},\\s])${esc}\\s*\\{([^}]*)\\}`, "m"));
  if (!m) throw new Error(`rule not found: ${selector}`);
  return m[1];
}

const hoverLinks = [
  ".prose a:hover",
  ".fig figcaption a:hover",
  ".defs a:hover",
  ".book-fallback a:hover",
  ".crumb a:hover",
  ".foot-sheet .cell a:hover",
  ".foot-sheet .colo a:hover",
  ".privacy a:hover",
];

describe("link hover", () => {
  it.each(hoverLinks)("%s turns the text and its underline aqua", (sel) => {
    const r = rule(sel);
    expect(r).toMatch(/color:\s*var\(--hover-fill\)/);
    expect(r).toMatch(/text-decoration-color:\s*var\(--hover-fill\)/);
  });

  it("applies on keyboard focus as well", () => {
    expect(css).toMatch(/a:focus-visible[^{]*\{[^}]*color:\s*var\(--hover-fill\)/);
  });

  it("leaves the nav's orange underline and the row/cell surfaces alone", () => {
    expect(rule(".nav a:hover")).toMatch(/text-decoration-color:\s*var\(--signal\)/);
    expect(rule("a.row:hover")).toMatch(/background:\s*var\(--paper2\)/);
    expect(rule("a.cell:hover")).toMatch(/background:\s*var\(--paper2\)/);
  });
});
