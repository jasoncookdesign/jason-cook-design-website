import { render } from "@testing-library/react";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import { engagementTypes } from "@/lib/engagement-types";

// The two pages are alternate views behind one selector, so their heroes must match in layout
// and in what each element describes.
function hero(ui: React.JSX.Element) {
  const { container } = render(ui);
  return container.querySelector("section") as HTMLElement;
}

/** Tags and classes only, so two heroes with different words but one layout compare equal. */
function skeleton(el: Element): string {
  const kids = Array.from(el.children).map(skeleton).join("");
  return `<${el.tagName.toLowerCase()} class="${el.getAttribute("class") ?? ""}">${kids}</${el.tagName.toLowerCase()}>`;
}

const pages: Array<[string, string, () => React.JSX.Element]> = [
  ["operating", "Operating Engagement", () => <OperatingPage />],
  ["offering", "Offering Engagement", () => <OfferingPage />],
];

describe("engagement heroes are structurally parallel", () => {
  it("covers both registry types", () => {
    expect(pages.map(([slug]) => slug).sort()).toEqual(engagementTypes.map((t) => t.slug).sort());
  });

  it.each(pages)("%s hero: eyebrow is the type name", (_slug, name, ui) => {
    const eyebrow = hero(ui()).querySelector("p");
    expect((eyebrow?.textContent ?? "").trim()).toBe(name);
  });

  it.each(pages)("%s hero: one h1, three body paragraphs, and a metric with a number and a label", (_slug, _name, ui) => {
    const h = hero(ui());
    expect(h.querySelectorAll("h1")).toHaveLength(1);
    const body = h.querySelectorAll("h1 ~ div > p");
    expect(body).toHaveLength(3);
    const metric = h.querySelector("[data-hero-metric]");
    expect(metric).not.toBeNull();
    expect(metric!.querySelector("[data-hero-metric-value]")!.textContent!.trim()).toMatch(/^\d+$/);
    expect(metric!.querySelector("[data-hero-metric-label]")!.textContent!.trim().length).toBeGreaterThan(10);
  });

  it("the two heroes share one skeleton", () => {
    const [a, b] = pages.map(([, , ui]) => {
      const h = hero(ui());
      const sk = skeleton(h);
      document.body.innerHTML = "";
      return sk;
    });
    expect(a).toBe(b);
  });

  const listedPhases: Array<[string, () => React.JSX.Element, (c: HTMLElement) => number]> = [
    ["operating", () => <OperatingPage />, (c) => c.querySelectorAll("ol > li").length],
    ["offering", () => <OfferingPage />, (c) => c.querySelectorAll("ol > li").length],
  ];

  it.each(listedPhases)("%s: the metric counts the phases the page actually lists", (_slug, ui, count) => {
    const { container } = render(ui());
    const n = Number(container.querySelector("[data-hero-metric-value]")!.textContent);
    expect(count(container)).toBeGreaterThan(0);
    expect(count(container)).toBe(n);
  });
});
