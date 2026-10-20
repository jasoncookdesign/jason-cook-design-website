/**
 * The blueprint drawing: the JCD mark's construction sheet. Every number on it is read from the mark's
 * geometry (84 x 100 cell, 4 x 4 module grid, circular arcs R 6 and R 26, one stripe equal to the J's notch).
 */
import fs from "fs";
import path from "path";
import { render } from "@testing-library/react";
import ConstructionDrawing from "@/components/brand/ConstructionDrawing";
import { JCD_CONSTRUCTION } from "@/lib/jcd-construction";
import { JCD_MARK } from "@/lib/jcd-mark";

describe("ConstructionDrawing", () => {
  it("is an image with a text alternative that states the construction", () => {
    const { container } = render(<ConstructionDrawing />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("role")).toBe("img");
    const label = svg.getAttribute("aria-label") ?? "";
    expect(label).toMatch(/JCD/);
    expect(label).toMatch(/module grid/i);
    expect(label).toMatch(/stripe/i);
  });

  it("draws the construction in named groups so the draw-in can stage them", () => {
    const { container } = render(<ConstructionDrawing />);
    for (const g of ["grid", "frame", "center", "fillets", "bowl", "mark", "dims"]) {
      expect(container.querySelector(`g.${g}`)).not.toBeNull();
    }
  });

  it("draws a circle at every rounded corner: 20 small (R 6) and two bowl (R 26)", () => {
    const { container } = render(<ConstructionDrawing />);
    const small = Array.from(container.querySelectorAll("g.fillets circle")).filter((c) => c.getAttribute("r") === "6");
    const bowl = Array.from(container.querySelectorAll("g.bowl circle")).filter((c) => c.getAttribute("r") === "26");
    expect(small).toHaveLength(20);
    expect(bowl).toHaveLength(2);
  });

  it("annotates the stripe and the notch it comes from, and the radii", () => {
    const { container } = render(<ConstructionDrawing />);
    const text = Array.from(container.querySelectorAll("text")).map((t) => t.textContent);
    expect(text).toContain("R 26");
    expect(text).toContain("84 = 4 x 21");
    expect(text).toContain("100 = 4 x 25");
    expect(text.filter((t) => t === String(JCD_MARK.notch)).length).toBeGreaterThanOrEqual(2);
  });

  it("is generated from the mark's geometry: each letter's cut bands are the mark's bands", () => {
    const doc = new DOMParser().parseFromString(`<svg>${JCD_CONSTRUCTION.inner}</svg>`, "image/svg+xml");
    for (const l of ["j", "c", "d"]) {
      expect(doc.querySelectorAll(`g.mark.mark-${l} rect`)).toHaveLength(JCD_MARK.bands.length);
    }
  });

  it("splits the mark into three letters in order J, C, D, each with its own outline and its own clip", () => {
    const doc = new DOMParser().parseFromString(`<svg>${JCD_CONSTRUCTION.inner}</svg>`, "image/svg+xml");
    const letters = ["j", "c", "d"];
    const groups = Array.from(doc.querySelectorAll("g.mark"));
    const outlines = Array.from(doc.querySelectorAll("path.mark-ghost"));
    expect(groups.map((g) => letters.find((l) => g.classList.contains(`mark-${l}`)))).toEqual(letters);
    expect(outlines.map((o) => letters.find((l) => o.classList.contains(`mark-${l}`)))).toEqual(letters);
    const clips = groups.map((g) => g.getAttribute("clip-path"));
    expect(new Set(clips).size).toBe(3);
    outlines.forEach((o) => expect(o.getAttribute("pathLength")).toBe("1"));
    // one closed contour for J and C, and the D has its counter as a second contour
    expect(outlines.map((o) => (o.getAttribute("d")!.match(/M/g) ?? []).length)).toEqual([1, 1, 2]);
  });
});

describe("ConstructionDrawing draw-in timing", () => {
  const css = fs.readFileSync(path.join(process.cwd(), "app/bp-drawing.css"), "utf8");
  const seconds = (re: RegExp) => {
    const m = css.match(re);
    if (!m) throw new Error(`no match for ${re}`);
    return parseFloat(m[1]);
  };

  it("starts the letters J, then C, then D, each starting before the previous one has finished drawing", () => {
    const draw = seconds(/--draw:\s*([\d.]+)s/);
    const start = (l: string) => seconds(new RegExp(`\\.drawing \\.mark-${l}\\s*\\{[^}]*--start:\\s*([\\d.]+)s`));
    const [j, c, d] = ["j", "c", "d"].map(start);
    expect(j).toBeLessThan(c);
    expect(c).toBeLessThan(d);
    expect(c - j).toBeLessThan(draw); // overlap
    expect(d - c).toBeLessThan(draw);
    expect(c - j).toBeGreaterThan(draw / 3); // still a visible stagger
  });

  it("leaves no trace outline in the static state, so reduced motion shows the finished mark", () => {
    expect(css).toMatch(/\.drawing path\.mark-ghost\s*\{[^}]*stroke-opacity:\s*0/);
    expect(css).toMatch(/prefers-reduced-motion: reduce\)\s*\{\s*\.drawing \* \{ animation: none !important/);
  });
});
