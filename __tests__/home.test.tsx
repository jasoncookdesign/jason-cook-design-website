import { fireEvent, render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

function operatingPlateName(): HTMLElement {
  const el = Array.from(document.querySelectorAll<HTMLElement>(".pl-h p")).find((p) => p.textContent === "Operating Engagement");
  if (!el) throw new Error("Operating plate heading not found");
  return el;
}

describe("Home page pricing plate", () => {
  it("shows the entry offer as a spec plate: its name and price in the plate header, not a padded card", () => {
    const { container } = render(<HomePage />);
    const entryNameEl = operatingPlateName();
    const plate = entryNameEl.closest(".pl");
    expect(plate).not.toBeNull();
    const head = entryNameEl.closest(".pl-h");
    expect(head).not.toBeNull();
    expect(head?.textContent).toContain("$2,500");
    expect(plate?.querySelectorAll(".sp").length).toBeGreaterThanOrEqual(2);
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

  it("renders a type-neutral hero eyebrow in place of the operating-only one", () => {
    const { container } = render(<HomePage />);
    expect(
      screen.queryByText(/For startups and midmarket operators outgrowing their systems/i)
    ).toBeNull();
    const eyebrow = container.querySelector("section p");
    expect((eyebrow?.textContent ?? "").trim().length).toBeGreaterThan(10);
  });

  it("renders the hero CTA button", () => {
    render(<HomePage />);
    // Both Hero and CtaSection render this CTA — page intentionally has two
    const ctaLinks = screen.getAllByRole("link", { name: /Book your strategy call/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it("renders the shared method in three steps, without the operating-only problem cards", () => {
    const { container } = render(<HomePage />);
    expect(screen.getByRole("heading", { name: /find the real problem first/i })).toBeTruthy();
    for (const label of ["Find the real problem", "Design and build", "Hand it over"]) {
      // the first step also titles FIG. 1, so look for the step headings, not any text
      expect(screen.getByRole("heading", { level: 3, name: label })).toBeTruthy();
    }
    expect(container.textContent).not.toMatch(/The old way|The internal attempt|The search outside|outgrown the systems you built/);
  });

  it("carries no [ENTRY-OFFER-NAME] token", () => {
    render(<HomePage />);
    expect(screen.queryByText(/\[ENTRY-OFFER-NAME\]/)).toBeNull();
  });

  it("omits the anonymized discovery case until a real testimonial exists", () => {
    const { container } = render(<HomePage />);
    const text = container.textContent ?? "";
    expect(text).not.toContain("From a discovery engagement");
    expect(text).not.toContain("Deciding what the cloud is allowed to see");
    expect(text).not.toContain("unbilled pilot");
    // The range proof now opens the proof section.
    expect(screen.getByText("Where the method came from")).toBeTruthy();
    expect(screen.getByText(/Work I.ve done at enterprise scale/)).toBeTruthy();
  });

  it("renders the logo row companies", () => {
    render(<HomePage />);
    // Logos are Image components — query by alt text
    expect(screen.getByAltText(/^Dell$/i)).toBeTruthy();
    expect(screen.getByAltText(/^Microsoft$/i)).toBeTruthy();
    // AWS now has an SVG asset and must render as an image, not a text span
    expect(screen.getByAltText(/^AWS$/i)).toBeTruthy();
  });

  it("sets the brand logos in the kit's logo strip, all ten, with no utility sizing classes", () => {
    const { container } = render(<HomePage />);
    const logos = container.querySelectorAll(".logos [data-brand]");
    expect(logos).toHaveLength(10);
    expect(container.querySelectorAll("[data-brand]")).toHaveLength(10);
    const dell = screen.getByAltText(/^Dell$/i);
    expect(dell.closest(".logos")).not.toBeNull();
    expect(dell.className).not.toMatch(/\b(h-\d+|lg:h-\d+|opacity-\d+)\b/);
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

  it("says in the $2,500 answer that the fee is credited against the next phase on the same standing terms", () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText(/What do I get for \$2,500/i));
    const text = document.body.textContent ?? "";
    expect(text).toContain("credited in full against Discovery and Architecture");
    expect(text).toContain("applied automatically on your first invoice");
    expect(text).toContain("as long as my quote for that phase is valid");
    expect(text).toContain("no cash value");
  });
});
