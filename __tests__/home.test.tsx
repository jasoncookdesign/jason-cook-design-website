import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Home page", () => {
  it("renders the hero H1", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: /Get a working system that solves the problem you actually have/i,
      })
    ).toBeTruthy();
  });

  it("renders the hero eyebrow", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/For startups and midmarket operators outgrowing their systems/i)
    ).toBeTruthy();
  });

  it("renders the hero CTA button", () => {
    render(<HomePage />);
    // Both Hero and CtaSection render this CTA — page intentionally has two
    const ctaLinks = screen.getAllByRole("link", { name: /Book your strategy call/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it("renders the four problem cards", () => {
    render(<HomePage />);
    expect(screen.getByText(/The old way/i)).toBeTruthy();
    expect(screen.getByText(/The internal attempt/i)).toBeTruthy();
    expect(screen.getByText(/The search outside/i)).toBeTruthy();
    expect(screen.getByText(/The split/i)).toBeTruthy();
  });

  it("renders the [ENTRY-OFFER-NAME] token literally", () => {
    render(<HomePage />);
    // The token must appear verbatim — not substituted
    expect(screen.getByText(/\[ENTRY-OFFER-NAME\]/)).toBeTruthy();
  });

  it("renders the [FIT-PROOF] placeholder literally", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/\[FIT-PROOF — pending a real, consented case\]/)
    ).toBeTruthy();
  });

  it("renders the logo row companies", () => {
    render(<HomePage />);
    expect(screen.getByText(/Dell/i)).toBeTruthy();
    expect(screen.getByText(/Microsoft/i)).toBeTruthy();
  });

  it("renders both testimonials", () => {
    render(<HomePage />);
    expect(screen.getByText(/Chris Coen/i)).toBeTruthy();
    expect(screen.getByText(/Rajesh Balaraman/i)).toBeTruthy();
  });

  it("renders the pricing section with $2,500", () => {
    render(<HomePage />);
    // $2,500 appears in the section H2, the pricing card, and an FAQ trigger — any match confirms it
    const matches = screen.getAllByText(/\$2,500/);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders the FAQ section with expected questions", () => {
    render(<HomePage />);
    expect(screen.getByText(/What do I get for \$2,500/i)).toBeTruthy();
    expect(screen.getByText(/How long does it take/i)).toBeTruthy();
  });
});
