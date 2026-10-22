/**
 * The engagement rows on the home page, and the Work and Writing lists, are links with a secondary icon button
 * inside: a filled square with an arrow. The whole row is the hit area; hovering or focusing it fills the button
 * with the hover-fill and an ivory border, the same hover every secondary button takes.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render } from "@testing-library/react";
import EngagementFork from "@/components/home/EngagementFork";
import { engagementTypes } from "@/lib/engagement-types";

const patterns = readFileSync(join(process.cwd(), "app/blueprint-patterns.css"), "utf8");
const motion = readFileSync(join(process.cwd(), "app/blueprint-motion.css"), "utf8");

describe("home fork rows", () => {
  it("show a secondary icon button, a square with a decorative arrow", () => {
    const { container } = render(<EngagementFork />);
    const rows = container.querySelectorAll("a.row");
    expect(rows).toHaveLength(engagementTypes.length);
    rows.forEach((row, i) => {
      const btn = row.querySelector(".btn.secondary.icon");
      expect(btn).not.toBeNull();
      expect(btn!.textContent).toBe("→");
      expect(btn!.querySelector("[aria-hidden='true']")).not.toBeNull();
      expect(row.querySelector(".go")).toBeNull();
      void i;
    });
  });

  it("keeps the button a span inside the link, so the row stays one control", () => {
    const { container } = render(<EngagementFork />);
    container.querySelectorAll("a.row .btn").forEach((b) => {
      expect(b.tagName).toBe("SPAN");
      expect(b.querySelector("a, button")).toBeNull();
    });
  });

  it("draws the arrow as decoration beside the label", () => {
    const { container } = render(<EngagementFork />);
    container.querySelectorAll("a.row .btn [aria-hidden='true']").forEach((a) => expect(a.textContent).toBe("→"));
    expect(container.querySelectorAll("a.row .btn [aria-hidden='true']")).toHaveLength(engagementTypes.length);
  });
});

describe("row button hover", () => {
  it("fills the button with the hover-fill when the row is hovered or focused", () => {
    const m = patterns.match(/a\.row:hover \.btn\.secondary,\s*a\.row:focus-visible \.btn\.secondary\s*\{([^}]*)\}/);
    expect(m).not.toBeNull();
    expect(m![1]).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/border-color:\s*var\(--ink\)/);
    expect(m![1]).toMatch(/color:\s*var\(--paper\)/);
  });

  it("nudges the arrow on row hover, as it does on a hovered button", () => {
    expect(motion).toMatch(/a\.row:hover \.btn span\[aria-hidden\]/);
  });
});
