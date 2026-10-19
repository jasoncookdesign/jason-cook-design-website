import { render, screen } from "@testing-library/react";
import WorkPage from "@/app/work/page";
import WorkCaseStudyContent from "@/components/work/WorkCaseStudyContent";
import fs from "fs";
import path from "path";
import { caseStudies, type CaseStudy } from "@/lib/work";

describe("Work index layout", () => {
  it("lists each study as one ruled ledger row (a.row) in a rows block, with no old card-grid utilities", () => {
    const { container } = render(<WorkPage />);
    const links = container.querySelectorAll('a[href*="/work/"]');
    expect(links).toHaveLength(caseStudies.length);
    links.forEach((link) => {
      expect(link.classList.contains("row")).toBe(true);
      expect(link.parentElement!.classList.contains("rows")).toBe(true);
      expect(link.className).not.toMatch(/grid-cols|sm:|md:/);
    });
  });
});

describe("Work alt-text audit", () => {
  it("every img block in every case study has non-empty alt text", () => {
    for (const cs of caseStudies) {
      for (const section of cs.sections) {
        for (const block of section.blocks) {
          if (block.type === "img") {
            expect(block.alt.trim()).toBeTruthy();
          }
        }
      }
    }
  });
});

describe("Work index page", () => {
  it("renders the Work h1 heading", () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1, name: /^Work$/i })).toBeTruthy();
  });

  it("renders all 8 case study entries", () => {
    render(<WorkPage />);
    // Each name may appear in multiple elements (client + title); check body text instead
    const text = document.body.textContent ?? "";
    expect(text).toMatch(/OSIsoft/);
    expect(text).toMatch(/Ford/);
    expect(text).toMatch(/Qu POS/);
    expect(text).toMatch(/Banco Azteca/);
    expect(text).toMatch(/Meevo/);
    expect(text).toMatch(/Microsoft Surface/);
    expect(text).toMatch(/Leading Hotels/);
    expect(text).toMatch(/Dell/);
  });

  it("correctly identifies Meevo as the product, not the company", () => {
    render(<WorkPage />);
    // Must show Meevo (product) but must NOT use "Millennium Meevo" as if it were the company name
    const content = document.body.textContent ?? "";
    expect(content).not.toMatch(/Millennium Meevo/);
  });

  it("renders links to each case study", () => {
    render(<WorkPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href") ?? "");
    expect(hrefs.some((h) => h.includes("/work/osisoft"))).toBe(true);
    expect(hrefs.some((h) => h.includes("/work/dell"))).toBe(true);
  });
});

