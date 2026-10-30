import { render, fireEvent, within } from "@testing-library/react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

const CHILDREN = [
  ["Offering Engagement", "/engagements/offering"],
  ["Operating Engagement", "/engagements/operating"],
  ["The first phase", "/engagements/first-phase"],
];
const pairs = (root: Element) => Array.from(root.querySelectorAll("a")).map((a) => [a.textContent, a.getAttribute("href")]);

describe("Engagements and its three children", () => {
  it("header: Engagements lands on the offering page, with the three children listed under it", () => {
    const { container } = render(<Nav />);
    const nav = container.querySelector('nav[aria-label="Main navigation"]')!;
    const item = Array.from(nav.querySelectorAll(":scope > ul > li")).find((li) => li.querySelector(":scope > a")?.textContent === "Engagements")!;
    expect(item.querySelector(":scope > a")!.getAttribute("href")).toBe("/engagements/offering");
    expect(pairs(item.querySelector(":scope > ul")!)).toEqual(CHILDREN);
  });

  it("header: the other items have no children", () => {
    const { container } = render(<Nav />);
    const nav = container.querySelector('nav[aria-label="Main navigation"]')!;
    const withKids = Array.from(nav.querySelectorAll(":scope > ul > li")).filter((li) => li.querySelector(":scope > ul"));
    expect(withKids).toHaveLength(1);
  });

  it("mobile menu: the children follow Engagements, in order, and close the menu when used", () => {
    const { container, queryByRole } = render(<Nav />);
    fireEvent.click(container.querySelector("button.menu-btn")!);
    const menu = container.querySelector("#mobile-menu")!;
    const all = pairs(menu).map(([t]) => t);
    const at = all.indexOf("Engagements");
    expect(all.slice(at, at + 4)).toEqual(["Engagements", ...CHILDREN.map(([t]) => t)]);
    expect(within(menu as HTMLElement).getByRole("link", { name: "Engagements" }).getAttribute("href")).toBe("/engagements/offering");
    fireEvent.click(within(menu as HTMLElement).getByRole("link", { name: "The first phase" }));
    expect(queryByRole("navigation", { name: /Mobile navigation/i })).toBeNull();
  });

  it("footer: repeats the pattern, with the same three children under Engagements", () => {
    const { container } = render(<Footer />);
    const nav = container.querySelector('nav[aria-label="Footer navigation"]')!;
    const item = Array.from(nav.querySelectorAll(":scope > ul > li")).find((li) => li.querySelector(":scope > a")?.textContent === "Engagements")!;
    expect(item.querySelector(":scope > a")!.getAttribute("href")).toBe("/engagements/offering");
    expect(pairs(item.querySelector(":scope > ul")!)).toEqual(CHILDREN);
  });
});
