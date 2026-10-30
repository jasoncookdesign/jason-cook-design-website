import { render } from "@testing-library/react";
import EngagementsLayout from "@/app/engagements/layout";
import FirstPhasePage from "@/app/engagements/first-phase/page";
import SamplePage from "@/app/engagements/sample/page";
import AboutPage from "@/app/about/page";
import CapabilitiesPage from "@/app/capabilities/page";
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
