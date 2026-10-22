import { readFileSync } from "fs";
import { join } from "path";
/**
 * The home page in the blueprint's language: sheets, the hero grammar, ruled cells and rows, the spec plate,
 * and the FAQ as general notes. Copy is guarded by home.test.tsx and the other home tests; these pin the markup.
 */
import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
jest.mock("@/lib/cal-embed", () => ({ mountCalEmbed: jest.fn() }));
import HomePage from "@/app/page";
import { engagementTypes } from "@/lib/engagement-types";

const sections = (c: HTMLElement) => Array.from(c.querySelectorAll("section")) as HTMLElement[];
const bySheet = (c: HTMLElement, name: string) => c.querySelector(`section[data-name="${name}"]`) as HTMLElement;

describe("Home sheets", () => {
  it("numbers the eight sheets A-101 to A-108 in page order with a one-word role", () => {
    const { container } = render(<HomePage />);
    const found = sections(container).map((s) => [s.getAttribute("data-sheet"), s.getAttribute("data-name")]);
    expect(found).toEqual([
      ["A-101", "HERO"],
      ["A-102", "FORK"],
      ["A-103", "START"],
      ["A-104", "DELIVERY"],
      ["A-105", "PROOF"],
      ["A-106", "PRICE"],
      ["A-107", "CLOSE"],
      ["A-108", "FAQ"],
    ]);
  });

  it("gives each headed sheet an intro block whose eyebrow is the p directly before the h2", () => {
    const { container } = render(<HomePage />);
    for (const name of ["START", "DELIVERY", "PROOF", "PRICE", "FAQ"]) {
      const h2 = bySheet(container, name).querySelector("h2")!;
      expect(h2.previousElementSibling?.tagName).toBe("P");
      expect(h2.previousElementSibling?.classList.contains("eyebrow")).toBe(true);
    }
    for (const name of ["FORK", "START", "DELIVERY", "PROOF", "FAQ"]) {
      expect(bySheet(container, name).querySelector(".intro.g > .t > h2")).not.toBeNull();
    }
  });

  it("leaves no card, tint, radius, shadow or gradient utility classes anywhere on the page", () => {
    const { container } = render(<HomePage />);
    expect(container.innerHTML).not.toMatch(/\b(rounded(-[a-z0-9]+)?|shadow(-[a-z0-9]+)?|bg-surface|bg-band-[a-z]+|bg-gradient-[a-z]+|bg-linear-[a-z]+)\b/);
  });
});

