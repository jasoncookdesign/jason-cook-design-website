import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

describe("About page", () => {
  it("renders the About h1 heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: /About/i })).toBeTruthy();
  });

  it("renders verified facts (name, entity, role)", () => {
    render(<AboutPage />);
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/Jason Cook/);
    expect(text).toMatch(/Jason Cook Design LLC/);
    expect(text).toMatch(/Texas/);
  });

  it("renders the pending-content placeholder — invention ban marker must be present", () => {
    render(<AboutPage />);
    // This text must be visible (not just a JSX comment) so it's a regression guard
    // against someone silently filling the page with invented copy
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/more about the practice is coming soon/i);
  });

  it("does not render invented marketing copy or persuasive narrative bio", () => {
    render(<AboutPage />);
    const text = document.body.textContent ?? "";
    // These patterns would indicate invented copy — none should appear
    expect(text).not.toMatch(/passionate about/i);
    expect(text).not.toMatch(/thought leader/i);
    expect(text).not.toMatch(/world-class/i);
    expect(text).not.toMatch(/industry-leading/i);
    expect(text).not.toMatch(/innovative solutions/i);
    expect(text).not.toMatch(/help you achieve/i);
    expect(text).not.toMatch(/let's work together/i);
  });
});
