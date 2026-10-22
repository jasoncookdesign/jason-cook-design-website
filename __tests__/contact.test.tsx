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

  it("CTA scrolls to the booking embed on this page", () => {
    render(<ContactPage />);
    const link = screen.getByRole("link", { name: /Book your strategy call/i });
    expect(link.getAttribute("href")).toBe("#book");
  });

  it("renders the decided CTA subtext verbatim", () => {
    render(<ContactPage />);
    // Copy changed 2026-10-22 on the owner's say-so: the strip describes the free intro call (fit and ethics check, then a
    // summary), not what the paid diagnosis delivers. The sentence is set as two lines (mono, then italic), so read across both.
    const strip = Array.from(document.querySelectorAll("p")).find((p) =>
      (p.textContent ?? "").startsWith("Free.")
    );
    expect((strip?.textContent ?? "").replace(/\s+/g, " ")).toMatch(
      /^Free\. 20 minutes\. No commitment\. I.ll listen first, then send you a summary of how, and whether, I can help\.$/
    );
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
