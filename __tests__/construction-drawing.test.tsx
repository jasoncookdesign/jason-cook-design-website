/**
 * The blueprint drawing: the JCD mark's construction sheet. Every number on it is read from the mark's
 * geometry (84 x 100 cell, 4 x 4 module grid, circular arcs R 6 and R 26, one stripe equal to the J's notch).
 */
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

  it("is generated from the mark's geometry: its cut bands are the mark's bands", () => {
    const rects = Array.from(
      new DOMParser().parseFromString(`<svg>${JCD_CONSTRUCTION.inner}</svg>`, "image/svg+xml").querySelectorAll("g.mark rect")
    );
    expect(rects).toHaveLength(JCD_MARK.bands.length);
  });
});