describe("Home hero", () => {
  it("is a 12-column grid with a main column and a side column", () => {
    const { container } = render(<HomePage />);
    const hero = bySheet(container, "HERO");
    expect(hero.classList.contains("hero")).toBe(true);
    expect(hero.classList.contains("g")).toBe(true);
    expect(hero.querySelector(":scope > .main")).not.toBeNull();
    expect(hero.querySelector(":scope > .side")).not.toBeNull();
  });

  it("stacks eyebrow, H1, the two paragraphs, then the actions in the main column", () => {
    const { container } = render(<HomePage />);
    const main = bySheet(container, "HERO").querySelector(".main")!;
    const kids = Array.from(main.children);
    expect(kids.map((k) => k.tagName)).toEqual(["P", "H1", "DIV", "DIV"]);
    expect(kids[0].classList.contains("eyebrow")).toBe(true);
    const paras = kids[2].querySelectorAll(":scope > p");
    expect(paras).toHaveLength(1);
    expect(paras[0].classList.contains("lead")).toBe(true);
    expect(paras[0].textContent).toMatch(/^I.ve built systems like this at enterprise scale/);
    expect(kids[3].classList.contains("actions")).toBe(true);
    expect(kids[3].querySelector("a.btn")?.textContent).toContain("Book your strategy call");
    expect(kids[3].querySelector("p.strip")).not.toBeNull();
  });

  it("moves the scope sentence into its own band at the bottom of the hero, above the stat row", () => {
    const { container } = render(<HomePage />);
    const hero = bySheet(container, "HERO");
    const band = hero.querySelector(":scope > .scope")!;
    expect(band).not.toBeNull();
    expect(band.textContent).toMatch(/^Architecture, design specification, implementation/);
    expect(hero.querySelector(".main .body2")).toBeNull();
    const order = Array.from(hero.children).map((c) => c.className.split(" ")[0]);
    expect(order).toEqual(["main", "side", "scope", "statrow"]);
  });

  it("insets the scope band by the sheet padding so its text clears the frame", () => {
    const css = readFileSync(join(process.cwd(), "app/bp-home.css"), "utf8") as string;
    expect(css).toMatch(/\.hero \.scope\s*\{[^}]*padding:\s*18px var\(--pad\)/);
  });

  it("centres the drawing vertically in the right column", () => {
    const css = readFileSync(join(process.cwd(), "app/bp-home.css"), "utf8") as string;
    expect(css).toMatch(/\.hero \.side\s*\{[^}]*align-self:\s*center/);
  });

  it("keeps the muted emphasis on 'actually' without a utility colour class", () => {
    const { container } = render(<HomePage />);
    const em = bySheet(container, "HERO").querySelector("h1 span")!;
    expect(em.textContent).toBe("actually");
    expect(em.className).not.toMatch(/text-/);
  });

  it("puts the construction drawing in the side column, captioned FIG. 0", () => {
    const { container } = render(<HomePage />);
    const side = bySheet(container, "HERO").querySelector(".side")!;
    expect(side.querySelector("svg.drawing")).not.toBeNull();
    expect(side.textContent).toContain("FIG. 0 · JCD MARK, CONSTRUCTION");
  });

  it("carries no entry offer and no price: those live in the pricing sheet", () => {
    const { container } = render(<HomePage />);
    const hero = bySheet(container, "HERO");
    expect(hero.textContent).not.toContain("[ENTRY-OFFER-NAME]");
    expect(hero.textContent).not.toContain("$");
  });

  it("closes with the three stats as a full-width stat row that is the last child of the hero", () => {
    const { container } = render(<HomePage />);
    const hero = bySheet(container, "HERO");
    const row = hero.lastElementChild!;
    expect(row.classList.contains("statrow")).toBe(true);
    expect(Array.from(row.querySelectorAll(".v")).map((v) => v.textContent)).toEqual(["143", "50+", "4"]);
    expect(Array.from(row.querySelectorAll(".l")).map((l) => l.textContent)).toEqual([
      "countries unified in one system",
      "industry awards for shipped work",
      "patents written or contributed",
    ]);
  });

  it("opens the hero with the eyebrow as its first paragraph", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("section p")!.classList.contains("eyebrow")).toBe(true);
  });
});

describe("Home fork, start, and delivery", () => {
  it("lists the two engagement types as rows: one link each, situation heading, a call-to-action button, and no number key", () => {
    const { container } = render(<HomePage />);
    const rows = Array.from(bySheet(container, "FORK").querySelectorAll(".rows > a.row"));
    expect(rows.map((r) => r.getAttribute("href"))).toEqual(engagementTypes.map((t) => `/engagements/${t.slug}`));
    engagementTypes.forEach((t, i) => {
      expect(rows[i].querySelector(".k")).toBeNull();
      expect(rows[i].querySelector("h3")?.textContent).toBe(t.situation);
      expect(rows[i].textContent).toContain(t.name);
      expect(rows[i].querySelector(".btn.secondary.icon")).not.toBeNull();
      void t;
    });
  });

  it("sets the three method steps as ruled cells with mono indices", () => {
    const { container } = render(<HomePage />);
    const cells = bySheet(container, "START").querySelectorAll(".cells.c3 > article.cell");
    expect(cells).toHaveLength(3);
    expect(Array.from(cells).map((c) => c.querySelector(".idx")?.textContent)).toEqual(["01", "02", "03"]);
    expect(Array.from(cells).map((c) => c.querySelector("h3")?.textContent)).toEqual([
      "Find the real problem",
      "Design and build",
      "Hand it over",
    ]);
  });

  it("sets the two delivery options as two ruled cells", () => {
    const { container } = render(<HomePage />);
    const cells = bySheet(container, "DELIVERY").querySelectorAll(".cells.c2 > article.cell");
    expect(cells).toHaveLength(2);
    expect(cells[0].querySelector("h3")?.textContent).toBe("I build it, you run it");
    expect(cells[1].querySelector("h3")?.textContent).toBe("I design it, your people build it, then you run it");
  });
});

