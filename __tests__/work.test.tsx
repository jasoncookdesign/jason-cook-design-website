import { render, screen } from "@testing-library/react";
import WorkPage from "@/app/work/page";
import WorkCaseStudyContent from "@/components/work/WorkCaseStudyContent";
import { caseStudies } from "@/lib/work";

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
      expect(cs.testimonial).toBeTruthy();
      expect(cs.testimonial.quote).toBeTruthy();
      expect(cs.testimonial.name).toBeTruthy();
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

  it("renders the Qu POS $10 million outcome verbatim", () => {
    const cs = caseStudies.find((c) => c.slug === "qu-pos")!;
    render(<WorkCaseStudyContent cs={cs} />);
    expect(document.body.textContent).toMatch(/\$10 million/);
    expect(document.body.textContent).toMatch(/100% enterprise client retention/);
  });

  it("renders the Meevo 40 industry awards verbatim", () => {
    const cs = caseStudies.find((c) => c.slug === "millennium-meevo")!;
    render(<WorkCaseStudyContent cs={cs} />);
    expect(document.body.textContent).toMatch(/40.*industry awards/i);
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
