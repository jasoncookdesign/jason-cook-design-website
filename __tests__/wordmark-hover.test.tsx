/**
 * Header mark hover. Hovering (or focusing) the lockup flashes the approved final variations of the mark in
 * quick succession, then settles on the hover-fill blue: navy stripes on an orange field, solid ivory, the
 * two-tone stripes, and solid orange. A hidden gap rect lets the stripe fill in for the solid variations.
 * Under reduced motion there is no flash, only the settled color.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render } from "@testing-library/react";
import JcdMark from "@/components/brand/JcdMark";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
const keyframes = (css.match(/@keyframes mk-flash\s*\{([\s\S]*?)\n\}/) ?? [])[1] ?? "";

describe("JcdMark morph", () => {
  it("adds a hidden rect for the stripe's gap, between the two bands, only when asked", () => {
    const plain = render(<JcdMark />).container;
    expect(plain.querySelectorAll("g[clip-path] rect")).toHaveLength(2);
    const { container } = render(<JcdMark morph />);
    const rects = Array.from(container.querySelectorAll("g[clip-path] rect"));
    expect(rects).toHaveLength(3);
    expect(rects.map((r) => r.getAttribute("class"))).toEqual(["mk-top", "mk-gap", "mk-bot"]);
    expect(rects[1].getAttribute("y")).toBe("46");
    expect(rects[1].getAttribute("height")).toBe("8");
  });

  it("keeps the default marks the same shape as before", () => {
    expect(render(<JcdMark variant="solid" />).container.querySelectorAll("g[clip-path] rect")).toHaveLength(1);
  });
});

describe("header mark hover", () => {
  it("flashes the four approved variations, in the approved colors", () => {
    expect(keyframes).not.toBe("");
    for (const c of ["#E8723C", "#0D2438", "#E8EFF5", "#9CCBFF"]) expect(keyframes.toUpperCase()).toContain(c);
  });

  it("holds each frame (hard cuts), and ends on the hover-fill blue", () => {
    expect(keyframes).toMatch(/animation-timing-function:\s*steps\(1,\s*end\)/);
    expect(keyframes).toMatch(/100%\s*\{[^}]*color:\s*var\(--hover-fill\)/);
  });

  it("runs on hover and keyboard focus, and settles on the hover-fill blue", () => {
    expect(css).toMatch(/\.bar \.wordmark:is\(:hover,\s*:focus-visible\) \.wm-mark\s*\{[^}]*animation:\s*mk-flash\s+\d+ms/);
    expect(css).toMatch(/\.bar \.wordmark:is\(:hover,\s*:focus-visible\) \.wm-mark\s*\{[^}]*color:\s*var\(--hover-fill\)/);
  });

  it("no longer dims the whole lockup on hover", () => {
    expect(css).not.toMatch(/\.bar \.wordmark:hover\s*\{[^}]*opacity/);
  });

  it("does not flash under reduced motion", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.wm-mark[^}]*animation:\s*none/);
  });
});
