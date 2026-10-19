import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer as a plate", () => {
  it("is a sheet: three ruled cells (mark, site navigation, contact) over the colophon row", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer")!;
    expect(footer.getAttribute("data-sheet")).toBe("Z-001");
    expect(footer.getAttribute("data-name")).toBe("COLOPHON");
    const cells = footer.querySelectorAll(".cells.c3 > .cell");
    expect(cells).toHaveLength(3);
    expect(cells[0].querySelector("svg")).not.toBeNull();
    expect(cells[1].tagName).toBe("NAV");
    expect(footer.querySelector(".colo")).not.toBeNull();
  });

  it("keeps the legal links and the copyright in the colophon row", () => {
    const { container } = render(<Footer />);
    const colo = container.querySelector(".colo")!;
    expect(colo.textContent).toMatch(/Privacy Policy/);
    expect(colo.textContent).toMatch(/Accessibility Statement/);
    expect(colo.textContent).toMatch(/Terms/);
    expect(colo.textContent).toMatch(/Jason Cook Design LLC/);
  });

  it("uses no tinted fill, radius, or shadow classes", () => {
    const { container } = render(<Footer />);
    const html = container.innerHTML;
    expect(html).not.toMatch(/bg-(surface|band|muted)|rounded|shadow/);
  });
});

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

describe("Footer content rules", () => {
  it("carries no prose: only the name, link labels, contact, and legal", () => {
    const { container } = render(<Footer />);
    expect(screen.getByText("Jason Cook Design")).toBeTruthy();
    expect(container.textContent).not.toContain("Systems architecture and implementation");
    const prose = Array.from(container.querySelectorAll("p")).filter(
      (p) => (p.textContent ?? "").trim().split(/\s+/).length > 5
    );
    expect(prose).toEqual([]);
  });
});
