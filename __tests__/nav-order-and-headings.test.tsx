/**
 * Menu order and page headings. The menu reads Home, Engagements, Work, Writing, About, in the header and the mobile
 * menu (the footer's site list follows the same order). A page's eyebrow is dropped when it only repeats the h1, and
 * the h1 stays where it would be with the eyebrow: the space the eyebrow took is kept, so the title sits at the same
 * height on every page.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render, fireEvent } from "@testing-library/react";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import WorkPage from "@/app/work/page";
import WritingPage from "@/app/writing/page";
import CapabilitiesPage from "@/app/capabilities/page";
import LegalPage from "@/app/legal/page";
import HomePage from "@/app/page";

const ORDER = ["Home", "Engagements", "Work", "Writing", "About"];
const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");

describe("menu order", () => {
  it("lists Home, Engagements, Work, Writing, About in the header", () => {
    const { container } = render(<Nav />);
    const links = Array.from(container.querySelectorAll("header nav > ul > li > a")).map((a) => a.textContent);
    expect(links).toEqual(ORDER);
  });

  it("lists them in the same order in the mobile menu", () => {
    const { container } = render(<Nav />);
    fireEvent.click(container.querySelector("button.menu-btn")!);
    const links = Array.from(container.querySelectorAll("#mobile-menu a")).map((a) => a.textContent).filter((t) => ORDER.includes(t!));
    expect(links).toEqual(ORDER);
  });

  it("lists the footer's site links in the same order, with Capabilities last", () => {
    const { container } = render(<Footer />);
    const links = Array.from(container.querySelectorAll('nav[aria-label="Footer navigation"] > ul > li > a')).map((a) => a.textContent);
    expect(links.slice(0, 4)).toEqual(["Engagements", "Work", "Writing", "About"]);
    expect(links[4]).toMatch(/^Capabilities/);
  });
});

describe("eyebrows that only repeat the h1", () => {
  const pages: [string, () => React.JSX.Element][] = [
    ["About", AboutPage],
    ["Contact", ContactPage],
    ["Work", WorkPage],
    ["Writing", WritingPage],
    ["Capabilities", CapabilitiesPage],
    ["Legal", LegalPage],
    ["Home", HomePage],
  ];

  it.each(pages)("%s page: no eyebrow says exactly what the h1 says", (_n, Page) => {
    const { container } = render(<Page />);
    const h1 = container.querySelector("h1")!;
    const eyebrow = h1.previousElementSibling?.classList.contains("eyebrow") ? h1.previousElementSibling : null;
    if (eyebrow) expect(eyebrow.textContent!.trim().toLowerCase()).not.toBe(h1.textContent!.trim().toLowerCase());
  });

  it("keeps the eyebrow where it adds something (Capabilities)", () => {
    const { container } = render(<CapabilitiesPage />);
    expect(container.querySelector("h1")!.previousElementSibling!.textContent).toMatch(/institutional/i);
  });
});

describe("h1 position", () => {
  const blueprint = read("app/blueprint.css");
  const content = read("app/bp-content.css");

  it("defines the eyebrow's height once, from its own font size and line height", () => {
    expect(blueprint).toMatch(/:root\s*\{[^}]*--eyebrow-h:\s*calc\(12px \* 1\.4\)/);
    expect(blueprint).toMatch(/\.eyebrow\{[^}]*font:\s*500 12px\/1\.4/);
  });

  it("keeps the space of a missing eyebrow above an h1 that has none, matching the gap of the pages that have one", () => {
    const gap = Number(content.match(/\.hero\.page h1\s*\{\s*margin-top:\s*(\d+)px/)![1]);
    const m = content.match(/\.hero\.page > \.main > h1:first-child\s*\{\s*margin-top:\s*calc\(var\(--eyebrow-h\) \+ (\d+)px\)/);
    expect(m).not.toBeNull();
    expect(Number(m![1])).toBe(gap);
  });

  it("no longer pulls an eyebrow-less title up to the top of the hero", () => {
    expect(content).not.toMatch(/\.hero\.page > \.main > h1:first-child\s*\{\s*margin-top:\s*0/);
  });

  it("removes the eyebrow from the four pages whose eyebrow repeated the title", () => {
    for (const f of ["app/about/page.tsx", "app/contact/page.tsx", "app/work/page.tsx", "app/writing/page.tsx"]) {
      expect(read(f)).not.toMatch(/<p className="eyebrow">/);
    }
  });

  it("gives the contact page's hero the same top padding as every other page, so its title does not sit lower", () => {
    const rules = [...content.matchAll(/\.hero\.page\.solo\s*\{([^}]*)\}/g)].map((m) => m[1]);
    expect(rules.length).toBeGreaterThan(0);
    rules.forEach((r) => {
      expect(r).toMatch(/padding-bottom:/);
      expect(r).not.toMatch(/padding:/);
      expect(r).not.toMatch(/padding-top:/);
    });
  });
});
