import { render, screen, fireEvent, within } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

describe("Nav", () => {
  it("renders the brand name", () => {
    render(<Nav />);
    expect(screen.getByText(/Jason Cook Design/i)).toBeTruthy();
  });

  it("renders all five main nav links in the desktop nav", () => {
    render(<Nav />);
    const desktopNav = screen.getByRole("navigation", { name: /Main navigation/i });
    expect(within(desktopNav).getByRole("link", { name: /Home/i })).toBeTruthy();
    expect(within(desktopNav).getByRole("link", { name: /Work/i })).toBeTruthy();
    expect(within(desktopNav).getByRole("link", { name: /Engagements/i })).toBeTruthy();
    expect(within(desktopNav).getByRole("link", { name: /Writing/i })).toBeTruthy();
    expect(within(desktopNav).getByRole("link", { name: /About/i })).toBeTruthy();
  });

  it("renders the CTA button linking to cal.com", () => {
    render(<Nav />);
    // The desktop CTA is always in the DOM; getAllByRole handles the case
    // where the mobile menu CTA is also present.
    const ctas = screen.getAllByRole("link", { name: /Start a conversation/i });
    expect(ctas.length).toBeGreaterThanOrEqual(1);
    expect((ctas[0] as HTMLAnchorElement).href).toContain("cal.com");
  });
});

describe("Nav - hamburger menu", () => {
  it("renders a toggle button with aria-label 'Open menu' and aria-expanded false when closed", () => {
    render(<Nav />);
    const btn = screen.getByRole("button", { name: /Open menu/i });
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("sets aria-expanded to true and aria-label to 'Close menu' when opened", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const btn = screen.getByRole("button", { name: /Close menu/i });
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("reverts aria-label and aria-expanded when toggled closed again", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    fireEvent.click(screen.getByRole("button", { name: /Close menu/i }));
    const btn = screen.getByRole("button", { name: /Open menu/i });
    expect(btn).toBeTruthy();
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("shows the mobile nav panel containing all five links when opened", () => {
    render(<Nav />);
    expect(screen.queryByRole("navigation", { name: /Mobile navigation/i })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });
    expect(within(mobileNav).getByRole("link", { name: /Home/i })).toBeTruthy();
    expect(within(mobileNav).getByRole("link", { name: /Work/i })).toBeTruthy();
    expect(within(mobileNav).getByRole("link", { name: /Engagements/i })).toBeTruthy();
    expect(within(mobileNav).getByRole("link", { name: /Writing/i })).toBeTruthy();
    expect(within(mobileNav).getByRole("link", { name: /About/i })).toBeTruthy();
  });

  it("includes the CTA in the mobile menu linking to cal.com", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });
    const cta = within(mobileNav).getByRole("link", { name: /Start a conversation/i });
    expect(cta).toBeTruthy();
    expect((cta as HTMLAnchorElement).href).toContain("cal.com");
  });

  it("closes the menu when a mobile nav link is clicked", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });
    fireEvent.click(within(mobileNav).getByRole("link", { name: /Home/i }));
    expect(screen.queryByRole("navigation", { name: /Mobile navigation/i })).toBeNull();
    expect(screen.getByRole("button", { name: /Open menu/i })).toBeTruthy();
  });

  it("closes the menu when the mobile CTA is clicked", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });
    fireEvent.click(within(mobileNav).getByRole("link", { name: /Start a conversation/i }));
    expect(screen.queryByRole("navigation", { name: /Mobile navigation/i })).toBeNull();
  });

  it("closes the menu when Escape is pressed", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    expect(screen.getByRole("navigation", { name: /Mobile navigation/i })).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: /Mobile navigation/i })).toBeNull();
  });

  it("does not close the menu on non-Escape keydown", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    fireEvent.keyDown(document, { key: "Enter" });
    expect(screen.getByRole("navigation", { name: /Mobile navigation/i })).toBeTruthy();
  });
});
