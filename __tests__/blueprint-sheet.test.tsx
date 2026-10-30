/**
 * Blueprint sheet contract: the page is one paper field divided by ink rules. No section is
 * filled with a tint (a tinted band makes the sticky header read as a different color),
 * twelve dashed column guides and the frame run behind the content, and the desktop nav is
 * a numbered mono index.
 */
import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

const root = process.cwd();
const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");

function tsxFiles(dir: string): string[] {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? tsxFiles(path.join(dir, e.name)) : /\.tsx$/.test(e.name) ? [path.join(dir, e.name)] : []
  );
}

describe("one paper field", () => {
  it("fills no <section> with a tint or a band color", () => {
    const offenders: string[] = [];
    for (const f of [...tsxFiles("app"), ...tsxFiles("components")]) {
      fs.readFileSync(path.join(root, f), "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (/<section\b/.test(line) && /\bbg-(surface|band-bg|muted)\b/.test(line)) offenders.push(`${f}:${i + 1}`);
        });
    }
    expect(offenders).toEqual([]);
  });

  it("separates sections with ink rules, not the quieter border color", () => {
    const offenders: string[] = [];
    for (const f of [...tsxFiles("app"), ...tsxFiles("components")]) {
      fs.readFileSync(path.join(root, f), "utf8")
        .split("\n")
        .forEach((line, i) => {
          if (/<section\b/.test(line) && /\bborder-t border-border\b/.test(line)) offenders.push(`${f}:${i + 1}`);
        });
    }
    expect(offenders).toEqual([]);
  });
});

describe("guide token", () => {
  it("defines a faint guide token", () => {
    expect(css).toMatch(/--guide:\s*#[0-9A-Fa-f]{6}/);
  });

});

const kit = fs.readFileSync(path.join(root, "app/blueprint.css"), "utf8");

describe("mono index nav (kit-styled, unnumbered)", () => {
  it("renders the five desktop links inside the kit's .nav", () => {
    render(<Nav />);
    const desktop = screen.getByRole("navigation", { name: /main navigation/i });
    expect(desktop.classList.contains("nav")).toBe(true);
    expect(desktop.querySelectorAll(":scope > ul > li > a")).toHaveLength(5);
  });

  it("sets the links in mono caps (kit) and does not number them: no CSS counter or generated content on the bar's links", () => {
    expect(kit).toMatch(/\.nav a\{[^}]*font:500 12px\/1 var\(--mono\)[^}]*text-transform:uppercase/);
    expect(css).not.toMatch(/counter-increment:\s*navi/);
    expect(css).not.toMatch(/\.bar \.nav a::before/);
  });
});

describe("sheet rules and nav", () => {
  it("draws an ink rule between consecutive sections", () => {
    expect(css).toMatch(/main > section:not\(:first-child\)\s*\{[^}]*border-top:\s*1px solid var\(--ink\)/);
  });

  it("keeps each numbered nav link on one line", () => {
    expect(css).toMatch(/\.bar \.nav a\s*\{[^}]*white-space:\s*nowrap/);
  });
});

describe("section spacing under a sheet rule", () => {
  it("gives a section that sets only bottom padding the same top padding", () => {
    expect(css).toMatch(/main > section:not\(:first-child\)\[class\*="pb-24"\]:not\(\[class\*="py-"\]\):not\(\[class\*="pt-"\]\)\s*\{[^}]*padding-top:\s*6rem/);
  });
});

describe("docked header", () => {
  it("is not overridden by the frame: the bar stays sticky inside the sheet and above the content", () => {
    expect(css).toMatch(/\.frame > \.bar\s*\{[^}]*position:\s*sticky[^}]*top:\s*0[^}]*z-index:\s*20/);
    expect(css).not.toMatch(/\.frame > (header|\.bar)[^{]*\{[^}]*position:\s*relative/);
  });

  it("is the kit's .bar", () => {
    render(<Nav />);
    expect(screen.getByRole("banner").classList.contains("bar")).toBe(true);
  });
});

describe("kit integration", () => {
  it("defines the padding variable the kit and sections rely on", () => {
    expect(kit + css).toMatch(/--pad:\s*24px/);
    expect(kit).toMatch(/--pad:\s*18px/);
  });

  it("does not ship an unlayered global link color that would defeat utility classes", () => {
    expect(kit).not.toMatch(/(^|\n)a\{color:inherit\}/);
  });
});
