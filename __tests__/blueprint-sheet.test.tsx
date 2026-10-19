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

describe("numbered mono index nav", () => {
  it("sets the desktop links in mono caps", () => {
    render(<Nav />);
    const desktop = screen.getByRole("navigation", { name: /main navigation/i });
    const links = desktop.querySelectorAll("ul a");
    expect(links.length).toBe(5);
    links.forEach((a) => {
      expect(a.className).toMatch(/font-mono/);
      expect(a.className).toMatch(/uppercase/);
    });
  });

  it("numbers the desktop links with CSS counters and an empty alternative", () => {
    expect(css).toMatch(/counter-increment:\s*navi/);
    expect(css).toMatch(/content:\s*counter\(navi,\s*decimal-leading-zero\)[^;]*\/\s*""/);
  });
});

describe("sheet rules and nav", () => {
  it("draws an ink rule between consecutive sections", () => {
    expect(css).toMatch(/main > section:not\(:first-child\)\s*\{[^}]*border-top:\s*1px solid var\(--ink\)/);
  });

  it("keeps each numbered nav link on one line", () => {
    expect(css).toMatch(/header nav\[aria-label="Main navigation"\] ul li a\s*\{[^}]*white-space:\s*nowrap/);
  });
});

describe("section spacing under a sheet rule", () => {
  it("gives a section that sets only bottom padding the same top padding", () => {
    expect(css).toMatch(/main > section:not\(:first-child\)\[class\*="pb-24"\]:not\(\[class\*="py-"\]\):not\(\[class\*="pt-"\]\)\s*\{[^}]*padding-top:\s*6rem/);
  });
});

describe("docked header", () => {
  it("is not overridden by the frame: the header stays sticky inside the sheet", () => {
    // `position: relative` on the header would defeat position: sticky and the header would scroll away.
    expect(css).not.toMatch(/\.sheet-frame > header[^{]*\{[^}]*position:\s*relative/);
  });

  it("is sticky in the markup and sits above the content", () => {
    render(<Nav />);
    const header = screen.getByRole("banner");
    expect(header.className).toMatch(/\bsticky\b/);
    expect(header.className).toMatch(/\btop-0\b/);
    expect(header.className).toMatch(/\bz-20\b/);
  });
});
