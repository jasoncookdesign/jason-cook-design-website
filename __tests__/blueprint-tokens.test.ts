/**
 * Blueprint palette contract. The site is dark only: one set of tokens in :root,
 * no second theme block, and every text and mark pairing meets WCAG AA.
 * (Rule color measures 3.69:1 on the field; it carries meaning only as a line or mark.)
 */
import fs from "fs";
import path from "path";

const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");

function rootBlock(): string {
  const m = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  if (!m) throw new Error(":root block not found");
  return m[1];
}
function token(name: string): string {
  const m = rootBlock().match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})\\s*;`));
  if (!m) throw new Error(`token --${name} not found as a hex value in :root`);
  return m[1].toUpperCase();
}
function lum(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a: string, b: string): number {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

describe("blueprint tokens", () => {
  it("is dark only: color-scheme dark, no light palette, no second theme token block", () => {
    expect(rootBlock()).toMatch(/color-scheme:\s*dark/);
    expect(css).not.toMatch(/\[data-theme="dark"\]\s*\{[^}]*--bg\s*:/);
    expect(token("bg")).toBe("#0D2438");
    expect(token("ink")).toBe("#E8EFF5");
  });

  it("keeps the decision accent as its own token, separate from the mark accent", () => {
    expect(token("decision")).toBe("#FF9B6B");
    expect(token("accent")).not.toBe(token("decision"));
  });

  it.each([
    ["ink", "bg", 7],
    ["ink", "surface", 7],
    ["body-strong", "bg", 7],
    ["body", "bg", 4.5],
    ["body", "surface", 4.5],
    ["muted", "bg", 4.5],
    ["muted", "surface", 4.5],
    ["link", "bg", 4.5],
    ["link", "surface", 4.5],
    ["btn-ink", "btn-bg", 4.5],
    ["band-ink", "band-bg", 7],
    ["band-body", "band-bg", 4.5],
    ["band-muted", "band-bg", 4.5],
  ])("text pairing %s on %s is at least %s:1", (fg, bg, min) => {
    expect(ratio(token(fg), token(bg))).toBeGreaterThanOrEqual(min);
  });

  it.each([
    ["accent", "bg"],
    ["accent", "surface"],
    ["border", "bg"],
    ["border", "surface"],
  ])("control mark or line %s on %s is at least 3:1", (fg, bg) => {
    expect(ratio(token(fg), token(bg))).toBeGreaterThanOrEqual(3);
  });

  it("pins display weights to the serif's regular weight (no 200 or 300 in the serif)", () => {
    expect(css).toMatch(/--font-weight-extralight:\s*400/);
    expect(css).toMatch(/--font-weight-light:\s*400/);
  });
});

describe("blueprint shape and scale", () => {
  it("has one radius, and it is square", () => {
    expect(rootBlock()).toMatch(/--radius:\s*0px/);
  });

  it("sets the serif text scale: body 19px, small 16px", () => {
    expect(css).toMatch(/--text-base:\s*1\.1875rem/);
    expect(css).toMatch(/--text-sm:\s*1rem/);
  });

  it("uses no literal pixel radii in components (the radius token governs corners)", () => {
    const glob = (dir: string): string[] =>
      fs.readdirSync(path.join(process.cwd(), dir), { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? glob(path.join(dir, e.name)) : /\.tsx$/.test(e.name) ? [path.join(dir, e.name)] : []
      );
    const offenders = [...glob("app"), ...glob("components")].filter((f) =>
      /rounded-\[\d+px\]/.test(fs.readFileSync(path.join(process.cwd(), f), "utf8"))
    );
    expect(offenders).toEqual([]);
  });
});

describe("sheet grammar", () => {
  it("numbers each section with a CSS counter and hides the label from assistive technology", () => {
    expect(css).toMatch(/main\s*\{[^}]*counter-reset:\s*sheet/);
    expect(css).toMatch(/main section\s*\{[^}]*counter-increment:\s*sheet/);
    expect(css).toMatch(/main section::before\s*\{[^}]*content:\s*"A-1"\s*counter\(sheet,\s*decimal-leading-zero\)\s*\/\s*""/);
  });

  it("draws the binding margin only on wide screens and never intercepts pointer events", () => {
    expect(css).toMatch(/@media \(min-width: 1280px\)\s*\{\s*body::before[^}]*pointer-events:\s*none/);
  });
});
