/**
 * The home page's two engagement rows are links with a secondary (ghost) button inside, labelled with what
 * happens next, instead of a bare arrow square. The whole row is the hit area; hovering or focusing it fills
 * the button with the hover-fill, the same hover every solid control takes. The arrow squares stay on the
 * Work and Writing lists, where the row itself is the call to action.
 */
import { readFileSync } from "fs";
import { join } from "path";
import { render } from "@testing-library/react";
import EngagementFork from "@/components/home/EngagementFork";
import { engagementTypes } from "@/lib/engagement-types";

const patterns = readFileSync(join(process.cwd(), "app/blueprint-patterns.css"), "utf8");
const motion = readFileSync(join(process.cwd(), "app/blueprint-motion.css"), "utf8");

describe("engagement registry call to action", () => {
  it("gives every type a short, verb-led call to action", () => {
    for (const t of engagementTypes) {
      expect(typeof t.cta).toBe("string");
      expect(t.cta.trim().length).toBeGreaterThan(3);
      expect(t.cta.length).toBeLessThanOrEqual(28);
    }
    expect(new Set(engagementTypes.map((t) => t.cta)).size).toBe(engagementTypes.length);
  });
});

describe("home fork rows", () => {
  it("show a secondary button labelled with the type's call to action, in place of the arrow square", () => {
    const { container } = render(<EngagementFork />);
    const rows = container.querySelectorAll("a.row");
    expect(rows).toHaveLength(engagementTypes.length);
    rows.forEach((row, i) => {
      const btn = row.querySelector(".btn.ghost.sm");
      expect(btn).not.toBeNull();
      expect(btn!.textContent).toContain(engagementTypes[i].cta);
      expect(row.querySelector(".go")).toBeNull();
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
    const m = patterns.match(/a\.row:hover \.btn\.ghost,\s*a\.row:focus-visible \.btn\.ghost\s*\{([^}]*)\}/);
    expect(m).not.toBeNull();
    expect(m![1]).toMatch(/background:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/border-color:\s*var\(--hover-fill\)/);
    expect(m![1]).toMatch(/color:\s*var\(--paper\)/);
  });

  it("nudges the arrow on row hover, as it does on a hovered button", () => {
    expect(motion).toMatch(/a\.row:hover \.btn span\[aria-hidden\]/);
  });
});
