/**
 * Mouse-interaction affordance tests.
 *
 * Every interactive element must have a visible hover class (hover:*) in its
 * className.  These tests verify that requirement at the rendered-DOM level.
 * They are written test-first: they fail on the current code and pass only
 * after each component receives its hover state.
 *
 * cursor-pointer tests added 2026-09-09: Tailwind v4 Preflight does NOT
 * include `button { cursor: pointer }` (dropped from v4).  Native <button>
 * elements therefore default to `cursor: default` (the arrow) in this
 * codebase.  Each interactive button must carry an explicit `cursor-pointer`
 * Tailwind class.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "@/components/layout/Nav";
import FaqSection from "@/components/home/FaqSection";
import EngagementsFaq from "@/components/engagements/EngagementsFaq";
import { Button } from "@/components/ui/button";
import fs from "fs";
import path from "path";

// The top bar is styled by the blueprint kit, so its hover feedback is a CSS rule, not a hover: utility class.
const kitCss =
  fs.readFileSync(path.join(process.cwd(), "app/blueprint.css"), "utf8") +
  fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");


// ---------------------------------------------------------------------------
// Nav — logo link and hamburger button
// ---------------------------------------------------------------------------
describe("Nav — mouse affordance", () => {
  it("logo/brand link is the kit's .wordmark and the kit gives it a hover rule", () => {
    const { container } = render(<Nav />);
    const brandLink = container.querySelector('a[href="/"]') as HTMLAnchorElement | null;
    expect(brandLink).not.toBeNull();
    expect(brandLink!.classList.contains("wordmark")).toBe(true);
    expect(kitCss).toMatch(/\.wordmark:hover\s*\{/);
  });

  it("menu button is kit-styled and the kit gives it a hover rule", () => {
    render(<Nav />);
    const hamburger = screen.getByRole("button", { name: /Open menu/i });
    expect(hamburger.classList.contains("menu-btn")).toBe(true);
    expect(kitCss).toMatch(/\.menu-btn:hover\s*\{/);
  });
});

// ---------------------------------------------------------------------------
// AccordionTrigger — both FAQ sections share the same component
// ---------------------------------------------------------------------------
describe("FaqSection accordion — mouse affordance", () => {
  it("accordion trigger buttons have a hover: class for visual feedback", () => {
    const { container } = render(<FaqSection />);
    const trigger = container.querySelector('[data-slot="accordion-trigger"]') as HTMLElement | null;
    expect(trigger).not.toBeNull();
    expect(trigger!.className).toMatch(/hover:/);
  });
});

describe("EngagementsFaq accordion — mouse affordance", () => {
  it("accordion trigger buttons have a hover: class for visual feedback", () => {
    const { container } = render(<EngagementsFaq />);
    const trigger = container.querySelector('[data-slot="accordion-trigger"]') as HTMLElement | null;
    expect(trigger).not.toBeNull();
    expect(trigger!.className).toMatch(/hover:/);
  });
});

// ---------------------------------------------------------------------------
// Nav — desktop nav links (already have hover; confirm it isn't broken)
// ---------------------------------------------------------------------------
describe("Nav desktop links — mouse affordance (regression)", () => {
  it("all five desktop nav links are kit-styled and the kit gives them a hover rule", () => {
    const { container } = render(<Nav />);
    expect(container.querySelectorAll(".nav ul a")).toHaveLength(5);
    expect(kitCss).toMatch(/\.nav a:hover\s*\{/);
  });
});

// ---------------------------------------------------------------------------
// Nav mobile links — the panel is kit-styled and its links have a hover rule
// ---------------------------------------------------------------------------
describe("Nav mobile links — mouse affordance (regression)", () => {
  it("mobile nav links are inside the kit's .menu and have a hover rule when the panel is open", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });
    expect(mobileNav.closest(".menu")).not.toBeNull();
    expect(mobileNav.querySelectorAll("a").length).toBeGreaterThan(0);
    expect(kitCss).toMatch(/\.menu nav a:hover\s*\{/);
  });
});

// ---------------------------------------------------------------------------
// cursor-pointer — Tailwind v4 Preflight does not set cursor:pointer on
// <button> elements; every interactive button needs an explicit cursor-pointer
// class.  <a>/<Link> elements are excluded (browser default already pointer).
// ---------------------------------------------------------------------------

describe("Nav hamburger — cursor-pointer affordance", () => {
  it("hamburger button has cursor-pointer class", () => {
    render(<Nav />);
    const hamburger = screen.getByRole("button", { name: /Open menu/i });
    expect(hamburger.className).toContain("cursor-pointer");
  });
});

describe("FaqSection accordion — cursor-pointer affordance", () => {
  it("accordion trigger has cursor-pointer class", () => {
    const { container } = render(<FaqSection />);
    const trigger = container.querySelector('[data-slot="accordion-trigger"]') as HTMLElement | null;
    expect(trigger).not.toBeNull();
    expect(trigger!.className).toContain("cursor-pointer");
  });
});

describe("EngagementsFaq accordion — cursor-pointer affordance", () => {
  it("accordion trigger has cursor-pointer class", () => {
    const { container } = render(<EngagementsFaq />);
    const trigger = container.querySelector('[data-slot="accordion-trigger"]') as HTMLElement | null;
    expect(trigger).not.toBeNull();
    expect(trigger!.className).toContain("cursor-pointer");
  });
});

describe("Button component — cursor-pointer affordance", () => {
  it("shared Button component has cursor-pointer in its class list", () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole("button", { name: /Test/i });
    expect(btn.className).toContain("cursor-pointer");
  });
});
