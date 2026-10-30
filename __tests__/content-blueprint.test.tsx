import { existsSync, readFileSync } from "fs";
import { join } from "path";
/**
 * The content pages (work, case studies, writing, posts, about, capabilities, contact, legal, not-found)
 * are rebuilt from the blueprint kit: sheets divided by rules, ruled rows and cells, no cards, no tint,
 * no radius. These tests assert the new markup; copy is asserted in each page's own test file.
 */
import { render } from "@testing-library/react";
import WorkPage from "@/app/work/page";
import WorkCaseStudyContent from "@/components/work/WorkCaseStudyContent";
import WritingPage from "@/app/writing/page";
import WritingPostContent from "@/components/writing/WritingPostContent";
import AboutPage from "@/app/about/page";
import CapabilitiesPage from "@/app/capabilities/page";
import ContactPage from "@/app/contact/page";
import LegalPage from "@/app/legal/page";
import NotFound from "@/app/not-found";
import { caseStudies } from "@/lib/work";
import { posts } from "@/lib/writing";

const dell = caseStudies.find((c) => c.slug === "dell")!;
const withImages = caseStudies.find((c) =>
  c.sections.some((s) => s.blocks.some((b) => b.type === "img"))
)!;

// third column: whether the hero carries an eyebrow (dropped where it only repeated the title)
const pages: Array<[string, () => React.ReactElement, boolean]> = [
  ["work index", () => <WorkPage />, false],
  ["case study", () => <WorkCaseStudyContent cs={dell} />, true],
  ["writing index", () => <WritingPage />, false],
  ["writing post", () => <WritingPostContent post={posts[0]} />, false],
  ["about", () => <AboutPage />, false],
  ["capabilities", () => <CapabilitiesPage />, true],
  ["contact", () => <ContactPage />, false],
  ["legal", () => <LegalPage />, false],
  ["not found", () => <NotFound />, true],
];

describe.each(pages)("%s page is a stack of sheets", (_name, make, hasEyebrow) => {
  it("numbers every section A-101, A-102, … in page order and names it", () => {
    const { container } = render(make());
    const sections = Array.from(container.querySelectorAll("section"));
    expect(sections.length).toBeGreaterThan(0);
    sections.forEach((s, i) => {
      expect(s.getAttribute("data-sheet")).toBe(`A-${101 + i}`);
      expect(s.getAttribute("data-name")).toMatch(/^[A-Z]+$/);
    });
    expect(sections[0].getAttribute("data-name")).toBe("HERO");
  });

  it("opens with the hero: eyebrow first, then the one h1", () => {
    const { container } = render(make());
    const hero = container.querySelector("section")!;
    expect(hero.classList.contains("hero")).toBe(true);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    if (hasEyebrow) expect(hero.querySelector("p")!.classList.contains("eyebrow")).toBe(true);
  });

  it("puts each sheet headline under an eyebrow (case-study body sections are headed by their own content, with none)", () => {
    const { container } = render(make());
    container.querySelectorAll(".intro h2").forEach((h2) => {
      if (h2.closest('section[data-name="BODY"]')) return;
      expect(h2.previousElementSibling?.classList.contains("eyebrow")).toBe(true);
    });
  });

  it("carries no card, tint, radius, shadow, or gradient classes", () => {
    const { container } = render(make());
    expect(container.innerHTML).not.toMatch(/rounded|shadow|bg-surface|bg-band|bg-gradient|gradient/);
  });
});

describe("work index", () => {
  it("lists one ruled row per study, each a link with the study title and a thumbnail in a framed plate", () => {
    const { container } = render(<WorkPage />);
    const rows = container.querySelectorAll('.rows > a.row[href^="/work/"]');
    expect(rows).toHaveLength(caseStudies.length);
    rows.forEach((row, i) => {
      expect(row.querySelector(".k")!.textContent).toBe(caseStudies[i].client);
      expect(row.querySelector(".title")!.textContent).toBe(caseStudies[i].title);
      expect(row.querySelector(".fig img")).not.toBeNull();
      expect(row.querySelector(".btn.secondary.icon")!.textContent).toBe("→");
      expect(row.querySelector(".go")).toBeNull();
    });
  });

  it("shows thumbnails at full opacity with no caption", () => {
    const { container } = render(<WorkPage />);
    container.querySelectorAll(".fig").forEach((fig) => {
      expect(fig.querySelector("figcaption")).toBeNull();
      expect(fig.className).not.toMatch(/opacity/);
      expect(fig.querySelector("img")!.className).not.toMatch(/opacity/);
    });
  });
});