describe("Home proof and pricing", () => {
  it("orders the proof sheet logos, headline block, quotes", () => {
    const { container } = render(<HomePage />);
    const proof = bySheet(container, "PROOF");
    const logos = proof.querySelector(".logos")!;
    const intro = proof.querySelector(".intro")!;
    const quotes = proof.querySelector(".quotes")!;
    expect(logos.compareDocumentPosition(intro) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(intro.compareDocumentPosition(quotes) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(logos.classList.contains("c5")).toBe(true);
  });

  it("shows a portrait beside each testimonial name, like the case-study quotes, from files that exist", () => {
    const { container } = render(<HomePage />);
    const figs = bySheet(container, "PROOF").querySelectorAll(".quotes > figure");
    const photos = Array.from(figs).map((f) => {
      const cap = f.querySelector("figcaption")!;
      const img = cap.querySelector("img");
      expect(cap.classList.contains("byline")).toBe(true);
      expect(img?.getAttribute("alt")).toBe("");
      return decodeURIComponent((img?.getAttribute("src") ?? "").replace(/^.*?url=/, "").replace(/&.*$/, "")) || img?.getAttribute("src");
    });
    expect(photos).toEqual(["/images/people/chris-coen.jpg", "/images/people/rajesh-balaraman.jpg"]);
    photos.forEach((src) => expect(fs.existsSync(path.join(process.cwd(), "public", src!))).toBe(true));
    expect(figs[0].querySelector("figcaption b")?.textContent).toBe("Chris Coen");
  });

  it("sets each testimonial as a figure with blockquote and a mono caption naming the person and role", () => {
    const { container } = render(<HomePage />);
    const figs = bySheet(container, "PROOF").querySelectorAll(".quotes > figure");
    expect(figs).toHaveLength(2);
    expect(figs[0].querySelector("figcaption b")?.textContent).toBe("Chris Coen");
    expect(figs[0].querySelector("figcaption")?.textContent).toContain("Engineering Department Lead");
    expect(figs[1].querySelector("blockquote")?.textContent).toMatch(/^.Jason.s ability to understand complex scenarios/);
  });

  it("is a spec plate sheet: headline on the left, one plate per offer on the right, offering first", () => {
    const { container } = render(<HomePage />);
    const price = bySheet(container, "PRICE");
    expect(price.classList.contains("plate")).toBe(true);
    expect(price.querySelector(":scope > .t h2")?.textContent).toBe("Where you start, and what it costs.");
    const plates = price.querySelectorAll(".pl");
    expect(plates).toHaveLength(2);
    expect(plates[0].querySelector(".pl-h")?.textContent).toContain("Offering Engagement");
    expect(plates[1].querySelector(".pl-h")?.textContent).toContain("Operating Engagement");
    for (const p of Array.from(plates)) {
      expect(p.querySelector(".pl-h")?.textContent).toContain("$2,500");
      expect(p.querySelectorAll(".regs i")).toHaveLength(4);
      expect(p.querySelector("a.btn")?.textContent).toContain("Book your strategy call");
    }
    for (const p of Array.from(plates)) {
      const steps = Array.from(p.querySelectorAll(".sp"));
      expect(steps.map((s) => s.querySelector(".k .l")?.textContent)).toEqual(["A", "B"]);
      expect(steps[0].querySelector("a.btn")).toBeNull();
      expect(steps[1].querySelector("a.btn")).not.toBeNull();
    }
  });

  it("uses no orange: no decision marker on the plate", () => {
    const { container } = render(<HomePage />);
    expect(bySheet(container, "PRICE").querySelector(".acc")).toBeNull();
  });
});

describe("Home close and FAQ", () => {
  it("closes with the pitch on the left (headline, quote, button, strip) and the booking embed on the right", () => {
    const { container } = render(<HomePage />);
    const close = bySheet(container, "CLOSE");
    expect(close.querySelector("h2")?.textContent).toBe("When you're done guessing how to fix it");
    expect(close.querySelector("p.quote")?.textContent).toBe("“Build the right thing” comes before “build the thing right.”");
    expect(close.querySelector("a.btn")?.getAttribute("href")).toBe("#book");
    expect(close.querySelector("p.strip .a")?.textContent).toBe("Free. 20 minutes. No commitment.");
    expect(Array.from(close.children).map((c) => c.className.split(" ")[0])).toEqual(["pitch", "book"]);
    expect(close.querySelector(".book#book .cal-inline")).not.toBeNull();
  });

  it("sets the FAQ as kit rows with a mark and no number key, keeping the item ids", () => {
    const { container } = render(<HomePage />);
    const faq = bySheet(container, "FAQ");
    expect(faq.querySelector(".faq")).not.toBeNull();
    const items = faq.querySelectorAll(".faq > .faq-item");
    expect(items).toHaveLength(13);
    expect(items[0].id).toBe("faq-13");
    expect(items[1].id).toBe("faq-01");
    const trigger = items[1].querySelector("button.faq-trigger")!;
    expect(trigger.querySelector(".k")).toBeNull();
    expect(trigger.querySelector(".mark")).not.toBeNull();
    expect(trigger.textContent).toBe("What do I get for $2,500?");
    expect(screen.getAllByRole("button").length).toBe(13);
  });

  it("does not number the FAQ rows: no CSS counter for them", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "app/bp-home.css"), "utf8");
    expect(css).not.toMatch(/counter-reset:\s*faq/);
    expect(css).not.toMatch(/counter-increment:\s*faq/);
  });
});

