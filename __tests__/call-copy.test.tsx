/**
 * The strategy call: a free 20-minute fit and ethics check. Visitors are told it is free, what it is, and what they
 * get from it (they are listened to, then sent a summary of how, and whether, Jason can help). What they find out
 * about what they need is the paid diagnosis, so no copy promises it from the call.
 */
import { render, fireEvent, screen } from "@testing-library/react";
import { readFileSync } from "fs";
import { join } from "path";
import FaqSection from "@/components/home/FaqSection";
import PricingSection from "@/components/home/PricingSection";

const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");

describe("home FAQ answers the call question first", () => {
  it("opens the list with what happens on the strategy call, and the count in the eyebrow matches the list", () => {
    const { container } = render(<FaqSection />);
    const triggers = Array.from(container.querySelectorAll("button, [role=button]")).filter((b) => /\?/.test(b.textContent ?? ""));
    expect(triggers[0].textContent).toMatch(/What happens on the strategy call\?/);
    expect(container.querySelector("h2")!.textContent).toBe("Questions");
    expect(container.querySelector("h2")!.previousElementSibling!.textContent).toBe("Thirteen answered here, plus a way to ask yours");
    expect(triggers).toHaveLength(13);
  });

  it("says it is free, twenty minutes, a fit and ethics check, and that a summary follows", () => {
    const { container } = render(<FaqSection />);
    fireEvent.click(screen.getByText(/What happens on the strategy call\?/));
    const text = container.textContent!.replace(/\s+/g, " ");
    expect(text).toMatch(/twenty minutes/i);
    expect(text).toMatch(/free/i);
    expect(text).toMatch(/fit and ethics/i);
    expect(text).toMatch(/summary of how, and whether, I can help/i);
  });

  it("keeps the existing anchors the engagements page links to", () => {
    const { container } = render(<FaqSection />);
    expect(container.querySelector("#faq-11")).not.toBeNull();
  });
});

describe("pricing section", () => {
  it("says the call before the diagnosis is free", () => {
    const { container } = render(<PricingSection />);
    expect(container.querySelector(".notes")!.textContent).toMatch(/free 20-minute call/i);
  });
});

describe("contact page metadata", () => {
  it("describes the call as free", () => {
    const src = read("app/contact/page.tsx");
    expect(src).toMatch(/Free, 20 minutes, no commitment/);
    expect(src).not.toMatch(/No commitment, 20 minutes/);
  });
});
