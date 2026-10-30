import { render } from "@testing-library/react";
import EngagementsLayout from "@/app/engagements/layout";
import FirstPhasePage from "@/app/engagements/first-phase/page";
import SamplePage from "@/app/engagements/sample/page";
import AboutPage from "@/app/about/page";
import CapabilitiesPage from "@/app/capabilities/page";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import { PHASE_ZERO } from "@/lib/phase-zero";
import { engagementTypes } from "@/lib/engagement-types";

let mockPathname: string | null = null;
jest.mock("next/navigation", () => ({ usePathname: () => mockPathname }));

const FIRST_PHASE = "/engagements/first-phase";

describe("the first phase page sits outside both engagement types", () => {
  it.each([FIRST_PHASE, "/engagements/sample"])("%s shows no engagement-type selector", (pathname) => {
    mockPathname = pathname;
    const { container } = render(<EngagementsLayout><div /></EngagementsLayout>);
    expect(container.querySelector('nav[aria-label="Engagement type"]')).toBeNull();
  });

  it("states what the page is in its h1", () => {
    const { container } = render(<FirstPhasePage />);
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent).toBe("The first phase");
  });

  it("links out to both engagement types in the section just before the closing call to action", () => {
    const { container } = render(<FirstPhasePage />);
    const sections = Array.from(container.querySelectorAll("section"));
    const close = sections[sections.length - 1];
    expect(close.className).toContain("eng-close");
    const before = sections[sections.length - 2];
    const hrefs = Array.from(before.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(engagementTypes.map((t) => `/engagements/${t.slug}`));
  });
});

describe("inbound links to the first phase page", () => {
  it.each([
    ["the sample page", () => <SamplePage />],
    ["the About page", () => <AboutPage />],
    ["the Capabilities page", () => <CapabilitiesPage />],
  ])("%s links to it", (_name, page) => {
    const { container } = render(page());
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => (a.getAttribute("href") ?? "").split("#")[0]);
    expect(hrefs).toContain(FIRST_PHASE);
  });
});

describe("both engagement pages describe Phase 0 and point to the sample", () => {
  it.each([
    ["operating", () => <OperatingPage />],
    ["offering", () => <OfferingPage />],
  ])("%s: the first phase row links to the sample page", (_slug, page) => {
    const { container } = render(page());
    const first = container.querySelector("ol.rows > li")!;
    expect(first.querySelector(".k")!.textContent).toBe("00");
    expect(first.querySelector('a[href="/engagements/sample"]')).not.toBeNull();
    expect(container.querySelectorAll('ol.rows a[href="/engagements/sample"]')).toHaveLength(1);
  });
});

describe("Phase 0 reads the same on both engagement types, with a different focus", () => {
  const row = (page: React.JSX.Element) => render(page).container.querySelector("ol.rows > li")!;
  it("shares one process text and differs in the focus sentence", () => {
    const op = row(<OperatingPage />).textContent!;
    const off = row(<OfferingPage />).textContent!;
    expect(op).toContain(PHASE_ZERO.process);
    expect(off).toContain(PHASE_ZERO.process);
    expect(op).toContain(PHASE_ZERO.focus.operating);
    expect(off).toContain(PHASE_ZERO.focus.offering);
    expect(op).not.toContain(PHASE_ZERO.focus.offering);
    expect(off).not.toContain(PHASE_ZERO.focus.operating);
  });

  it.each([
    ["operating", () => <OperatingPage />],
    ["offering", () => <OfferingPage />],
  ])("%s: the sample is reachable from the phase list and from the pricing section", (_slug, page) => {
    const { container } = render(page());
    const inRows = container.querySelectorAll('ol.rows a[href="/engagements/sample"]');
    const price = container.querySelector('section[data-name="PRICE"]')!;
    expect(inRows).toHaveLength(1);
    expect(price.querySelector('a[href="/engagements/sample"]')).not.toBeNull();
  });
});

describe("phase headings are titles only; the key column carries the number", () => {
  it.each([
    ["operating", () => <OperatingPage />],
    ["offering", () => <OfferingPage />],
  ])("%s: no phase heading spells out its number", (_slug, page) => {
    const { container } = render(page());
    const titles = Array.from(container.querySelectorAll("ol.rows > li h3")).map((h) => h.textContent!.trim());
    expect(titles).toHaveLength(6);
    for (const t of titles) expect(t).not.toMatch(/^(zero|one|two|three|four|five|six)\b/i);
  });
});

describe("the sample page title", () => {
  it("names the page without repeating the fictional-client note the lead carries", () => {
    const { container } = render(<SamplePage />);
    expect(container.querySelector("h1")!.textContent).toBe("A sample first-phase report");
    expect(container.querySelector("h1 + div .lead")!.textContent).toMatch(/fictional client/);
  });
});
