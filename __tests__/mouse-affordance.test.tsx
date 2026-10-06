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
import ThemeToggle from "@/components/layout/ThemeToggle";
import FaqSection from "@/components/home/FaqSection";
import EngagementsFaq from "@/components/engagements/EngagementsFaq";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// ThemeToggle — both buttons need a visible hover state
// ---------------------------------------------------------------------------
describe("ThemeToggle — mouse affordance", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("Light button has a hover: class for visual feedback", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /Light theme/i });
    expect(btn.className).toMatch(/hover:/);
  });

  it("Dark button has a hover: class for visual feedback", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /Dark theme/i });
    expect(btn.className).toMatch(/hover:/);
  });
});

// ---------------------------------------------------------------------------
// Nav — logo link and hamburger button
// ---------------------------------------------------------------------------
describe("Nav — mouse affordance", () => {
  it("logo/brand link has a hover: class for visual feedback", () => {
    const { container } = render(<Nav />);
    // The brand link is the first anchor with text "Jason Cook Design"
    const brandLink = container.querySelector('a[href="/"]') as HTMLAnchorElement | null;
    expect(brandLink).not.toBeNull();
    expect(brandLink!.className).toMatch(/hover:/);
  });

  it("hamburger button has a hover: class for visual feedback", () => {
    render(<Nav />);
    const hamburger = screen.getByRole("button", { name: /Open menu/i });
    expect(hamburger.className).toMatch(/hover:/);
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
  it("all five desktop nav links retain a hover: class", () => {
    const { container } = render(<Nav />);
    const desktopUl = container.querySelector("ul.hidden");
    expect(desktopUl).not.toBeNull();
    const links = desktopUl!.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.className).toMatch(/hover:/);
    });
  });
});

// ---------------------------------------------------------------------------
// Nav mobile links — check hover is present on mobile panel links
// ---------------------------------------------------------------------------
describe("Nav mobile links — mouse affordance (regression)", () => {
  it("mobile nav links retain a hover: class when panel is open", () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: /Open menu/i }));
    const mobileNav = screen.getByRole("navigation", { name: /Mobile navigation/i });
    const links = mobileNav.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.className).toMatch(/hover:/);
    });
  });
});

// ---------------------------------------------------------------------------
// cursor-pointer — Tailwind v4 Preflight does not set cursor:pointer on
// <button> elements; every interactive button needs an explicit cursor-pointer
// class.  <a>/<Link> elements are excluded (browser default already pointer).
// ---------------------------------------------------------------------------
describe("ThemeToggle — cursor-pointer affordance", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });

  it("Light button has cursor-pointer class", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /Light theme/i });
    expect(btn.className).toContain("cursor-pointer");
  });

  it("Dark button has cursor-pointer class", () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /Dark theme/i });
    expect(btn.className).toContain("cursor-pointer");
  });
});

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
