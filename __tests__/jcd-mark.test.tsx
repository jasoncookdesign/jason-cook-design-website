/**
 * JCD brand mark contract. Three monospace letters (J, C, D) in an 84 x 100 cell each,
 * circular corner arcs, and seven scanline bands whose edges land on the bar edges.
 */
import { render } from "@testing-library/react";
import JcdMark from "@/components/brand/JcdMark";
import { JCD_MARK } from "@/lib/jcd-mark";

describe("JCD mark geometry", () => {
  it("is a 284 x 100 word", () => {
    expect(JCD_MARK.width).toBe(284);
    expect(JCD_MARK.height).toBe(100);
  });

  it("has seven bands of 10 with gaps of 5, aligned to the bar edges at 25 and 75", () => {
    expect(JCD_MARK.bands).toEqual([
      [0, 10], [15, 25], [30, 40], [45, 55], [60, 70], [75, 85], [90, 100],
    ]);
    // the top bar (0-25) is exactly two bands; the bottom bar (75-100) is exactly two bands
    expect(JCD_MARK.bands[1][1]).toBe(25);
    expect(JCD_MARK.bands[5][0]).toBe(75);
  });

  it("draws four closed subpaths: J, C, the D, and the D's counter", () => {
    expect((JCD_MARK.d.match(/M/g) ?? []).length).toBe(4);
    expect((JCD_MARK.d.match(/Z/g) ?? []).length).toBe(4);
  });

  it("uses cubic arcs for rounded corners only (no quadratic or elliptical arc commands)", () => {
    expect(JCD_MARK.d).toMatch(/C/);
    expect(JCD_MARK.d).not.toMatch(/[QAqaSsTt]/);
  });
});

describe("JcdMark component", () => {
  it("scanline variant renders seven band rects clipped to the letters", () => {
    const { container } = render(<JcdMark />);
    expect(container.querySelectorAll("g[clip-path] rect")).toHaveLength(7);
    expect(container.querySelectorAll("clipPath path")).toHaveLength(1);
  });

  it("solid variant renders one fill rect", () => {
    const { container } = render(<JcdMark variant="solid" />);
    expect(container.querySelectorAll("g[clip-path] rect")).toHaveLength(1);
  });

  it("is decorative by default and an image when given a label", () => {
    const a = render(<JcdMark />).container.querySelector("svg")!;
    expect(a.getAttribute("aria-hidden")).toBe("true");
    expect(a.getAttribute("role")).toBeNull();
    const b = render(<JcdMark label="JCD" />).container.querySelector("svg")!;
    expect(b.getAttribute("role")).toBe("img");
    expect(b.getAttribute("aria-label")).toBe("JCD");
    expect(b.getAttribute("aria-hidden")).toBeNull();
  });

  it("gives every instance its own clip path id", () => {
    const { container } = render(<><JcdMark /><JcdMark /></>);
    const ids = Array.from(container.querySelectorAll("clipPath")).map((n) => n.id);
    expect(new Set(ids).size).toBe(2);
    ids.forEach((id) => expect(id).not.toBe(""));
  });

  it("takes its color from currentColor", () => {
    const { container } = render(<JcdMark />);
    expect(container.querySelector("svg")!.getAttribute("fill")).toBe("currentColor");
  });
});
