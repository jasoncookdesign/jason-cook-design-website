import { render } from "@testing-library/react";
import HomePage from "@/app/page";
import { BOOKING_PATH } from "@/lib/booking";

const last = (c: HTMLElement) => Array.from(c.querySelectorAll("section")).pop() as HTMLElement;

describe("home page ends on a slim contact module", () => {
  it("is the last section, after the questions", () => {
    const { container } = render(<HomePage />);
    expect(last(container).getAttribute("data-name")).toBe("ASK");
    const names = Array.from(container.querySelectorAll("section")).map((s) => s.getAttribute("data-name"));
    expect(names.indexOf("ASK")).toBe(names.indexOf("FAQ") + 1);
  });

  it("invites more questions and offers the free 20-minute call, with a heading of its own", () => {
    const { container } = render(<HomePage />);
    const ask = last(container);
    expect(ask.querySelector("h2")!.textContent).toBe("Have a question that isn't here?");
    expect(ask.textContent).toMatch(/free 20-minute call/i);
  });

  it("links to the contact page with a secondary button", () => {
    const { container } = render(<HomePage />);
    const link = last(container).querySelector("a.btn.secondary")!;
    expect(link.getAttribute("href")).toBe(BOOKING_PATH);
    expect(link.textContent).toMatch(/Book a free 20-minute call/);
    expect(last(container).querySelectorAll("a.btn")).toHaveLength(1);
  });

  it("leaves the email address to the footer", () => {
    const { container } = render(<HomePage />);
    expect(last(container).querySelector('a[href^="mailto:"]')).toBeNull();
    expect(last(container).textContent).not.toMatch(/@/);
  });
});
