import { render } from "@testing-library/react";
import HomePage from "@/app/page";
import EngagementsPage from "@/app/engagements/page";
import ContactPage from "@/app/contact/page";

// The CTA subtext is a fixed string: every instance carries all of it.
const FIXED = "No commitment. 20 minutes. Find out what you need — and what you don't.";

const normalize = (s: string) => s.replace(/\s+/g, " ").replace(/’/g, "'").trim();

function ctaSubtexts(container: HTMLElement) {
  return Array.from(container.querySelectorAll("p"))
    .map((p) => {
      // A <br /> is a visual line break inside the sentence, so it reads as a space.
      const copy = p.cloneNode(true) as HTMLElement;
      copy.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
      return normalize(copy.textContent ?? "");
    })
    .filter((t) => t.startsWith("No commitment."));
}

describe.each([
  ["Home", HomePage],
  ["Engagements", EngagementsPage],
  ["Contact", ContactPage],
])("%s page CTA subtext", (_name, Page) => {
  it("renders the full fixed subtext on every instance", () => {
    const { container } = render(<Page />);
    const found = ctaSubtexts(container);
    expect(found.length).toBeGreaterThan(0);
    for (const text of found) expect(text).toBe(FIXED);
  });
});
