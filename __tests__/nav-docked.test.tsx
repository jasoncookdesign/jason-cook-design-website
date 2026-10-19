/**
 * Nav lockup and docked state. The header is one sticky element: it carries the mark
 * beside the wordmark, and compacts after scrolling so the nav and the primary action
 * stay available.
 */
import { render, screen, fireEvent, act } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    fireEvent.scroll(window);
  });
}

describe("Nav lockup and docked state", () => {
  beforeEach(() => scrollTo(0));

  it("shows the mark beside the visible wordmark, and keeps the brand text", () => {
    const { container } = render(<Nav />);
    const brand = screen.getByRole("link", { name: /jason cook design/i });
    expect(brand.querySelector("svg")).not.toBeNull();
    expect(brand.textContent).toMatch(/Jason Cook Design/);
    // the mark is decorative next to visible text
    expect(container.querySelector("a svg")!.getAttribute("aria-hidden")).toBe("true");
  });

  it("starts undocked", () => {
    render(<Nav />);
    expect(screen.getByRole("banner").getAttribute("data-docked")).toBe("false");
  });

  it("docks after scrolling past the threshold and undocks at the top", () => {
    render(<Nav />);
    scrollTo(200);
    expect(screen.getByRole("banner").getAttribute("data-docked")).toBe("true");
    scrollTo(0);
    expect(screen.getByRole("banner").getAttribute("data-docked")).toBe("false");
  });

  it("keeps the primary action and the main navigation while docked", () => {
    render(<Nav />);
    scrollTo(300);
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /start a conversation/i }).length).toBeGreaterThan(0);
  });
});
