import { render } from "@testing-library/react";
import ChooserPage from "@/app/engagements/page";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import EngagementsLayout from "@/app/engagements/layout";

// The engagements pages in the concept's language: sheets, cells, ledger rows, the spec plate, the segmented
// selector. Copy is guarded by engagements.test.tsx and offering.test.tsx; this file guards the markup.

jest.mock("next/navigation", () => ({
  usePathname: () => "/engagements/offering",
}));

const OPERATING_SHEETS = ["HERO", "PROBLEM", "PHASES", "PORTABILITY", "PRICE", "CLOSE", "FAQ"];
const OFFERING_SHEETS = ["HERO", "PROBLEM", "PHASES", "PORTABILITY", "PRICE", "CLOSE"];

const pages: Array<[string, () => React.JSX.Element, string[]]> = [
  ["operating", () => <OperatingPage />, OPERATING_SHEETS],
  ["offering", () => <OfferingPage />, OFFERING_SHEETS],
  ["chooser", () => <ChooserPage />, OFFERING_SHEETS],
];

function sections(container: HTMLElement) {
  return Array.from(container.querySelectorAll("section")) as HTMLElement[];
}

describe("engagements sheets", () => {
  it.each(pages)("%s: every section is a numbered, named sheet in page order", (_n, ui, names) => {
    const { container } = render(ui());
    const secs = sections(container);
    expect(secs.map((s) => s.getAttribute("data-name"))).toEqual(names);
    expect(secs.map((s) => s.getAttribute("data-sheet"))).toEqual(
      names.map((_, i) => `A-${101 + i}`)
    );
  });

  it.each(pages)("%s: no old-design utility classes remain (rounded, shadow, fills, gradients, breakpoints)", (_n, ui) => {
    const { container } = render(<EngagementsLayout>{ui()}</EngagementsLayout>);
    // The shared accordion primitive belongs to the home builder; its restyle is guarded in the home tests.
    const bad = Array.from(container.querySelectorAll("[class]"))
      .filter((el) => !el.closest('[data-slot^="accordion"]'))
      // The hero wrappers pass the muted clause as a span with utility classes and are not editable here;
      // the hero stylesheet overrides it.
      .filter((el) => !el.matches(".hero h1 span"))
      .flatMap((el) => (el.getAttribute("class") ?? "").split(/\s+/))
      .filter((c) => /rounded|shadow|^bg-|gradient|^(sm|md|lg|xl):|^p[xy]?-\d|^text-(muted-foreground|ink|body)/.test(c));
    expect(bad).toEqual([]);
  });
});

describe("engagement selector", () => {
  it("is a segmented control of two links with the active one marked", () => {
    const { container } = render(<EngagementsLayout><div /></EngagementsLayout>);
    const nav = container.querySelector('nav[aria-label="Engagement type"]') as HTMLElement;
    expect(nav).not.toBeNull();
    expect(nav.classList.contains("seg")).toBe(true);
    const links = Array.from(nav.querySelectorAll("a"));
    expect(links).toHaveLength(2);
    expect(links.filter((a) => a.getAttribute("aria-current") === "page")).toHaveLength(1);
    for (const a of links) expect(a.querySelector(".lbl")).not.toBeNull();
  });
});

describe.each([
  ["operating", () => <OperatingPage />],
  ["offering", () => <OfferingPage />],
])("%s hero", (_n, ui) => {
  it("follows the home hero grammar: main column with the eyebrow, h1 and paragraphs; side column with the metric as a stat row", () => {
    const { container } = render(ui());
    const hero = sections(container)[0];
    expect(hero.classList.contains("hero")).toBe(true);
    expect(hero.classList.contains("g")).toBe(true);
    const main = hero.querySelector(":scope > .main") as HTMLElement;
    const side = hero.querySelector(":scope > .side") as HTMLElement;
    expect(main).not.toBeNull();
    expect(side).not.toBeNull();
    expect(main.querySelector("p")!.classList.contains("eyebrow")).toBe(true);
    expect(main.querySelectorAll("h1 ~ div > p")).toHaveLength(3);
    const metric = side.querySelector("[data-hero-metric]") as HTMLElement;
    expect(metric.classList.contains("statrow")).toBe(true);
    expect(metric.querySelector("[data-hero-metric-value]")).not.toBeNull();
    expect(metric.querySelector("[data-hero-metric-label]")).not.toBeNull();
    expect(hero.querySelector(".actions")).toBeNull();
  });
});

