/**
 * SheetFrame: the page is one bordered sheet. Twelve dashed column guides and four registration
 * marks sit behind the content; all of it is decorative and inert.
 */
import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import SheetFrame from "@/components/layout/SheetFrame";

describe("SheetFrame", () => {
  it("renders its children inside the frame", () => {
    render(<SheetFrame><p>content</p></SheetFrame>);
    expect(screen.getByText("content").closest(".frame")).not.toBeNull();
  });

  it("draws twelve column guides and four registration marks, hidden from assistive technology", () => {
    const { container } = render(<SheetFrame><p>x</p></SheetFrame>);
    const guides = container.querySelector('[data-guides]')!;
    expect(guides.getAttribute("aria-hidden")).toBe("true");
    expect(guides.querySelectorAll("i")).toHaveLength(12);
    const regs = container.querySelector('[data-regs]')!;
    expect(regs.getAttribute("aria-hidden")).toBe("true");
    expect(regs.querySelectorAll("i")).toHaveLength(4);
  });

  it("puts the decoration before the content so it paints behind it", () => {
    const { container } = render(<SheetFrame><p>x</p></SheetFrame>);
    const frame = container.querySelector(".frame")!;
    const kids = Array.from(frame.children);
    expect(kids.findIndex((n) => n.hasAttribute("data-guides"))).toBeLessThan(kids.findIndex((n) => n.tagName === "P"));
  });

  it("is used by the root layout around the nav, main, and footer", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(src).toMatch(/<SheetFrame>[\s\S]*<Nav \/>[\s\S]*<main[\s\S]*<Footer \/>[\s\S]*<\/SheetFrame>/);
  });
});
