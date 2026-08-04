import { render, screen } from "@testing-library/react";
import CapabilitiesPage from "@/app/capabilities/page";

describe("Capabilities page", () => {
  it("renders the Capabilities h1 heading", () => {
    render(<CapabilitiesPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Capabilities/i })
    ).toBeTruthy();
  });

  it("renders the pending-content placeholder — invention ban marker must be present", () => {
    render(<CapabilitiesPage />);
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/more detail on institutional engagements is coming soon/i);
  });

  it("renders a link to the Work page case studies (institutional framing)", () => {
    render(<CapabilitiesPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href") ?? "");
    expect(hrefs.some((h) => h === "/work" || h.startsWith("/work"))).toBe(true);
  });

  it("does not render invented marketing copy or capability claims", () => {
    render(<CapabilitiesPage />);
    const text = document.body.textContent ?? "";
    // These patterns would indicate invented copy
    expect(text).not.toMatch(/world-class/i);
    expect(text).not.toMatch(/industry-leading/i);
    expect(text).not.toMatch(/innovative solutions/i);
    expect(text).not.toMatch(/passionate about/i);
    expect(text).not.toMatch(/let's work together/i);
    expect(text).not.toMatch(/unparalleled expertise/i);
  });

  it("references the 8 enterprise cases (without duplicating case study content)", () => {
    render(<CapabilitiesPage />);
    const text = document.body.textContent ?? "";
    // Should mention enterprise cases / work page, not duplicate all 8 case details
    expect(text).toMatch(/case studi/i);
  });
});
