import fs from "fs";
import path from "path";
import { render } from "@testing-library/react";
import HomePage from "@/app/page";
import CapabilitiesPage from "@/app/capabilities/page";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import WorkCaseStudyContent from "@/components/work/WorkCaseStudyContent";
import { caseStudies } from "@/lib/work";

jest.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: jest.fn() }) }));

// Numbers appear only where the thing is a numbered list: steps in a method, phases of an engagement, figures a
// reader is pointed to. Keys on alternatives, questions, outcomes, and terms are decoration, and so are the sheet
// codes in each section's corner. The bar's section cue keeps the sheet codes. See the rubric's G2 numbering rule.

const digitsOnly = (el: Element | null | undefined) => /^\s*\d+\s*$/.test(el?.textContent ?? "");
const sheet = (c: HTMLElement, name: string) => c.querySelector(`[data-name="${name}"]`) as HTMLElement;

describe("home page", () => {
  it("the engagement fork rows carry no numeric key", () => {
    const { container } = render(<HomePage />);
    const rows = sheet(container, "FORK").querySelectorAll("a.row");
    expect(rows.length).toBe(2);
    rows.forEach((r) => expect(r.querySelector(".k")).toBeNull());
  });

  it("the two delivery options carry no numeric index", () => {
    const { container } = render(<HomePage />);
    const idx = Array.from(sheet(container, "DELIVERY").querySelectorAll(".idx"));
    expect(idx.filter(digitsOnly)).toHaveLength(0);
  });

  it("the FAQ triggers carry no number key", () => {
    const { container } = render(<HomePage />);
    const triggers = sheet(container, "FAQ").querySelectorAll(".faq-trigger");
    expect(triggers.length).toBeGreaterThan(5);
    triggers.forEach((t) => expect(t.querySelector(".k")).toBeNull());
  });

  it("the three method steps keep their numbers, because they are steps", () => {
    const { container } = render(<HomePage />);
    const idx = Array.from(sheet(container, "START").querySelectorAll(".cells.c3 > article.cell .idx")).map((e) => e.textContent);
    expect(idx).toEqual(["01", "02", "03"]);
  });
});

describe("capabilities page", () => {
  it("has no numeric eyebrows and no numeric keys on the outcomes", () => {
    const { container } = render(<CapabilitiesPage />);
    expect(Array.from(container.querySelectorAll(".eyebrow")).filter(digitsOnly)).toHaveLength(0);
    expect(Array.from(container.querySelectorAll("ul.rows .k")).filter(digitsOnly)).toHaveLength(0);
  });
});

describe.each([
  ["operating", () => <OperatingPage />],
  ["offering", () => <OfferingPage />],
])("%s engagement page", (_n, ui) => {
  it("the problem cells and the pricing keys carry no numbers", () => {
    const { container } = render(ui());
    expect(Array.from(container.querySelectorAll('[data-name="PROBLEM"] .idx')).filter(digitsOnly)).toHaveLength(0);
    expect(Array.from(container.querySelectorAll('[data-name="PRICE"] .k, [data-name="PRICE"] .l')).filter(digitsOnly)).toHaveLength(0);
  });

  it("the phases keep their numbers, because they are in order", () => {
    const { container } = render(ui());
    expect(Array.from(container.querySelectorAll('[data-name="PHASES"] ol.rows .k')).filter(digitsOnly).length).toBeGreaterThanOrEqual(4);
  });
});

describe("case study", () => {
  it("body sections carry no numeric eyebrow", () => {
    const { container } = render(<WorkCaseStudyContent cs={caseStudies[0]} />);
    expect(Array.from(container.querySelectorAll(".intro .eyebrow")).filter(digitsOnly)).toHaveLength(0);
  });
});

describe("stylesheets", () => {
  const dir = path.join(process.cwd(), "app");
  const css = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".css"))
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8"))
    .join("\n");

  it("generate no numbers: no zero-padded counters and no sheet code in each section's corner", () => {
    expect(css).not.toMatch(/decimal-leading-zero/);
    expect(css).not.toMatch(/main section(\[data-sheet\])?::before\s*\{[^}]*content:/);
  });
});
