import { render, screen } from "@testing-library/react";
import CapabilitiesPage from "@/app/capabilities/page";

const text = () => (document.body.textContent ?? "").replace(/\s+/g, " ");

describe("Capabilities page", () => {
  it("keeps the eyebrow and the Capabilities h1", () => {
    render(<CapabilitiesPage />);
    expect(screen.getByText("Capabilities and institutional work")).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: "Capabilities" })).toBeTruthy();
  });

  it("opens with the institutional intro", () => {
    render(<CapabilitiesPage />);
    expect(text()).toContain("Eight case studies. Each one documents a program across enterprise software, financial services, global consumer products, and regulated industries");
    expect(text()).toContain("The architectural approach runs the same way across all eight contexts. The deliverables differ.");
  });

  it("lists the five disciplines, in order, as a definition list", () => {
    const { container } = render(<CapabilitiesPage />);
    const terms = Array.from(container.querySelectorAll("dl dt")).map((dt) => dt.textContent?.trim());
    expect(terms).toEqual([
      "Research and diagnosis",
      "Architecture",
      "Specification",
      "Implementation",
      "Organizational capability",
    ]);
    const details = Array.from(container.querySelectorAll("dl dd")).map((dd) => dd.textContent ?? "");
    expect(details[2]).toContain("Technical specifications written to be built from — by me, by the client's team, or by another provider.");
    expect(details[4]).toContain("makes owner capability a deliverable rather than a courtesy");
  });

  it("speaks for the practice in the first person singular", () => {
    render(<CapabilitiesPage />);
    expect(text()).not.toContain("by my team");
  });

  it("lists the outcomes on the record, with no unresolved gaps", () => {
    render(<CapabilitiesPage />);
    expect(screen.getByRole("heading", { level: 2, name: "Outcomes on the record" })).toBeTruthy();
    for (const line of [
      "At Dell, a unified contact-center redesign produced a 20% reduction in chat pollution and a 300 basis-point improvement in customer satisfaction.",
      "At Millennium Systems International, the platform has earned 40 industry awards.",
      "At Banco Azteca, the constraint wasn't staffing",
    ]) expect(text()).toContain(line);
    expect(text()).not.toContain("[GAP");
  });

  it("keeps the practice-name and entry-offer tokens literal", () => {
    render(<CapabilitiesPage />);
    expect(screen.getByRole("heading", { level: 2, name: "[PRACTICE-NAME]" })).toBeTruthy();
    expect(text()).toContain("The discipline behind all eight programs is [PRACTICE-NAME]");
    expect(text()).toContain("[ENTRY-OFFER-NAME] is the paid first step");
  });

  it("drops the coming-soon placeholder and still links to the Work page", () => {
    render(<CapabilitiesPage />);
    expect(text()).not.toMatch(/coming soon/i);
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/work");
  });

  it("does not render generic marketing filler", () => {
    render(<CapabilitiesPage />);
    for (const phrase of [/world-class/i, /industry-leading/i, /innovative solutions/i,
      /passionate about/i, /let's work together/i, /unparalleled expertise/i]) {
      expect(text()).not.toMatch(phrase);
    }
  });
});
