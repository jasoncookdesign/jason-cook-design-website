import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import ChooserPage from "@/app/engagements/page";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import { expectValidHeadingOrder } from "./helpers/headings";
import { hasFeeFigure } from "./helpers/prices";

const root = path.resolve(__dirname, "..");

function cardOf(el: Element) {
  return el.closest("div.rounded-\\[6px\\], article, li") as HTMLElement | null;
}

describe("Home page entry points (REQ-13)", () => {
  it("has a valid heading order with a single h1", () => {
    const { container } = render(<HomePage />);
    expectValidHeadingOrder(container);
  });

  it("keeps the operating entry card with its $2,500 price", () => {
    render(<HomePage />);
    const card = cardOf(screen.getByText(/\[ENTRY-OFFER-NAME\]/));
    expect(card).not.toBeNull();
    expect(card!.textContent).toContain("$2,500");
  });

  it("adds a second entry card that carries the price-pending token and no fee figure in any form", () => {
    render(<HomePage />);
    const tokens = screen.getAllByText(/\[GAP: Phase 0 price pending\]/);
    expect(tokens.length).toBeGreaterThan(0);
    for (const t of tokens) {
      const card = cardOf(t);
      expect(card).not.toBeNull();
      expect(hasFeeFigure(card!.textContent ?? "")).toBe(false);
      expect(card!.textContent).not.toContain("[ENTRY-OFFER-NAME]");
    }
  });

  it("lists the offering entry card before the operating one, in the pricing intro and the cards", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";
    const intro = text.indexOf("The Offering Engagement opens");
    expect(intro).toBeGreaterThan(-1);
    expect(intro).toBeLessThan(text.indexOf("The Operating Engagement opens"));
    const offeringCard = cardOf(screen.getAllByText(/\[GAP: Phase 0 price pending\]/)[0])!;
    const operatingCard = cardOf(screen.getByText(/\[ENTRY-OFFER-NAME\]/))!;
    expect(
      offeringCard.compareDocumentPosition(operatingCard) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("keeps the hero H1 and both strategy-call CTAs", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { name: /Get a working system that solves the problem you actually have/i })
    ).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /Book your strategy call/i }).length).toBeGreaterThanOrEqual(2);
  });

  it("scopes the method section with an eyebrow placed directly before its heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: /find the real problem first/i });
    const eyebrow = heading.previousElementSibling;
    expect(eyebrow).not.toBeNull();
    expect(eyebrow!.tagName).toBe("P");
    expect((eyebrow!.textContent ?? "").trim().length).toBeGreaterThan(5);
  });

  it("scopes the operating problem section with an eyebrow placed directly before its heading", () => {
    render(<OperatingPage />);
    const heading = screen.getByRole("heading", { name: /outgrown the systems you built/i });
    const eyebrow = heading.previousElementSibling;
    expect(eyebrow).not.toBeNull();
    expect(eyebrow!.tagName).toBe("P");
    expect((eyebrow!.textContent ?? "").trim().length).toBeGreaterThan(5);
  });
});

describe("INV-03: no page makes a universal first-step claim", () => {
  const pages: Array<[string, () => React.JSX.Element | null]> = [
    ["home", () => <HomePage />],
    ["chooser", () => <ChooserPage />],
    ["operating", () => <OperatingPage />],
    ["offering", () => <OfferingPage />],
  ];

  it.each(pages)("%s page", (_name, ui) => {
    const { container } = render(ui() as React.JSX.Element);
    expect(container.textContent).not.toMatch(/Every engagement opens the same way/i);
    expect(container.textContent).not.toMatch(/The first step costs/i);
    expect(container.textContent).not.toMatch(/(Both|All|Each) engagements? open the same way/i);
  });
});

describe("REQ-11: new source files are marked as drafts", () => {
  const files = [
    "lib/engagement-types.ts",
    "components/engagements/EngagementSelector.tsx",
    "app/engagements/layout.tsx",
    "components/home/EngagementFork.tsx",
    "components/home/Hero.tsx",
    "components/home/StartSection.tsx",
    "components/engagements/OperatingProblem.tsx",
    "components/engagements/offering/OfferingProblem.tsx",
    "components/home/PricingSection.tsx",
    "app/engagements/page.tsx",
    "app/engagements/operating/page.tsx",
    "app/work/page.tsx",
  ];

  it.each(files)("%s carries the DRAFT marker", (rel) => {
    expect(fs.readFileSync(path.join(root, rel), "utf8")).toContain("DRAFT — Jason to edit");
  });
});