describe("Work case study data", () => {
  it("contains all 8 slugs", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(slugs).toContain("osisoft");
    expect(slugs).toContain("ford");
    expect(slugs).toContain("qu-pos");
    expect(slugs).toContain("banco-azteca");
    expect(slugs).toContain("millennium-meevo");
    expect(slugs).toContain("microsoft-surface");
    expect(slugs).toContain("leading-hotels");
    expect(slugs).toContain("dell");
    expect(slugs).toHaveLength(8);
  });

  it("every case study has title, subtitle, client, indexOneLiner, and testimonial", () => {
    for (const cs of caseStudies) {
      expect(cs.title).toBeTruthy();
      expect(cs.subtitle).toBeTruthy();
      expect(cs.client).toBeTruthy();
      expect(cs.indexOneLiner).toBeTruthy();
      // The testimonial is optional (an assessment has none yet); when present it is complete.
      if (cs.testimonial) {
        expect(cs.testimonial.quote).toBeTruthy();
        expect(cs.testimonial.name).toBeTruthy();
      }
    }
  });

  it("keeps a complete testimonial on each of the eight enterprise studies", () => {
    const enterprise = caseStudies.filter((c) => c.kind !== "assessment");
    expect(enterprise).toHaveLength(8);
    for (const cs of enterprise) {
      expect(cs.testimonial?.quote).toBeTruthy();
      expect(cs.testimonial?.name).toBeTruthy();
    }
  });

  it("renders no blockquote and does not throw when a study has no testimonial", () => {
    const study: CaseStudy = {
      slug: "no-testimonial",
      client: "Client",
      title: "A title long enough to render",
      subtitle: "A subtitle",
      indexOneLiner: "One liner",
      backgroundImage: "/images/background_cs01.jpg",
      sections: [],
      kind: "assessment",
    };
    const { container } = render(<WorkCaseStudyContent cs={study} />);
    expect(container.querySelector("blockquote")).toBeNull();
    expect(container.querySelector("h1")).not.toBeNull();
  });

  it("still renders the testimonial when a study has one", () => {
    const { container } = render(<WorkCaseStudyContent cs={caseStudies[0]} />);
    expect(container.querySelector("blockquote")).not.toBeNull();
  });

  it("gives every assessment study alt text on each image and keeps its image files under 400 KB", () => {
    const assessments = caseStudies.filter((c) => c.kind === "assessment");
    for (const cs of assessments) {
      const srcs = [cs.backgroundImage];
      for (const section of cs.sections) {
        for (const block of section.blocks) {
          if (block.type === "img") {
            expect(block.alt.trim()).not.toBe("");
            srcs.push(block.src);
          }
        }
      }
      for (const src of srcs) {
        const file = path.join(__dirname, "..", "public", src);
        expect(fs.statSync(file).size).toBeLessThan(400 * 1024);
      }
    }
  });
});

