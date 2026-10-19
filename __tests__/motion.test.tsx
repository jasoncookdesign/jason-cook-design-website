import { readFileSync } from "fs";
import { join } from "path";
import { StrictMode } from "react";
import { render, act } from "@testing-library/react";
jest.mock("next/navigation", () => ({ usePathname: () => "/" }));
import RevealOnScroll from "@/components/layout/RevealOnScroll";

// Polish: micro-animations for state transitions, and a fade-and-rise reveal on scroll. Principles (from the
// design practice notes and the Dyson Hope reference): one easing curve, 150-550 ms, only interactive things
// respond, everything is off under prefers-reduced-motion, content is never hidden without JavaScript.

const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");
const all = ["app/globals.css", "app/blueprint.css", "app/blueprint-patterns.css", "app/bp-home.css", "app/bp-content.css", "app/bp-engagements.css", "app/blueprint-layers.css", "app/blueprint-motion.css"].map(read).join("\n");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\>~]/g, "\\$&");
// a rule whose selector list contains `sel` and whose body has a transition (or animation) using the shared timing
const transitions = (sel: string) => new RegExp(`(^|[,}\\s])${esc(sel)}\\s*(,[^{]*)?\\{[^}]*transition:[^;}]*var\\(--t`).test(all);

describe("motion tokens", () => {
  it("defines one easing curve and one duration, and zeroes the duration under reduced motion", () => {
    expect(read("app/globals.css")).toMatch(/--ease:\s*cubic-bezier\(\.2,\s*\.7,\s*\.2,\s*1\)/);
    expect(read("app/globals.css")).toMatch(/--t:\s*0?\.25s/);
    expect(read("app/globals.css")).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*\{[^@]*:root\s*\{\s*--t:\s*0s/);
  });
});

describe("state transitions", () => {
  it.each([
    "a",
    ".btn",
    ".bar .menu-btn",
    ".bar .lv",
    "a.row",
    "a.cell",
    ".faq-trigger",
    ".seg > *",
    ".seg > *::before",
    ".bar",
    ".bar .menu nav a",
    ".book-fallback a",
  ])("%s eases between its states", (sel) => {
    expect(transitions(sel)).toBe(true);
  });

  it("nudges the arrow on a button, and the chevron on a linked row, on hover", () => {
    expect(all).toMatch(/\.btn:hover span\[aria-hidden\]\s*\{[^}]*transform:\s*translateX\(/);
    expect(all).toMatch(/a\.row:hover \.go\s*\{[^}]*transform:\s*translateX\(/);
    expect(all).toMatch(/\.btn:active\s*\{[^}]*transform:\s*translateY\(1px\)/);
  });

  it("fades and slides the mobile menu in", () => {
    expect(all).toMatch(/@keyframes menu-in\s*\{[^}]*opacity[^}]*\}[^}]*\}/);
    expect(all).toMatch(/\.bar \.menu nav\s*\{[^}]*animation:\s*menu-in/);
  });

  it("is switched off, not merely shortened, for the layer view's own measuring", () => {
    expect(all).toMatch(/html\.boot[^{]*\{[^}]*transition:\s*none/);
  });
});

describe("reveal on scroll CSS", () => {
  it("hides a revealed block only when JavaScript ran, motion is allowed, and layers are off", () => {
    expect(all).toMatch(/html\.js:not\(\.rm\):not\(\.layers\) \.rv\s*\{[^}]*opacity:\s*0[^}]*transform:\s*translateY\(12px\)/);
    expect(all).toMatch(/\.rv\.in\s*\{[^}]*opacity:\s*1[^}]*transform:\s*none/);
  });
});

describe("RevealOnScroll", () => {
  type IOCallback = (entries: { target: Element; isIntersecting: boolean }[]) => void;
  let cb: IOCallback;
  const observed: Element[] = [];
  const unobserved: Element[] = [];

  beforeEach(() => {
    observed.length = 0;
    unobserved.length = 0;
    document.documentElement.className = "js";
    document.body.innerHTML = `<main><section id="first"><div class="a"></div></section><section id="second"><div class="b"></div><div class="c"></div></section></main>`;
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      constructor(c: IOCallback) { cb = c; }
      observe(e: Element) { observed.push(e); }
      unobserve(e: Element) { unobserved.push(e); }
      disconnect() {}
    };
    // the first section is on screen at load; the second is below the fold
    const rect = (top: number, bottom: number) => () => ({ top, bottom, left: 0, right: 0, width: 0, height: bottom - top, x: 0, y: top, toJSON() {} }) as DOMRect;
    document.querySelector(".a")!.getBoundingClientRect = rect(100, 400);
    document.querySelector(".b")!.getBoundingClientRect = rect(1200, 1500);
    document.querySelector(".c")!.getBoundingClientRect = rect(1600, 1900);
  });

  it("marks only blocks below the fold, observes them, and fades each in once when it enters", () => {
    render(<RevealOnScroll />);
    const b = document.querySelector(".b")!;
    const c = document.querySelector(".c")!;
    expect(document.querySelector(".a")!.classList.contains("rv")).toBe(false);
    expect(b.classList.contains("rv") && c.classList.contains("rv")).toBe(true);
    expect(observed).toEqual([b, c]);
    act(() => cb([{ target: b, isIntersecting: true }]));
    expect(b.classList.contains("in")).toBe(true);
    expect(c.classList.contains("in")).toBe(false);
    expect(unobserved).toEqual([b]);
  });

  it("keeps observing after React re-runs the effect (strict mode, navigation): blocks already marked are re-observed, not skipped", () => {
    const live: { observed: Element[]; disconnected: boolean }[] = [];
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      rec = { observed: [] as Element[], disconnected: false };
      constructor(c: IOCallback) { cb = c; live.push(this.rec); }
      observe(e: Element) { this.rec.observed.push(e); }
      unobserve() {}
      disconnect() { this.rec.disconnected = true; }
    };
    render(<StrictMode><RevealOnScroll /></StrictMode>);
    const active = live.filter((o) => !o.disconnected);
    expect(active).toHaveLength(1);
    expect(active[0].observed).toEqual([document.querySelector(".b"), document.querySelector(".c")]);
  });

  it("does nothing under reduced motion", () => {
    document.documentElement.classList.add("rm");
    render(<RevealOnScroll />);
    expect(document.querySelector(".rv")).toBeNull();
    expect(observed).toEqual([]);
  });
});
