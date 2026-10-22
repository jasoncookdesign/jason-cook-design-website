import { render } from "@testing-library/react";
import HomePage from "@/app/page";
import EngagementsPage from "@/app/engagements/page";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import ContactPage from "@/app/contact/page";

// The CTA subtext is a fixed string: every instance carries all of it. It describes the free intro call (a fit and
// ethics check that ends with a summary), not what the paid diagnosis delivers.
const FIXED = "Free. 20 minutes. No commitment. I'll listen first, then send you a summary of how, and whether, I can help.";

const normalize = (s: string) => s.replace(/\s+/g, " ").replace(/’/g, "'").trim();

function ctaSubtexts(container: HTMLElement) {
  return Array.from(container.querySelectorAll("p"))
    .map((p) => {
      // A <br /> is a visual line break inside the sentence, so it reads as a space.
      const copy = p.cloneNode(true) as HTMLElement;
      copy.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
      return normalize(copy.textContent ?? "");
    })
    .filter((t) => t.startsWith("Free."));
}

describe.each([
  ["Home", HomePage],
  ["Engagements chooser", EngagementsPage],
  ["Operating Engagement", OperatingPage],
  ["Offering Engagement", OfferingPage],
  ["Contact", ContactPage],
])("%s page CTA subtext", (_name, Page) => {
  it("renders the full fixed subtext on every instance", () => {
    const { container } = render(<Page />);
    const found = ctaSubtexts(container);
    expect(found.length).toBeGreaterThan(0);
    for (const text of found) expect(text).toBe(FIXED);
  });
});

import { readFileSync } from "fs";
import { join } from "path";

describe("the call strip has one source", () => {
  const files = [
    "components/home/Hero.tsx",
    "components/home/CtaSection.tsx",
    "components/engagements/EngagementsClose.tsx",
    "components/engagements/offering/OfferingClose.tsx",
    "app/contact/page.tsx",
  ];
  it.each(files)("%s uses the shared CallStrip, not its own copy of the words", (f) => {
    const src = readFileSync(join(process.cwd(), f), "utf8");
    expect(src).toMatch(/<CallStrip\s*\/>/);
    expect(src).not.toMatch(/No commitment/);
    expect(src).not.toMatch(/Find out what you need/);
  });

  it("does not promise what the paid diagnosis delivers", () => {
    const src = readFileSync(join(process.cwd(), "lib/booking.ts"), "utf8");
    expect(src).not.toMatch(/Find out what you need/);
  });
});