describe.each([
  ["operating", () => <OperatingPage />, ["01", "02", "03", "04"]],
  ["offering", () => <OfferingPage />, ["01", "02", "03", "04"]],
])("%s problem sheet", (_n, ui, keys) => {
  it("is an intro block over four ruled cells with a mono key, a title, and a paragraph", () => {
    const { container } = render(ui());
    const sheet = sections(container)[1];
    expect(sheet.querySelector(":scope > .intro.g > .t > p.eyebrow + h2")).not.toBeNull();
    const cells = Array.from(sheet.querySelectorAll(":scope > .cells > .cell"));
    expect(cells).toHaveLength(4);
    expect(sheet.querySelector(".cells")!.classList.contains("c2")).toBe(true);
    expect(cells.map((c) => c.querySelector(".idx")?.textContent)).toEqual(keys);
    for (const c of cells) {
      expect(c.querySelector("h3")!.textContent!.length).toBeGreaterThan(3);
      expect(c.querySelector("p")!.textContent!.length).toBeGreaterThan(40);
    }
  });
});

describe("phase sheets are ledger rows", () => {
  it("operating: one ordered list of five rows, each with a mono key, a title, and a 'what it leaves behind' pair", () => {
    const { container } = render(<OperatingPage />);
    const lists = container.querySelectorAll("ol");
    expect(lists).toHaveLength(1);
    expect(lists[0].classList.contains("rows")).toBe(true);
    const items = Array.from(lists[0].children) as HTMLElement[];
    expect(items).toHaveLength(5);
    expect(items.map((li) => li.querySelector(".k")?.textContent)).toEqual(["01", "02", "03", "04", "05"]);
    for (const li of items) {
      expect(li.classList.contains("row")).toBe(true);
      expect(li.classList.contains("hold")).toBe(true);
      expect(li.querySelector("h3")).not.toBeNull();
      expect(li.querySelector("dl.pair > dt")!.textContent).toBe("What it leaves behind");
    }
  });

  it("offering: one ordered list of six rows keyed 00 to 05, the optional one marked", () => {
    const { container } = render(<OfferingPage />);
    const lists = container.querySelectorAll("ol");
    expect(lists).toHaveLength(1);
    expect(lists[0].classList.contains("rows")).toBe(true);
    const items = Array.from(lists[0].children) as HTMLElement[];
    expect(items).toHaveLength(6);
    expect(items.map((li) => li.querySelector(".k")?.textContent)).toEqual(["00", "01", "02", "03", "04", "05"]);
    for (const li of items) {
      expect(li.classList.contains("row")).toBe(true);
      expect(li.classList.contains("hold")).toBe(true);
      expect(li.querySelector("dl.pair")).not.toBeNull();
    }
    expect(items[5].classList.contains("opt")).toBe(true);
    expect(items.slice(0, 5).some((li) => li.classList.contains("opt"))).toBe(false);
  });
});