describe("Home START: the schedule figure from the concept", () => {
  it("keeps FIG. 1 between the heading and the three cells, with final stage copy and no placeholder text", () => {
    const { container } = render(<HomePage />);
    const start = bySheet(container, "START");
    const order = Array.from(start.children).map((c) => c.tagName + "." + c.className.split(" ")[0]);
    expect(order).toEqual(["DIV.intro", "FIGURE.sheet", "DIV.cells"]);
    const fig = start.querySelector("figure.sheet")!;
    expect(fig.querySelector(".sheet-top .idx")?.textContent).toBe("FIG. 1");
    expect(fig.querySelector(".sheet-top b")?.textContent).toBe("Find the real problem");
    expect(fig.textContent).not.toMatch(/SAMPLE/);
    expect(fig.querySelector(".ph")).toBeNull();
    // an abstract Gantt: no scale label, no column numbers, no day ranges
    expect(fig.querySelector(".sheet-top")?.textContent).toBe("FIG. 1Find the real problem");
    expect(fig.querySelector(".rw.hd .lab")?.textContent).toBe("");
    expect(fig.querySelector(".rw.hd .cols")?.textContent).toBe("");
    expect(fig.textContent).not.toMatch(/Days \d|working days/i);
    expect(Array.from(fig.querySelectorAll(".rw:not(.hd) .lab")).map((e) => e.textContent)).toEqual([
      "01Interview with the owner",
      "02How the business runs now",
      "03What customers experience",
      "04Written recommendation",
      "05Decision: build or stop",
    ]);
  });

  it("draws four stage bars and a decision line on a 12-column track, with the bars hidden from assistive tech", () => {
    const { container } = render(<HomePage />);
    const fig = bySheet(container, "START").querySelector("figure.sheet")!;
    expect(fig.querySelectorAll(".rw")).toHaveLength(6); // scale header, four stages, decision
    expect(fig.querySelectorAll(".bx:not(.dash)")).toHaveLength(4);
    expect(fig.querySelectorAll(".dec").length).toBeGreaterThanOrEqual(5);
    expect(fig.querySelectorAll(".trk .cols i")).toHaveLength(6 * 12);
    expect(fig.querySelectorAll(".bx .sr")).toHaveLength(0);
    // decoration is hidden from assistive tech
    fig.querySelectorAll(".dec, .cols, .mk").forEach((e) => {
      expect(e.getAttribute("aria-hidden") === "true" || e.closest("[aria-hidden='true']")).toBeTruthy();
    });
  });

  it("is labelled by its title and keeps the caption under it", () => {
    const { container } = render(<HomePage />);
    const fig = bySheet(container, "START").querySelector("figure.sheet")!;
    const id = fig.getAttribute("aria-labelledby")!;
    expect(fig.querySelector("#" + id)?.textContent).toBe("Find the real problem");
    expect(fig.querySelector("figcaption .cap p")?.textContent).toMatch(/^It starts with a paid diagnosis/);
  });
});

describe("Home close sheet spacing", () => {
  it("gives the pitch a column as wide as its headline and the embed the rest, so the gap between them is one gutter and the widget keeps its three-pane layout", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "app/bp-home.css"), "utf8");
    expect(css).toMatch(/\.close\s*\{[^}]*grid-template-columns:\s*minmax\(0, 4fr\) minmax\(0, 8fr\)[^}]*gap:\s*48px/);
  });
});
