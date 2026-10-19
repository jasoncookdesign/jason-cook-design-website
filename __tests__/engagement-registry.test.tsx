import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import ChooserPage from "@/app/engagements/page";
import OfferingPage from "@/app/engagements/offering/page";
import EngagementsLayout from "@/app/engagements/layout";
import { engagementTypes } from "@/lib/engagement-types";
import { expectValidHeadingOrder } from "./helpers/headings";
import { accessibleName, isExposed } from "./helpers/exposed";

let mockPathname: string | null = null;
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

const root = path.resolve(__dirname, "..");

function typeLinks(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLAnchorElement>("a")).filter((a) =>
    (a.getAttribute("href") ?? "").startsWith("/engagements/")
  );
}

function renderIn(page: React.JSX.Element, pathname: string | null) {
  mockPathname = pathname;
  return render(<EngagementsLayout>{page}</EngagementsLayout>);
}

describe("INV-01: registry, routes, selector, and fork agree", () => {
  it("lists the offering type before the operating type", () => {
    expect(engagementTypes.map((t) => t.slug)).toEqual(["offering", "operating"]);
  });

  it("has a page file for every registry slug", () => {
    for (const t of engagementTypes) {
      expect(fs.existsSync(path.join(root, "app", "engagements", t.slug, "page.tsx"))).toBe(true);
    }
  });

  it("selector offers one reachable, named link per type, in registry order, and no cards", () => {
    const { container } = renderIn(<div />, "/engagements/offering");
    const links = typeLinks(container);
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      engagementTypes.map((t) => `/engagements/${t.slug}`)
    );
    for (const a of links) {
      expect(isExposed(a)).toBe(true);
      expect(accessibleName(a).length).toBeGreaterThanOrEqual(3);
    }
    expect(container.querySelectorAll("article")).toHaveLength(0);
  });

  it("selector names each type and shows its situation", () => {
    const { container } = renderIn(<div />, "/engagements/offering");
    const links = typeLinks(container);
    engagementTypes.forEach((t, i) => {
      expect(links[i].textContent).toContain(t.name);
      expect(links[i].textContent).toContain(t.situation);
    });
  });

  it.each([
    ["/engagements/operating", "operating"],
    ["/engagements/offering", "offering"],
    ["/engagements", "offering"],
    [null, "offering"],
  ])("marks exactly the active type for %s", (pathname, active) => {
    const { container } = renderIn(<div />, pathname);
    const current = typeLinks(container).filter((a) => a.getAttribute("aria-current") === "page");
    expect(current.map((a) => a.getAttribute("href"))).toEqual([`/engagements/${active}`]);
  });

  it("/engagements shows the first type's page under the selector, with one h1 and a valid heading order", () => {
    const chooser = renderIn(<ChooserPage />, "/engagements");
    expectValidHeadingOrder(chooser.container);
    const h1 = screen.getByRole("heading", { level: 1 }).textContent;
    chooser.unmount();
    const offering = renderIn(<OfferingPage />, "/engagements/offering");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(h1);
    offering.unmount();
  });

  it("home fork links to both types, offering first, as rows rather than cards, ahead of the problem section", () => {
    const { container } = render(<HomePage />);
    const links = typeLinks(container);
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      engagementTypes.map((t) => `/engagements/${t.slug}`)
    );
    engagementTypes.forEach((t, i) => {
      expect(isExposed(links[i])).toBe(true);
      expect(links[i].textContent).toContain(t.situation);
      expect(links[i].closest("article")).toBeNull();
      // The home fork stays short: the fit and arc sentences live on the engagements page.
      expect(links[i].textContent).not.toContain(t.fit);
      expect(links[i].textContent).not.toContain(t.arcSummary);
    });
    const problem = screen.getAllByText("The old way")[0];
    expect(links[1].compareDocumentPosition(problem) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