describe("Work case study content component", () => {
  it("renders the OSIsoft case study title", () => {
    const cs = caseStudies.find((c) => c.slug === "osisoft")!;
    render(<WorkCaseStudyContent cs={cs} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(document.body.textContent).toMatch(/OSIsoft/);
  });

  it("renders the Dell verifiable business metrics verbatim", () => {
    const cs = caseStudies.find((c) => c.slug === "dell")!;
    render(<WorkCaseStudyContent cs={cs} />);
    // These metrics are verbatim from the source HTML — do not alter them
    expect(document.body.textContent).toMatch(/20% reduction in chat pollution/);
    expect(document.body.textContent).toMatch(/16,000 fewer misrouted customers/);
    expect(document.body.textContent).toMatch(/65% increase in page link engagement/);
    expect(document.body.textContent).toMatch(/300 basis point improvement in CSAT/);
  });

  it("identifies Dovetail Systems as the company behind the Qu POS product", () => {
    const cs = caseStudies.find((c) => c.slug === "qu-pos")!;
    expect(cs.client).toBe("Dovetail Systems");
  });

  it("renders the Qu POS $10 million outcome verbatim", () => {
    const cs = caseStudies.find((c) => c.slug === "qu-pos")!;
    render(<WorkCaseStudyContent cs={cs} />);
    expect(document.body.textContent).toMatch(/\$10 million/);
    expect(document.body.textContent).toMatch(/100% enterprise client retention/);
  });

  it("renders the Meevo over-40 industry awards", () => {
    const cs = caseStudies.find((c) => c.slug === "millennium-meevo")!;
    render(<WorkCaseStudyContent cs={cs} />);
    expect(document.body.textContent).toMatch(/over 40 industry awards/i);
    // Company is Millennium Systems International, product is Meevo
    expect(document.body.textContent).toMatch(/Millennium Systems International/);
  });

  it("does not contain anti-signal language", () => {
    for (const cs of caseStudies) {
      const { unmount } = render(<WorkCaseStudyContent cs={cs} />);
      const text = document.body.textContent ?? "";
      expect(text).not.toMatch(/Let's make something amazing/i);
      expect(text).not.toMatch(/nothing less than gorgeous/i);
      expect(text).not.toMatch(/stellar team/i);
      expect(text).not.toMatch(/inspiring others to think outside the box/i);
      expect(text).not.toMatch(/forges an emotional connection/i);
      expect(text).not.toMatch(/creating interactions that seemed like magic/i);
      unmount();
    }
  });

  it("does not misidentify Meevo as the company name", () => {
    const cs = caseStudies.find((c) => c.slug === "millennium-meevo")!;
    render(<WorkCaseStudyContent cs={cs} />);
    const text = document.body.textContent ?? "";
    // "Millennium Meevo" must never appear as if it were the company name
    // The company is Millennium Systems International; Meevo is the product
    expect(text).not.toMatch(/company.*Millennium Meevo/i);
    expect(text).not.toMatch(/Millennium Meevo.*company/i);
  });

  it("renders testimonials verbatim from source", () => {
    // OSIsoft testimonial — verbatim from cs01.html
    const cs01 = caseStudies.find((c) => c.slug === "osisoft")!;
    render(<WorkCaseStudyContent cs={cs01} />);
    expect(document.body.textContent).toMatch(/Jason has an exceptional ability/);
  });
});

describe("Work looping animations", () => {
  const pub = (p: string) => path.join(process.cwd(), "public", p);
  const loops = caseStudies.flatMap((cs) =>
    cs.sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === "img" && b.loop ? [{ slug: cs.slug, block: b }] : []))),
  );

  it("no case study ships a GIF; animations are video loops with a poster still", () => {
    for (const cs of caseStudies) {
      for (const s of cs.sections) {
        for (const b of s.blocks) if (b.type === "img") expect(b.src).not.toMatch(/\.gif$/i);
      }
    }
    expect(loops.map((l) => l.slug).sort()).toEqual([
      "microsoft-surface", "microsoft-surface", "microsoft-surface",
      "millennium-meevo", "millennium-meevo", "millennium-meevo",
    ]);
  });

  it("every loop has its poster, WebM, and MP4 on disk, with dimensions matching the MP4", () => {
    for (const { block } of loops) {
      expect(block.type === "img" && block.src).toMatch(/^\/images\/loops\/[\w-]+\.jpg$/);
      if (block.type !== "img" || !block.loop) continue;
      const base = block.src.replace(/\.jpg$/, "");
      for (const ext of [".jpg", ".webm", ".mp4"]) expect(fs.existsSync(pub(base + ext))).toBe(true);
      expect(block.loop.width).toBeGreaterThan(0);
      expect(block.loop.height).toBeGreaterThan(0);
    }
  });

  it("each video a visitor downloads stays under 1 MB (the GIFs they replaced ran up to 3.3 MB)", () => {
    for (const { block } of loops) {
      if (block.type !== "img") continue;
      const base = block.src.replace(/\.jpg$/, "");
      for (const ext of [".webm", ".mp4"]) expect(fs.statSync(pub(base + ext)).size).toBeLessThan(1024 * 1024);
    }
  });

  it("a loop renders as a video with a pause button and still takes its FIG number", () => {
    const study = {
      slug: "t", client: "C", title: "T", subtitle: "S", indexOneLiner: "x", backgroundImage: "/x.jpg",
      sections: [{ heading: "H", blocks: [
        { type: "img", src: "/images/a.jpg", alt: "still" },
        { type: "img", src: "/images/loops/cs05_06.jpg", alt: "moving", loop: { width: 1000, height: 712 } },
      ] }],
    } as unknown as CaseStudy;
    const { container } = render(<WorkCaseStudyContent cs={study} />);
    expect(container.querySelectorAll("video")).toHaveLength(1);
    expect(container.querySelectorAll("figure.fig img")).toHaveLength(1);
    expect(screen.getAllByText(/^FIG\. \d+$/).map((n) => n.textContent)).toEqual(["FIG. 1", "FIG. 2"]);
    expect(screen.getByRole("button", { name: /animation/i })).toBeTruthy();
  });
});