describe("pricing sheets use the spec plate", () => {
  it("offering: the plate header carries the offer name and the price; two keyed rows follow", () => {
    const { container } = render(<OfferingPage />);
    const sheet = sections(container)[4];
    const plate = sheet.querySelector(".pl") as HTMLElement;
    expect(plate).not.toBeNull();
    const head = plate.querySelector(".pl-h") as HTMLElement;
    expect(head.textContent).toContain("Assess the decision");
    expect(head.textContent).toContain("$2,500");
    const rows = Array.from(plate.querySelectorAll(".sp"));
    expect(rows).toHaveLength(2);
    expect(rows.map((r) => r.querySelector(".l")?.textContent)).toEqual(["A", "B"]);
    expect(plate.querySelector(".regs")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("operating: the three ways to price are plate rows keyed by their own labels, and the terms are ledger rows", () => {
    const { container } = render(<OperatingPage />);
    const sheet = sections(container)[4];
    const rows = Array.from(sheet.querySelectorAll(".pl .sp"));
    expect(rows).toHaveLength(3);
    expect(rows.map((r) => r.querySelector(".k")!.textContent)).toEqual([
      expect.stringContaining("Set in advance"),
      expect.stringContaining("Quoted per phase"),
      expect.stringContaining("Monthly, if you want it"),
    ]);
    const terms = Array.from(sheet.querySelectorAll("ul.rows > li.row"));
    expect(terms).toHaveLength(5);
    expect(terms.map((t) => t.querySelector(".k")?.textContent)).toEqual(["01", "02", "03", "04", "05"]);
  });
});

describe("portability and close sheets", () => {
  it.each([
    ["operating", () => <OperatingPage />],
    ["offering", () => <OfferingPage />],
  ])("%s: the close sheet is a heading, the primary button, and the fixed subtext", (_n, ui) => {
    const { container } = render(ui());
    const secs = sections(container);
    const close = secs.find((s) => s.getAttribute("data-name") === "CLOSE") as HTMLElement;
    const btn = close.querySelector("a.btn") as HTMLAnchorElement;
    expect(btn.getAttribute("href")).toBe("/contact");
    expect(btn.textContent).toContain("Book your strategy call");
    expect(close.querySelector("h2")).not.toBeNull();
  });

  it("offering: the portability sheet is an intro over two ruled cells", () => {
    const { container } = render(<OfferingPage />);
    const sheet = sections(container)[3];
    expect(sheet.querySelector(":scope > .intro.g h2")).not.toBeNull();
    expect(sheet.querySelectorAll(":scope > .cells.c2 > .cell")).toHaveLength(2);
  });

  it("operating: the portability sheet is an intro over prose, with the home FAQ link kept", () => {
    const { container } = render(<OperatingPage />);
    const sheet = sections(container)[3];
    expect(sheet.querySelector(":scope > .intro.g > .t > p.eyebrow + h2")).not.toBeNull();
    const prose = sheet.querySelector(".prose") as HTMLElement;
    expect(prose.querySelectorAll("p").length).toBeGreaterThanOrEqual(4);
    expect(prose.querySelector('a[href="/#faq-11"]')).not.toBeNull();
  });
});

describe("operating FAQ sheet", () => {
  it("has an intro block and the shared accordion", () => {
    const { container } = render(<OperatingPage />);
    const sheet = sections(container)[6];
    expect(sheet.querySelector(":scope > .intro.g > .t > p.eyebrow + h2")).not.toBeNull();
    expect(sheet.querySelectorAll('[data-slot="accordion-trigger"]')).toHaveLength(6);
  });
});

describe("selector reads as interactive", () => {
  const { readFileSync } = jest.requireActual("fs") as typeof import("fs");
  const { join } = jest.requireActual("path") as typeof import("path");
  const patterns = readFileSync(join(process.cwd(), "app/blueprint-patterns.css"), "utf8");
  const globals = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  const tok = (n: string) => globals.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`))![1];
  const lum = (h: string) => {
    const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };

  it("fills the selected option with the secondary (steel blue) accent and keeps text readable on it", () => {
    expect(patterns).toMatch(/\.seg > \[aria-current\][^{]*\{[^}]*background:\s*var\(--accent\)/);
    expect(patterns).toMatch(/\.seg > \[aria-current\][^{]*\{[^}]*color:\s*var\(--bg\)/);
    const [a, b] = [lum(tok("accent")), lum(tok("bg"))].sort((x, y) => y - x);
    expect((a + 0.05) / (b + 0.05)).toBeGreaterThanOrEqual(4.5);
  });

  it("gives every option a radio-style indicator and the unselected ones a hover response", () => {
    expect(patterns).toMatch(/\.seg > \*::before/);
    expect(patterns).toMatch(/\.seg > \[aria-current\]::before/);
    expect(patterns).toMatch(/\.seg > \*:hover/);
  });
});