describe("case study", () => {
  it("opens with the client as eyebrow (the breadcrumb comes from the layout), the title, and the subtitle in the hero grammar", () => {
    const { container } = render(<WorkCaseStudyContent cs={dell} />);
    const hero = container.querySelector("section")!;
    expect(hero.querySelector("nav.crumb")).toBeNull();
    expect(hero.querySelector("p.eyebrow")!.textContent).toBe(dell.client);
    expect(hero.querySelector("h1")!.textContent).toBe(dell.title);
    expect(hero.querySelector("h1 ~ div > p")!.textContent).toBe(dell.subtitle);
  });

  it("gives each body section its heading and prose, with no number key", () => {
    const { container } = render(<WorkCaseStudyContent cs={dell} />);
    const heads = Array.from(container.querySelectorAll(".intro h2")).map((h) => h.textContent);
    expect(heads).toEqual(dell.sections.map((s) => s.heading));
    expect(container.querySelectorAll(".intro .eyebrow")).toHaveLength(0);
    expect(container.querySelectorAll(".pg .prose").length).toBe(dell.sections.length);
  });

  it("frames every image as a numbered FIG. plate at full opacity", () => {
    const { container } = render(<WorkCaseStudyContent cs={withImages} />);
    const total = withImages.sections.flatMap((s) => s.blocks).filter((b) => b.type === "img").length;
    const figs = container.querySelectorAll("figure.fig");
    expect(figs).toHaveLength(total);
    figs.forEach((fig, i) => {
      expect(fig.querySelector("figcaption")!.textContent).toBe(`FIG. ${i + 1}`);
      expect(fig.querySelector("img")!.className).not.toMatch(/opacity/);
    });
  });

  it("sets the testimonial as a quote with the name and role in mono", () => {
    const { container } = render(<WorkCaseStudyContent cs={dell} />);
    const fig = container.querySelector(".quotes figure")!;
    expect(fig.querySelector("blockquote")!.textContent).toBe(`“${dell.testimonial!.quote}”`);
    expect(fig.querySelector("figcaption b")!.textContent).toBe(dell.testimonial!.name);
    expect(fig.querySelector("figcaption")!.textContent).toContain(dell.testimonial!.role);
  });

  it("closes with a tertiary button back to the work index", () => {
    const { container } = render(<WorkCaseStudyContent cs={dell} />);
    const back = container.querySelector('a.btn.tertiary[href="/work"]')!;
    expect(back.textContent).toBe("← All work");
  });
});

describe("case study sections that carry a diagnosis note", () => {
  it("shows the note as a dashed, untinted aside", () => {
    const noted = caseStudies.find((c) => c.sections.some((s) => s.diagnosisNote));
    if (!noted) return;
    const { container } = render(<WorkCaseStudyContent cs={noted} />);
    const note = container.querySelector("aside.note")!;
    expect(note.textContent).toBe(noted.sections.find((s) => s.diagnosisNote)!.diagnosisNote);
  });
});

describe("writing index", () => {
  it("lists posts newest first under /writing/blog, the date key running downward", () => {
    const { container } = render(<WritingPage />);
    const hrefs = Array.from(container.querySelectorAll('[data-name="BLOG"] .rows > a.row')).map((r) => r.getAttribute("href"));
    const expected = [...posts].sort((a, b) => b.date.localeCompare(a.date)).map((p) => `/writing/blog/${p.slug}`);
    expect(hrefs).toEqual(expected);
    expect(hrefs[0]).toBe("/writing/blog/rebuilding-jasoncookdesign-com");
  });

  it("has no post counter in the hero", () => {
    const { container } = render(<WritingPage />);
    const hero = container.querySelector("section.hero")!;
    expect(hero.querySelector(".count")).toBeNull();
    expect(hero.querySelector(".side")).toBeNull();
    expect(hero.textContent).not.toMatch(/\b0\d\b/);
  });

  it("lists one ruled row per post: a date key, the title, the excerpt, and tags", () => {
    const { container } = render(<WritingPage />);
    const rows = container.querySelectorAll('[data-name="BLOG"] .rows > a.row');
    expect(rows).toHaveLength(posts.length);
    const newestFirst = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    rows.forEach((row, i) => {
      expect(row.querySelector(".k")!.textContent).toMatch(/2026/);
      expect(row.querySelector(".title")!.textContent).toBe(newestFirst[i].title);
      expect(row.querySelectorAll(".tag")).toHaveLength(newestFirst[i].tags.length);
      expect(row.querySelector(".btn.secondary.icon")!.textContent).toBe("→");
      expect(row.querySelector(".go")).toBeNull();
    });
  });

  it("labels the blog and longform sections with their own header bands, longform after blog", () => {
    const { container } = render(<WritingPage />);
    const labels = Array.from(container.querySelectorAll(".pgs > .pg > .eyebrow")).map((e) => e.textContent);
    expect(labels).toEqual(["Blog", "Longform"]);
    const sheets = Array.from(container.querySelectorAll("[data-name]")).map((e) => e.getAttribute("data-name"));
    expect(sheets.indexOf("LONGFORM")).toBeGreaterThan(sheets.indexOf("BLOG"));
  });
});

