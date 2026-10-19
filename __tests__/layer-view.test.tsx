import { readFileSync } from "fs";
import { join } from "path";
/**
 * Layer view: an off-by-default toggle that exposes the page's structure. Plates ([data-sheet]) get a sketch
 * layer (measured padding, gaps, size) and an annotation layer, and can tilt a few degrees; under reduced motion
 * it is flat unless the viewer opts in to the still tilt. State is remembered for the session.
 */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useState } from "react";
import LayerView from "@/components/layout/LayerView";

class RO { observe() {} unobserve() {} disconnect() {} }
let reduced = false;

function setup(opts: { reduced?: boolean; stored?: string } = {}) {
  reduced = !!opts.reduced;
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver = RO;
  window.matchMedia = ((q: string) => ({
    matches: /prefers-reduced-motion/.test(q) ? reduced : false,
    media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  const h = document.documentElement;
  h.className = "js" + (reduced ? " rm" : "");
  sessionStorage.clear();
  if (opts.stored) sessionStorage.setItem("jcd-layers", opts.stored);
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
        <section data-sheet="A-102" data-name="PLAN"><p>plan</p></section>
      </main>
    </div>
  );
}

describe("LayerView control", () => {
  afterEach(() => {
    document.documentElement.className = "";
    delete (window as unknown as { __layerCheck?: unknown }).__layerCheck;
  });

  it("offers a Layers toggle that is off by default and revealed once the script is running", () => {
    setup();
    render(<Bar />);
    const btn = screen.getByRole("button", { name: /layers/i });
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    expect(btn.hasAttribute("hidden")).toBe(false);
  });

  it("toggles the layers class on <html>, aria-pressed, and the remembered state", () => {
    setup();
    render(<Bar />);
    const btn = screen.getByRole("button", { name: /layers/i });
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("layers")).toBe(true);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(sessionStorage.getItem("jcd-layers")).toBe("1");
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("layers")).toBe(false);
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    expect(sessionStorage.getItem("jcd-layers")).toBe("0");
  });

  it("draws a sketch layer and an annotation layer into every plate, and drop lines into the tilting ones", () => {
    setup();
    const { container } = render(<Bar />);
    fireEvent.click(screen.getByRole("button", { name: /layers/i }));
    const sections = container.querySelectorAll("main [data-sheet]");
    expect(sections).toHaveLength(2);
    sections.forEach((s) => {
      expect(s.querySelector(":scope > svg.sk")).not.toBeNull();
      expect(s.querySelector(":scope > svg.an")).not.toBeNull();
      expect(s.querySelectorAll(":scope > .dl")).toHaveLength(4);
      expect(s.querySelector(":scope > svg.sk")!.getAttribute("aria-hidden")).toBe("true");
    });
    // the flat bar is never tilted and gets no drop lines
    expect(container.querySelector("header [data-flat] .dl, header > .dl")).toBeNull();
  });

  it("tilts when motion is allowed and says so in a status line", () => {
    setup();
    render(<Bar />);
    fireEvent.click(screen.getByRole("button", { name: /layers/i }));
    expect(document.documentElement.classList.contains("t3d")).toBe(true);
    expect(screen.getByRole("status").textContent).toBe("TILT ON");
  });

  it("under reduced motion is flat, says why, and lets the viewer opt in to the still tilt", () => {
    setup({ reduced: true });
    render(<Bar />);
    fireEvent.click(screen.getByRole("button", { name: /layers/i }));
    expect(document.documentElement.classList.contains("t3d")).toBe(false);
    expect(screen.getByRole("status").textContent).toBe("TILT OFF: REDUCED MOTION");
    const optIn = screen.getByRole("button", { name: /show tilt/i });
    fireEvent.click(optIn);
    expect(document.documentElement.classList.contains("rmtilt")).toBe(true);
    expect(document.documentElement.classList.contains("t3d")).toBe(true);
    expect(screen.getByRole("status").textContent).toBe("TILT ON (STILL, REDUCED MOTION)");
    expect(sessionStorage.getItem("jcd-rmtilt")).toBe("1");
  });

  it("exposes a self-check that returns one entry per plate", () => {
    setup();
    render(<Bar />);
    const check = (window as unknown as { __layerCheck?: () => { sheet: string; name: string }[] }).__layerCheck;
    expect(typeof check).toBe("function");
    const rows = act(() => check!() as unknown) as unknown;
    void rows;
    const out = check!();
    expect(out.map((r) => r.sheet)).toEqual(["G-001", "A-101", "A-102"]);
  });

  it("restores the remembered state on load", () => {
    setup({ stored: "1" });
    document.documentElement.classList.add("layers");
    render(<Bar />);
    expect(screen.getByRole("button", { name: /layers/i }).getAttribute("aria-pressed")).toBe("true");
  });
});

describe("LayerView icon button", () => {
  it("is an icon button: a stacked-layers glyph, an accessible name, and no visible text", () => {
    setup();
    render(<Bar />);
    const btn = screen.getByRole("button", { name: /layers/i });
    const icon = btn.querySelector("svg");
    expect(icon).not.toBeNull();
    expect(icon!.getAttribute("aria-hidden")).toBe("true");
    expect(icon!.querySelectorAll("path").length).toBeGreaterThanOrEqual(4); // top rhombus plus three lower layers
    expect((btn.textContent ?? "").trim()).toBe("");
    expect(btn.getAttribute("title")).toMatch(/layers/i);
  });

  it("is understated and still a 44px touch target", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8") as string;
    expect(css).toMatch(/\.bar \.lv\s*\{[^}]*width:\s*44px[^}]*min-height:\s*44px/);
    // a flex item must not be squeezed below the target size on a phone
    expect(css).toMatch(/\.bar \.lv\s*\{[^}]*flex:\s*none/);
    expect(css).toMatch(/\.bar \.lv\[aria-pressed="true"\]/);
  });
});

describe("bar on a phone", () => {
  it("drops the DOC. index so the lockup, layers button, and menu fit in the bar", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8") as string;
    expect(css).toMatch(/@media \(max-width: 899px\)\s*\{[^@]*\.bar \.idx\s*\{\s*display:\s*none/);
  });
});
