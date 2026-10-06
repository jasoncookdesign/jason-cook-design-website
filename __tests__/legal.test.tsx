import { render, screen } from "@testing-library/react";
import LegalPage from "@/app/legal/page";
import Footer from "@/components/layout/Footer";

const sections = [
  { id: "privacy", heading: "Privacy Policy" },
  { id: "accessibility", heading: "Accessibility Statement" },
  { id: "terms", heading: "Terms" },
];

describe("Legal page", () => {
  it("is one page headed Legal", () => {
    render(<LegalPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Legal" })).toBeTruthy();
  });

  it.each(sections)("has an anchored $heading section holding its placeholder until text is supplied", ({ id, heading }) => {
    const { container } = render(<LegalPage />);
    const section = container.querySelector(`section#${id}`) as HTMLElement;
    expect(section).not.toBeNull();
    expect(section.querySelector("h2")?.textContent).toBe(heading);
    expect(section.textContent).toContain(`[LEGAL: ${heading} text pending]`);
  });

  it.each(sections)("exposes $heading as a named region landmark", ({ heading }) => {
    render(<LegalPage />);
    expect(screen.getByRole("region", { name: heading })).toBeTruthy();
  });
});

describe("Footer legal links", () => {
  it.each(sections)("links $heading to its section on the legal page", ({ id, heading }) => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: heading }).getAttribute("href")).toBe(`/legal#${id}`);
  });
});
