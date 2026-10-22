/**
 * Button levels in use. The privacy notice pairs a secondary (Accept) with a tertiary (Decline), so a cookie
 * choice never competes with the page's primary action. Closing links back to an index are tertiary.
 */
import { render, screen } from "@testing-library/react";
import PrivacyBanner from "@/components/layout/PrivacyBanner";

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
