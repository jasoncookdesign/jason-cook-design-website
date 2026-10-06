import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Home page responsive layout", () => {
  it("pricing entry card uses responsive padding sm:p-10, not a flat p-10 that cramps 375px viewports", () => {
    const { container } = render(<HomePage />);
    // The pricing card contains the [ENTRY-OFFER-NAME] token and the $2,500 price
    const entryNameEl = screen.getByText(/\[ENTRY-OFFER-NAME\]/);
    // Walk up to find the card (has border-ink class)
    let card: Element | null = entryNameEl;
    while (card && !card.className.includes("border-ink")) {
      card = card.parentElement;
    }
    expect(card).not.toBeNull();
    // After fix: should have sm:p-10 (responsive), not just p-10 (fixed)
    expect(card?.className).toMatch(/sm:p-10/);
    void container;
  });
});

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

  it("shows no fit-proof slot while no consented case exists, and the range proof still renders", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).not.toContain("[FIT-PROOF");
    expect(screen.getByText("Where the method came from")).toBeTruthy();
  });

  it("renders the logo row companies", () => {
    render(<HomePage />);
    // Logos are Image components — query by alt text
    expect(screen.getByAltText(/^Dell$/i)).toBeTruthy();
    expect(screen.getByAltText(/^Microsoft$/i)).toBeTruthy();
    // AWS now has an SVG asset and must render as an image, not a text span
    expect(screen.getByAltText(/^AWS$/i)).toBeTruthy();
  });

  it("brand logos are sized at h-11 base and lg:h-16 at the largest breakpoint", () => {
    render(<HomePage />);
    // Dell is the first logo in the row; its img element must carry the base
    // height class (h-11) for smaller viewports and the responsive override
    // (lg:h-16) for the site's largest defined breakpoint (~64px / ~50% larger).
    const dell = screen.getByAltText(/^Dell$/i);
    expect(dell.className).toMatch(/\bh-11\b/);
    expect(dell.className).not.toMatch(/\bh-7\b/);
    expect(dell.className).toMatch(/\blg:h-16\b/);
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
