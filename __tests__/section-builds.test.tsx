/**
 * Section builds. A block that scrolls into view fades in (RevealOnScroll adds .in), and the animations inside it
 * start then, after a 350 ms lead so the fade is not covering the opening of the build: drawn shapes (the Gantt
 * figure) run on entry instead of on page load, and containers marked data-build step their children in with a
 * short stagger. Transform and opacity only; nothing is hidden without JavaScript, under reduced motion, or with
 * the layer view on.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));
import RevealOnScroll from "@/components/layout/RevealOnScroll";
import HomePage from "@/app/page";
import WorkPage from "@/app/work/page";
import WritingPage from "@/app/writing/page";
import PhaseArc from "@/components/engagements/PhaseArc";
import OperatingProblem from "@/components/engagements/OperatingProblem";
import EngagementPricing from "@/components/engagements/EngagementPricing";
import EngagementsFaq from "@/components/engagements/EngagementsFaq";
import OfferingPhases from "@/components/engagements/offering/OfferingPhases";
import OfferingProblem from "@/components/engagements/offering/OfferingProblem";
import OfferingPortability from "@/components/engagements/offering/OfferingPortability";

const css = ["app/blueprint.css", "app/blueprint-motion.css"].map((f) => readFileSync(join(process.cwd(), f), "utf8")).join("\n");
const GATE = "html\\.js:not\\(\\.rm\\):not\\(\\.layers\\)";

describe("build timing in the stylesheet", () => {
  it("defines a 350 ms lead for anything inside a block that reveals on scroll, and no lead elsewhere", () => {
    expect(css).toMatch(new RegExp(`${GATE} \\.rv\\s*\\{[^}]*--rv-lead:\\s*350ms`));
    expect(css).not.toMatch(/:root\s*\{[^}]*--rv-lead/);
  });

  it("holds the Gantt figure's drawn shapes until their block has entered, then runs them after the lead", () => {
    expect(css).toMatch(new RegExp(`${GATE} \\.rv:not\\(\\.in\\) :is\\(\\.bx, ?\\.dec\\)\\s*\\{[^}]*animation-play-state:\\s*paused`));
    expect(css).toMatch(/\.bx\{[^}]*animation-delay:\s*calc\(var\(--rv-lead,\s*0s\)\s*\+\s*var\(--d,\s*0s\)\)/);
    expect(css).toMatch(/\.dec\{[^}]*animation:[^;}]*calc\(var\(--rv-lead,\s*0s\)\s*\+\s*\.6s\)/);
  });

  it("steps the children of a data-build container in, 60 ms apart, after the lead", () => {
    expect(css).toMatch(/@keyframes build-in\s*\{\s*from\s*\{\s*opacity:\s*0;\s*transform:\s*translateY\(\d+px\);?\s*\}\s*\}/);
    const r = css.match(new RegExp(`${GATE} \\.rv\\.in \\[data-build\\] > \\*, ${GATE} \\.rv\\.in\\[data-build\\] > \\*\\s*\\{([^}]*)\\}`));
    expect(r).not.toBeNull();
    expect(r![1]).toMatch(/animation:\s*build-in\s+\.5s\s+var\(--ease\)\s+backwards/);
    expect(r![1]).toMatch(/animation-delay:\s*calc\(var\(--rv-lead\)\s*\+\s*var\(--i,\s*0\)\s*\*\s*60ms\)/);
  });

  it("keeps the children hidden until their block has entered, and never hides anything the gate excludes", () => {
    expect(css).toMatch(new RegExp(`${GATE} \\.rv:not\\(\\.in\\) \\[data-build\\] > \\*, ${GATE} \\.rv\\[data-build\\]:not\\(\\.in\\) > \\*\\s*\\{[^}]*opacity:\\s*0`));
    const builds = css.match(/[^}]*build-in[^}]*\}/g) ?? [];
    builds.forEach((b) => expect(b).not.toMatch(/(width|height|top|left|margin|padding)\s*:/));
  });
});

describe("RevealOnScroll numbers the children of data-build containers", () => {
  beforeEach(() => {
    document.documentElement.className = "js";
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    document.body.innerHTML = `<main><section><div class="rows" data-build>${"<a></a>".repeat(10)}</div><div class="other"><a></a><a></a></div></section></main>`;
  });

  it("sets --i in order, stopping at 7 so a long list never makes the last item wait", () => {
    render(<RevealOnScroll />);
    const kids = Array.from(document.querySelectorAll("[data-build] > *")) as HTMLElement[];
    expect(kids.map((k) => k.style.getPropertyValue("--i"))).toEqual(["0", "1", "2", "3", "4", "5", "6", "7", "7", "7"]);
  });

  it("leaves containers that are not marked alone", () => {
    render(<RevealOnScroll />);
    document.querySelectorAll(".other > *").forEach((k) => expect((k as HTMLElement).style.getPropertyValue("--i")).toBe(""));
  });

  it("numbers the children even under reduced motion, so turning motion back on needs no reload", () => {
    document.documentElement.className = "js rm";
    render(<RevealOnScroll />);
    expect((document.querySelector("[data-build] > *:nth-child(3)") as HTMLElement).style.getPropertyValue("--i")).toBe("2");
  });
});

describe("which sections build", () => {
  const has = (container: HTMLElement, sel: string) => {
    const el = container.querySelector(sel);
    expect(el).not.toBeNull();
    expect(el!.hasAttribute("data-build")).toBe(true);
  };

  it("builds the home page: the Gantt figure, solution cards, engagement rows, delivery cells, logos, quotes, pricing plates and FAQ", () => {
    const { container } = render(<HomePage />);
    has(container, 'figure.sheet');
    has(container, '[data-name="START"] .cells');
    has(container, '[data-name="FORK"] .rows');
    has(container, '[data-name="DELIVERY"] .cells');
    has(container, '[data-name="PROOF"] .logos');
    has(container, '[data-name="PROOF"] .quotes');
    has(container, '[data-name="PRICE"] .plates');
    has(container, '[data-name="FAQ"] .faq');
  });

  it("builds the Work and Writing lists", () => {
    has(render(<WorkPage />).container, ".rows");
    has(render(<WritingPage />).container, ".rows");
  });

  it("builds the engagement pages: phases, problem cards, pricing, portability statements and FAQ", () => {
    has(render(<PhaseArc />).container, "ol.rows");
    has(render(<OperatingProblem />).container, ".cells");
    has(render(<EngagementPricing />).container, ".plate .pl");
    has(render(<EngagementsFaq />).container, ".faq");
    has(render(<OfferingPhases />).container, "ol.rows");
    has(render(<OfferingProblem />).container, ".cells");
    has(render(<EngagementPricing />).container, ".plate .pl");
  });
});
