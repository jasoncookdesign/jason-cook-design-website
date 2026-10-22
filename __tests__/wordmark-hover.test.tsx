/**
 * Header mark hover. Hovering (or focusing) the lockup flashes the approved final variations of the mark in
 * quick succession, then settles on the hover-fill blue: navy stripes on an orange field, solid orange, solid
 * ivory, then the top band stepping from ivory to the two-tone blue. A hidden gap rect lets the stripe fill in for the solid variations.
 * Under reduced motion there is no flash, only the settled color.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render } from "@testing-library/react";
import JcdMark from "@/components/brand/JcdMark";
import Nav from "@/components/layout/Nav";

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
  // one line per keyframe
  const frames = keyframes.split("\n").map((l) => l.trim()).filter((l) => /^\d+%/.test(l));
  const indexOf = (re: RegExp) => frames.findIndex((f) => re.test(f));

  it("runs the sequence in order: orange box, orange, white, white-to-two-tone in rising steps, then all hover blue", () => {
    const orangeBox = indexOf(/^0%[^}]*color:\s*#0D2438/i);
    const orange = indexOf(/color:\s*#E8723C;[^}]*--mk-gap:\s*1/i);
    const white = indexOf(/color:\s*#E8EFF5;[^}]*--mk-gap:\s*1/i);
    const tint1 = indexOf(/--mk-top:\s*#D1E4F8/i);
    const tint2 = indexOf(/--mk-top:\s*#BAD9FB/i);
    const twoTone = indexOf(/--mk-top:\s*#9CCBFF/i);
    const settled = indexOf(/color:\s*var\(--hover-fill\)/);
    const order = [orangeBox, orange, white, tint1, tint2, twoTone, settled];
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(new Set(order).size).toBe(order.length);
  });

  it("keeps the bottom band white through the tints, so the blue strengthens against it", () => {
    for (const re of [/#D1E4F8/i, /#BAD9FB/i, /#9CCBFF/i]) {
      const f = frames[indexOf(re)];
      expect(f).toMatch(/--mk-bot:\s*#E8EFF5/i);
    }
  });

  it("holds each frame (hard cuts), and ends on the hover-fill blue for the whole mark", () => {
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

describe("orange field behind the mark", () => {
  const fade = (css.match(/@keyframes mk-field-fade\s*\{([\s\S]*?)\n\}/) ?? [])[1] ?? "";

  it("is its own element under the mark, not an outline or background on the svg", () => {
    expect(css).toMatch(/\.bar \.wm-badge::before\s*\{[^}]*background:\s*#E8723C/i);
    expect(css).toMatch(/\.bar \.wm-badge::before\s*\{[^}]*z-index:\s*-1/);
    expect(css).toMatch(/\.bar \.wm-badge\s*\{[^}]*isolation:\s*isolate/);
    expect(css).not.toMatch(/\.wm-mark\s*\{[^}]*outline:/);
    expect(css).not.toMatch(/--mk-field/);
  });

  it("is invisible at rest and starts fully opaque when the flash starts", () => {
    expect(css).toMatch(/\.bar \.wm-badge::before\s*\{[^}]*opacity:\s*0/);
    expect(fade).toMatch(/0%\s*\{[^}]*opacity:\s*1/);
  });

  it("stays under every later frame and fades out smoothly, finishing as the flash does", () => {
    expect(fade).toMatch(/100%\s*\{[^}]*opacity:\s*0/);
    expect(fade).not.toMatch(/steps\(/);
    expect(css).toMatch(/\.bar \.wordmark:is\(:hover,\s*:focus-visible\) \.wm-badge::before\s*\{[^}]*animation:\s*mk-field-fade\s+900ms\s+linear\s+forwards/);
  });

  it("is left out under reduced motion", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.wm-badge::before[^}]*animation:\s*none/);
  });
});

describe("header lockup markup", () => {
  it("wraps the mark in a badge element that carries the field", () => {
    const { container } = render(<Nav />);
    const badge = container.querySelector(".wordmark > .wm-badge")!;
    expect(badge).not.toBeNull();
    expect(badge.querySelector("svg.wm-mark")).not.toBeNull();
  });
});
