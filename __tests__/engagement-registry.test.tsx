import fs from "fs";
import path from "path";
import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";
import ChooserPage from "@/app/engagements/page";
import { engagementTypes } from "@/lib/engagement-types";
import { expectValidHeadingOrder } from "./helpers/headings";
import { accessibleName, isExposed } from "./helpers/exposed";

const root = path.resolve(__dirname, "..");

function typeLinks(container: HTMLElement, slug: string) {
  return Array.from(container.querySelectorAll<HTMLAnchorElement>(`a[href="/engagements/${slug}"]`));
}

/** A card is the <article> around a type link. Name, fit, and arc summary are each the whole text of their own element. */
function cardFor(container: HTMLElement, slug: string) {
  const link = typeLinks(container, slug)[0];
  expect(link).toBeDefined();
  const card = link.closest("article") as HTMLElement | null;
  expect(card).not.toBeNull();
  return { link, card: card! };
}

function expectCardContent(card: HTMLElement, t: (typeof engagementTypes)[number]) {
  const h2 = within(card).getByRole("heading", { level: 2, name: t.situation });
  expect(isExposed(h2)).toBe(true);
  expect(card.querySelectorAll("h2")).toHaveLength(1);
  for (const text of [t.name, t.fit, t.arcSummary]) {
    const el = within(card).getByText(text);
    expect(isExposed(el)).toBe(true);
  }
}

describe("INV-01: registry, routes, and cards agree", () => {
  it("has a page file for every registry slug", () => {
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) {
      expect(fs.existsSync(path.join(root, "app", "engagements", t.slug, "page.tsx"))).toBe(true);
    }
  });

  it("chooser renders one card per type, each with one reachable, named link to its page", () => {
    const { container } = render(<ChooserPage />);
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) {
      const links = typeLinks(container, t.slug);
      expect(links).toHaveLength(1);
      expect(isExposed(links[0])).toBe(true);
      expect(accessibleName(links[0]).length).toBeGreaterThanOrEqual(3);
    }
    const allTypeLinks = Array.from(container.querySelectorAll("a")).filter((a) =>
      (a.getAttribute("href") ?? "").startsWith("/engagements/")
    );
    expect(allTypeLinks).toHaveLength(2);
    expect(container.querySelectorAll("article")).toHaveLength(2);
  });

  it("chooser cards carry the situation as a visible h2, the name, the fit sentence, and the arc summary", () => {
    const { container } = render(<ChooserPage />);
    expect(engagementTypes).toHaveLength(2);
    for (const t of engagementTypes) expectCardContent(cardFor(container, t.slug).card, t);
  });

  it("chooser has a valid heading order, one h1, and a real headline", () => {
    const { container } = render(<ChooserPage />);
    expectValidHeadingOrder(container);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent!.trim().split(/\s+/).length).toBeGreaterThanOrEqual(3);
  });

  it("home fork renders the same card component, ahead of the problem section", () => {
    const chooser = render(<ChooserPage />);
    const chooserHtml = engagementTypes.map((t) => cardFor(chooser.container, t.slug).card.innerHTML);
    chooser.unmount();

    const { container } = render(<HomePage />);
    const problem = screen.getAllByText("The old way")[0];
    expect(engagementTypes).toHaveLength(2);
    engagementTypes.forEach((t, i) => {
      const { link, card } = cardFor(container, t.slug);
      expect(isExposed(link)).toBe(true);
      expect(link.compareDocumentPosition(problem) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expectCardContent(card, t);
      expect(card.innerHTML).toBe(chooserHtml[i]);
    });
  });
});
