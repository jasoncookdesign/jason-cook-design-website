/**
 * Footer colophon row. The legal links (32px tall, text centered) and the copyright line (text height) share a
 * row, so the row centers its children vertically, and stacks them left-aligned on narrow screens.
 */
import { readFileSync } from "fs";
import { join } from "path";

const css = readFileSync(join(process.cwd(), "app/blueprint.css"), "utf8");

describe("footer colophon alignment", () => {
  it("centers the links and the copyright line on the same horizontal axis", () => {
    const m = css.match(/\n\.colo\{([^}]*)\}/);
    expect(m).not.toBeNull();
    expect(m![1]).toMatch(/align-items:center/);
  });

  it("stacks them left-aligned on narrow screens, where centering would center them horizontally", () => {
    const m = css.match(/\.colo\{flex-direction:column[^}]*\}/);
    expect(m).not.toBeNull();
    expect(m![0]).toMatch(/align-items:flex-start/);
  });
});
