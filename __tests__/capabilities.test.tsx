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
    expect(text()).toContain("Each case study documents a program across enterprise software, financial services, global consumer products, and regulated industries");
    expect(text()).toContain("The architectural approach runs the same way across every context. The deliverables differ.");
    expect(text()).toContain("For a new product or business line, the first phase assesses the decision itself.");
    expect(text()).not.toMatch(/eight/i);
  });

  it("lists the five disciplines, in order, as a definition list", () => {
    const { container } = render(<CapabilitiesPage />);
    const disciplines = container.querySelector("dl")!;
    const terms = Array.from(disciplines.querySelectorAll("dt")).map((dt) => dt.textContent?.trim());
    expect(terms).toEqual([
      "Research and diagnosis",
      "Architecture",
      "Specification",
      "Implementation",
      "Organizational capability",
    ]);
    const details = Array.from(disciplines.querySelectorAll("dd")).map((dd) => dd.textContent ?? "");
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

  it("carries no practice-name sheet and states the paid first step in plain wording", () => {
    render(<CapabilitiesPage />);
    expect(screen.queryByText("The discipline behind the work")).toBeNull();
    expect(text()).toContain("For institutional or government procurement inquiries, every engagement opens with a paid first step: a written recommendation before any design or build begins.");
  });

  it("gives institutional readers the company data, with the SAM.gov identifiers and status", () => {
    render(<CapabilitiesPage />);
    const heading = screen.getByRole("heading", { level: 2, name: "Company data" });
    const list = heading.closest("section")!.querySelector("dl")!;
    expect(list.tagName).toBe("DL");
    const rows = Array.from(list.querySelectorAll("dt")).map((dt) => [
      dt.textContent?.trim(),
      (dt.nextElementSibling?.textContent ?? "").trim(),
    ]);
    expect(rows).toEqual([
      ["Legal name", "Jason Cook Design LLC"],
      ["Structure", "Single-member limited liability company, Texas"],
      ["Formed", "November 15, 2024"],
      ["UEI", "QVJFVZEBQAL5"],
      ["CAGE code", "22J29"],
      ["NAICS codes", "541511, 541512, 541519, 541430, 541611, 541990"],
      ["SAM.gov registration", "Current"],
      ["Contact", "hello@jasoncookdesign.com"],
    ]);
    expect(screen.getAllByRole("link", { name: "hello@jasoncookdesign.com" })[0].getAttribute("href")).toBe(
      "mailto:hello@jasoncookdesign.com"
    );
  });

  it("drops the coming-soon placeholder and still links to the Work page", () => {
    render(<CapabilitiesPage />);
    expect(text()).not.toMatch(/coming soon/i);
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/work");
  });

  it("keeps the draft name candidates out of the rendered page", () => {
    render(<CapabilitiesPage />);
    for (const name of ["System Diagnostic", "Architecture Diagnostic", "Situational Diagnosis", "Problem Definition",
      "Organizational Diagnosis", "Operating Architecture", "Systems Architecture", "Structural Architecture",
      "Integrated Architecture", "Organizational Architecture"]) {
      expect(text()).not.toContain(name);
    }
    expect(text()).not.toMatch(/\[[A-Z-]{3,}\]/);
  });

  it("does not render generic marketing filler", () => {
    render(<CapabilitiesPage />);
    for (const phrase of [/world-class/i, /industry-leading/i, /innovative solutions/i,
      /passionate about/i, /let's work together/i, /unparalleled expertise/i]) {
      expect(text()).not.toMatch(phrase);
    }
  });
});
