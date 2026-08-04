import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders all footer nav links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /^Work$/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Engagements/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Writing/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /About/i })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /Capabilities and institutional work/i })
    ).toBeTruthy();
  });

  it("renders the contact email", () => {
    render(<Footer />);
    expect(screen.getByText(/hello@jasoncookdesign\.com/i)).toBeTruthy();
  });

  it("renders legal links and copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/Privacy Policy/i)).toBeTruthy();
    expect(screen.getByText(/Accessibility Statement/i)).toBeTruthy();
    expect(screen.getByText(/Terms/i)).toBeTruthy();
    expect(screen.getByText(/Jason Cook Design LLC/i)).toBeTruthy();
  });
});
