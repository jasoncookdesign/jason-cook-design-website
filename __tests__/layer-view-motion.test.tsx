/**
 * Layer view motion. While the page scrolls, the tilt eases in toward a smaller angle (the plates pull in), and
 * eases back out once scrolling has been still for a moment. The scroll state is an html class (`moving`);
 * the easing itself lives in the stylesheet. Opening settles with a small bounce; closing eases in and out.
 * Reduced motion never changes the tilt.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useState } from "react";
import LayerView from "@/components/layout/LayerView";

class RO { observe() {} unobserve() {} disconnect() {} }
const STILL_MS = 240;

function setup(opts: { reduced?: boolean } = {}) {
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver = RO;
  window.matchMedia = ((q: string) => ({
    matches: /prefers-reduced-motion/.test(q) ? !!opts.reduced : false,
    media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  document.documentElement.className = "js" + (opts.reduced ? " rm" : "");
  sessionStorage.clear();
}

function Bar() {
  const [cue, setCue] = useState("");
  return (
    <div className="frame">
      <header className="bar" data-sheet="G-001" data-name="TITLE BAR" data-flat>
        <LayerView cue={cue} onCue={setCue} />
      </header>
      <main>
        <section data-sheet="A-101" data-name="HERO"><p>hero</p></section>
      </main>
    </div>
  );
}

const html = () => document.documentElement;
const scroll = () => act(() => { window.dispatchEvent(new Event("scroll")); });
const toggle = () => fireEvent.click(screen.getByRole("button", { name: /layers/i }));

describe("layer view: tilt eases in while scrolling and back out when still", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();
    html().className = "";
    delete (window as unknown as { __layerCheck?: unknown }).__layerCheck;
  });

  it("marks the page as moving on scroll and clears it after the scroll has been still for a moment", () => {
    setup();
    render(<Bar />);
    toggle();
    scroll();
    expect(html().classList.contains("moving")).toBe(true);
    act(() => { jest.advanceTimersByTime(STILL_MS - 1); });
    expect(html().classList.contains("moving")).toBe(true);
    act(() => { jest.advanceTimersByTime(2); });
    expect(html().classList.contains("moving")).toBe(false);
  });

  it("keeps the pulled-in state while scroll events keep arriving", () => {
    setup();
    render(<Bar />);
    toggle();
    for (let i = 0; i < 5; i++) {
      scroll();
      act(() => { jest.advanceTimersByTime(STILL_MS - 40); });
    }
    expect(html().classList.contains("moving")).toBe(true);
  });

  it("does nothing while the layers are off", () => {
    setup();
    render(<Bar />);
    scroll();
    expect(html().classList.contains("moving")).toBe(false);
  });

  it("clears the moving state when the layers are turned off mid-scroll", () => {
    setup();
    render(<Bar />);
    toggle();
    scroll();
    toggle();
    expect(html().classList.contains("moving")).toBe(false);
  });

  it("never changes the tilt under reduced motion, even with the still tilt on", () => {
    setup({ reduced: true });
    html().classList.add("rmtilt");
    render(<Bar />);
    toggle();
    expect(html().classList.contains("t3d")).toBe(true);
    scroll();
    expect(html().classList.contains("moving")).toBe(false);
  });

  it("stops reacting to scroll once the view is torn down", () => {
    setup();
    const { unmount } = render(<Bar />);
    toggle();
    unmount();
    scroll();
    expect(html().classList.contains("moving")).toBe(false);
  });
});

describe("layer view: plates keep their paper while the exit animation runs", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    jest.useRealTimers();
    html().className = "";
    delete (window as unknown as { __layerCheck?: unknown }).__layerCheck;
  });

  it("marks the page as leaving when a tilted view closes, and clears it once the exit has finished", () => {
    setup();
    render(<Bar />);
    toggle();
    toggle();
    expect(html().classList.contains("leaving")).toBe(true);
    act(() => { jest.advanceTimersByTime(639); });
    expect(html().classList.contains("leaving")).toBe(true);
    act(() => { jest.advanceTimersByTime(80); });
    expect(html().classList.contains("leaving")).toBe(false);
  });

  it("does not mark leaving when there was no tilt to ease out", () => {
    setup({ reduced: true });
    render(<Bar />);
    toggle();
    toggle();
    expect(html().classList.contains("leaving")).toBe(false);
  });

  it("clears leaving when the view is opened again mid-exit", () => {
    setup();
    render(<Bar />);
    toggle();
    toggle();
    toggle();
    expect(html().classList.contains("leaving")).toBe(false);
  });
});

describe("layer view stylesheet: motion contract", () => {
  const css = readFileSync(join(process.cwd(), "app/blueprint-layers.css"), "utf8");

  it("registers the engagement variable so the browser can ease the tilt between its two values", () => {
    expect(css).toMatch(/@property\s+--eng\s*\{[^}]*syntax:\s*['"]<number>['"]/);
  });

  it("pulls the tilt in while moving, with its own ease-out, and relaxes with a longer one", () => {
    expect(css).toMatch(/html\.t3d\.moving\s*\{[^}]*--eng:\s*0?\.5\d*/);
    expect(css).toMatch(/html\.t3d\.moving\s*\{[^}]*transition:\s*--eng\s+\d+ms/);
    expect(css).toMatch(/html\.t3d\s*\{[^}]*transition:\s*--eng\s+\d+ms/);
  });

  it("scales both tilt angles by the engagement variable", () => {
    expect(css).toMatch(/--rx:calc\(2\.4deg \* var\(--k\) \* var\(--eng\)\)/);
    expect(css).toMatch(/--ry:calc\(-3\.4deg \* var\(--k\) \* var\(--eng\)\)/);
  });

  it("rests at 2.4 times the base tilt", () => {
    expect(css).toMatch(/:root\{[^}]*--k:2\.4[;}]/);
  });

  it("opens with a bounce and closes on an exponential ease in and out", () => {
    expect(css).toMatch(/--ease-bounce:\s*cubic-bezier\(/);
    expect(css).toMatch(/@supports[^{]*linear\([^{]*\{[^}]*--ease-bounce:\s*linear\(/);
    expect(css).toMatch(/--ease-expo-io:\s*cubic-bezier\(\.87,\s*0,\s*\.13,\s*1\)/);
    expect(css).toMatch(/animation:\s*posein\s+\d+ms\s+var\(--ease-bounce\)/);
    expect(css).toMatch(/\[data-sheet\]\{[^}]*transition:\s*transform\s+\d+ms\s+var\(--ease-expo-io\)/);
  });

  it("lets the browser's easing, not a per-frame transition, drive the plates while tilted", () => {
    const rule = css.match(/html\.t3d \[data-sheet\]:not\(\[data-flat\]\)\{transition:([^}]*)\}/);
    expect(rule).not.toBeNull();
    expect(rule![1]).not.toMatch(/transform/);
  });

  it("keeps the drop lines in the exit animation instead of removing them from layout the moment the tilt ends", () => {
    expect(css).not.toMatch(/html:not\(\.t3d\)\s+\.dl\s*\{[^}]*display:\s*none/);
    expect(css).toMatch(/html:not\(\.t3d\)\s+\.dl\s*\{[^}]*visibility:\s*hidden[^}]*visibility\s+0s\s+640ms/);
  });

  it("fades the plate paper out on exit and in on entry, instead of popping", () => {
    expect(css).toMatch(/\[data-sheet\]\{[^}]*transition:[^}]*background-color\s+640ms\s+var\(--ease-expo-io\)/);
    expect(css).toMatch(/html\.leaving \[data-sheet\][^{]*\{[^}]*background-clip:\s*content-box/);
    expect(css).toMatch(/html\.t3d \[data-sheet\]:not\(\[data-flat\]\)\{transition:\s*background-color\s+\d+ms/);
  });
});
