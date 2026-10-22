/**
 * Button levels in use. The privacy notice pairs a secondary (Accept) with a tertiary (Decline), so a cookie
 * choice never competes with the page's primary action. Closing links back to an index are tertiary, and so is the
 * header's call to action, which leaves the hero button as the one primary on the home page.
 */
import { render, screen } from "@testing-library/react";
import PrivacyBanner from "@/components/layout/PrivacyBanner";
import Nav from "@/components/layout/Nav";
import { fireEvent } from "@testing-library/react";

describe("privacy notice buttons", () => {
  it("offers Accept as a secondary button and Decline as a tertiary one, and neither is a primary", () => {
    beforeEachConsent();
    render(<PrivacyBanner />);
    const accept = screen.getByRole("button", { name: "Accept" });
    const decline = screen.getByRole("button", { name: "Decline" });
    expect(accept.classList.contains("secondary")).toBe(true);
    expect(decline.classList.contains("tertiary")).toBe(true);
    for (const b of [accept, decline]) {
      expect(b.classList.contains("btn")).toBe(true);
      expect(b.classList.contains("ghost")).toBe(false);
    }
  });
});

function beforeEachConsent() {
  try { localStorage.clear(); } catch { /* storage unavailable */ }
}

describe("header call to action", () => {
  it("is a tertiary button, so the page keeps a single primary", () => {
    const { container } = render(<Nav />);
    const ctas = Array.from(container.querySelectorAll("a.btn")).filter((a) => a.textContent === "Start a conversation");
    expect(ctas.length).toBeGreaterThan(0);
    ctas.forEach((a) => {
      expect(a.classList.contains("tertiary")).toBe(true);
      expect(a.classList.contains("sm")).toBe(true);
    });
  });

  it("is a tertiary button in the mobile menu too", () => {
    const { container } = render(<Nav />);
    fireEvent.click(container.querySelector("button.menu-btn")!);
    const menuCta = container.querySelector("#mobile-menu a.menu-cta")!;
    expect(menuCta.classList.contains("tertiary")).toBe(true);
  });
});
