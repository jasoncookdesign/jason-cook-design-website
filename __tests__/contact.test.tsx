import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

// next/navigation is mocked in tests — redirect() becomes a no-op
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Contact page", () => {
  it("renders the Contact h1 heading", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  });

  it("renders the decided CTA text verbatim", () => {
    render(<ContactPage />);
    // Verbatim, already-approved copy — do not edit
    expect(screen.getByRole("link", { name: /Book your strategy call/i })).toBeTruthy();
  });

  it("CTA links to the cal.com booking URL", () => {
    render(<ContactPage />);
    const link = screen.getByRole("link", { name: /Book your strategy call/i });
    expect(link.getAttribute("href")).toMatch(
      /cal\.com\/jasoncookdesign\/engagement-consultation/
    );
  });

  it("renders the decided CTA subtext verbatim", () => {
    render(<ContactPage />);
    // Verbatim, already-approved copy — do not edit
    expect(
      screen.getByText(/No commitment\. 20 minutes\. Find out what you need/i)
    ).toBeTruthy();
  });

  it("does not contain invented contact-page copy beyond the decided content", () => {
    render(<ContactPage />);
    const text = document.body.textContent ?? "";
    // No extra invented claims or marketing copy
    expect(text).not.toMatch(/Let's make something amazing/i);
    expect(text).not.toMatch(/Get in touch today/i);
    expect(text).not.toMatch(/Together we can/i);
  });
});