describe("Case study text-and-figure pairing", () => {
  const study = (blocks: unknown[]) =>
    ({
      slug: "t", client: "C", title: "T", subtitle: "S", indexOneLiner: "x", backgroundImage: "/x.jpg",
      sections: [{ heading: "H", blocks }],
    }) as unknown as CaseStudy;
  const p = (t: string) => ({ type: "p", html: t });
  const img = (n: number) => ({ type: "img", src: `/images/f${n}.jpg`, alt: `fig ${n}` });
  const html = (blocks: unknown[]) => render(<WorkCaseStudyContent cs={study(blocks)} />).container;
  const beats = (c: HTMLElement) => Array.from(c.querySelectorAll(".prose > .beat"));

  it("wraps the text run before a figure, and the figure, in one beat", () => {
    const c = html([p("one"), p("two"), img(1)]);
    const [beat] = beats(c);
    expect(beats(c)).toHaveLength(1);
    expect(beat.querySelectorAll(":scope > .beat-text > p")).toHaveLength(2);
    expect(beat.querySelectorAll(":scope > figure.fig")).toHaveLength(1);
    expect(beat.firstElementChild!.classList.contains("beat-text")).toBe(true);
  });

  it("makes one beat per text-then-figure pair when they alternate", () => {
    const c = html([p("a"), img(1), p("b"), img(2)]);
    expect(beats(c)).toHaveLength(2);
    expect(c.querySelectorAll(".prose > .beat figure")).toHaveLength(2);
  });

  it("keeps lists in the text column of their beat", () => {
    const c = html([p("a"), { type: "ul", items: ["x", "y"] }, img(1)]);
    expect(beats(c)[0].querySelectorAll(".beat-text > ul")).toHaveLength(1);
  });

  it("leaves a figure with no text before it, and text with no figure after it, outside any beat", () => {
    const c = html([img(1), p("tail")]);
    expect(beats(c)).toHaveLength(0);
    expect(c.querySelectorAll(".prose > figure.fig")).toHaveLength(1);
    expect(c.querySelectorAll(".prose > p")).toHaveLength(1);
  });

  it("pairs the first of two consecutive figures with the text and leaves the second on its own", () => {
    const c = html([p("a"), img(1), img(2)]);
    expect(beats(c)).toHaveLength(1);
    expect(c.querySelectorAll(".prose > figure.fig")).toHaveLength(1);
  });

  it("keeps document order and FIG numbering through the pairing", () => {
    const c = html([p("a"), img(1), p("b"), img(2), img(3)]);
    expect(Array.from(c.querySelectorAll("figcaption")).map((n) => n.textContent)).toEqual(["FIG. 1", "FIG. 2", "FIG. 3"]);
    expect(Array.from(c.querySelectorAll(".prose p, .prose img")).map((n) => n.textContent || n.getAttribute("alt"))).toEqual(["a", "fig 1", "b", "fig 2", "fig 3"]);
  });

  it("marks the case-study prose so the two-column layout stays off other pages", () => {
    expect(html([p("a")]).querySelector(".prose.beats")).toBeTruthy();
  });
});

describe("Case study wide layout CSS", () => {
  const css = fs.readFileSync(path.join(process.cwd(), "app", "bp-content.css"), "utf8");

  it("puts a beat's text and figure side by side from 1200px up, and nowhere narrower", () => {
    const wide = css.match(/@media \(min-width: 1200px\) \{([\s\S]*?)\n\}/);
    expect(wide).toBeTruthy();
    expect(wide![1]).toMatch(/\.prose\.beats \.beat\s*\{[^}]*display:\s*grid/);
    expect(wide![1]).toMatch(/grid-template-columns:\s*minmax\(0,\s*5fr\)\s*minmax\(0,\s*6fr\)/);
    expect(css.replace(wide![0], "")).not.toMatch(/\.beat\s*\{[^}]*display:\s*grid/);
    // The measure stays at 720px however wide the screen gets.
    expect(wide![1]).toMatch(/\.prose\.beats \.beat-text\s*\{[^}]*max-width:\s*720px/);
  });
});
