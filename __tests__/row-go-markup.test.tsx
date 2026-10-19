import { render } from "@testing-library/react";
import EngagementFork from "@/components/home/EngagementFork";

// The row's action square draws its arrow in CSS, so the span carries no text for a screen reader or a copy-paste.
it("the home fork's action squares are empty, decorative spans", () => {
  const { container } = render(<EngagementFork />);
  const gos = container.querySelectorAll("a.row .go");
  expect(gos.length).toBeGreaterThan(0);
  gos.forEach((g) => {
    expect(g.textContent).toBe("");
    expect(g.getAttribute("aria-hidden")).toBe("true");
  });
});