describe("writing post", () => {
  it("reads in a prose column, with images as numbered FIG. plates", () => {
    const post = posts.find((p) => p.content.some((b) => b.type === "img"))!;
    const { container } = render(<WritingPostContent post={post} />);
    expect(container.querySelector(".pg .prose")).not.toBeNull();
    const figs = container.querySelectorAll("figure.fig");
    expect(figs.length).toBeGreaterThan(0);
    figs.forEach((fig, i) => {
      expect(fig.querySelector("figcaption .idx")!.textContent).toBe(`FIG. ${i + 1}`);
    });
  });

  it("keeps the credit link inside the plate caption", () => {
    const post = posts.find((p) => p.content.some((b) => b.type === "img" && b.credit))!;
    const { container } = render(<WritingPostContent post={post} />);
    expect(container.querySelector("figure.fig figcaption a")).not.toBeNull();
  });

  it("closes with a tertiary button back to the writing index", () => {
    const { container } = render(<WritingPostContent post={posts[0]} />);
    expect(container.querySelector('a.btn.tertiary[href="/writing"]')!.textContent).toBe("← All writing");
  });
});

describe("about, capabilities, contact, legal", () => {
  it("about sets the facts as definition rows", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelectorAll("dl.defs > .d > dt")).toHaveLength(4);
  });

  it("capabilities sets the disciplines and company data as definition rows and the outcomes as ruled rows", () => {
    const { container } = render(<CapabilitiesPage />);
    expect(container.querySelectorAll("dl.defs")).toHaveLength(2);
    expect(container.querySelectorAll(".rows .row")).toHaveLength(5);
  });

  it("contact makes the action a primary button", () => {
    const { container } = render(<ContactPage />);
    expect(container.querySelector("a.btn")!.getAttribute("href")).toBe("#book");
  });

  it("legal gives each section an eyebrow, its headline, and its copy as mono-keyed definition rows", () => {
    const { container } = render(<LegalPage />);
    expect(container.querySelectorAll("section .intro h2")).toHaveLength(3);
    expect(container.querySelectorAll("section .intro .eyebrow")).toHaveLength(3);
    expect(container.querySelectorAll("section dl.defs .d").length).toBeGreaterThanOrEqual(9);
    expect(container.querySelectorAll(".ph")).toHaveLength(0);
  });

  it("not found offers a primary button home", () => {
    const { container } = render(<NotFound />);
    expect(container.querySelector('a.btn[href="/"]')).not.toBeNull();
  });
});

describe("about portrait", () => {
  it("shows the profile photo in the hero's side column, with a text alternative and a caption", () => {
    const { container } = render(<AboutPage />);
    const fig = container.querySelector(".hero > .side figure.fig.portrait")!;
    expect(fig).not.toBeNull();
    const img = fig.querySelector("img")!;
    expect(img.getAttribute("alt")).toBe("Portrait of Jason Cook");
    expect(img.getAttribute("src")).toMatch(/jason-cook/);
    expect(fig.querySelector("figcaption")?.textContent).toBe("Jason Cook");
  });

  it("is desaturated and tinted into the sheet's palette by CSS, so the file stays the original", () => {
    const css = readFileSync(join(process.cwd(), "app/bp-content.css"), "utf8");
    expect(css).toMatch(/\.fig\.portrait img\s*\{[^}]*filter:\s*url\(#portrait-lift\)/);
    expect(css).toMatch(/\.fig\.portrait::after\s*\{[^}]*mix-blend-mode:/);
  });

  it("lifts the midtones with a gamma curve in an SVG filter, which brightens the face without clipping the background", () => {
    const { container } = render(<AboutPage />);
    const filter = container.querySelector("svg filter#portrait-lift")!;
    expect(filter).not.toBeNull();
    expect(filter.querySelector('feColorMatrix[type="saturate"]')!.getAttribute("values")).toBe("0");
    for (const ch of ["R", "G", "B"]) {
      const fn = filter.querySelector(`feFunc${ch}[type="gamma"]`)!;
      const exponent = Number(fn.getAttribute("exponent"));
      expect(exponent).toBeGreaterThan(0.5);
      expect(exponent).toBeLessThan(1);
    }
    expect(container.querySelector("svg:has(filter#portrait-lift)")!.getAttribute("aria-hidden")).toBe("true");
  });

  it("uses a gamma lift, not a brightness multiplier, and a light navy tint", () => {
    const css = readFileSync(join(process.cwd(), "app/bp-content.css"), "utf8");
    expect(css).not.toMatch(/\.fig\.portrait img\s*\{[^}]*brightness\(/);
    const opacity = Number(css.match(/\.fig\.portrait::after\s*\{[^}]*opacity:\s*([\d.]+)/)![1]);
    expect(opacity).toBeLessThanOrEqual(0.4);
  });

  it("ships the photo from the old site, as a file in public/images", () => {
    expect(existsSync(join(process.cwd(), "public/images/jason-cook.jpg"))).toBe(true);
  });
});
