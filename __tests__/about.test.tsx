import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import { caseStudies } from "@/lib/work";

const text = () => (document.body.textContent ?? "").replace(/\s+/g, " ");

describe("About page", () => {
  it("renders the About h1 heading", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: /About/i })).toBeTruthy();
  });

  it("opens with the first-person practice copy", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/^Most operators who end up working with me describe the same progression\./)
    ).toBeTruthy();
    expect(text()).toContain("The contexts differ. The diagnostic structure doesn't.");
    expect(text()).toContain("That judgment is what Jason Cook Design is built on.");
    expect(text()).toContain("The recommendation you can trust is the one that's built to say no.");
  });

  it("names every program documented on the Work page, and counts them correctly", () => {
    render(<AboutPage />);
    // Copy uses short names ("Ford" for "Ford Motor Company"); the leading word identifies each client.
    for (const study of caseStudies) expect(text()).toContain(study.client.split(" ")[0]);
    expect(caseStudies).toHaveLength(8);
    expect(text()).toContain("Eight of those programs are documented on the Work page");
  });

  it("keeps the entry-offer token literal until it is named", () => {
    render(<AboutPage />);
    expect(text()).toContain("That first step is [ENTRY-OFFER-NAME].");
    expect(text()).toContain("[ENTRY-OFFER-NAME] is where it starts.");
  });

  it("drops the retired third-person firm framing, the placeholder, and the optional internal-systems paragraph", () => {
    render(<AboutPage />);
    expect(text()).not.toMatch(/The firm advises/i);
    expect(text()).not.toMatch(/coming soon/i);
    expect(text()).not.toMatch(/OPTIONAL|laboratory/i);
  });

  it("keeps the factual sidebar", () => {
    render(<AboutPage />);
    expect(text()).toContain("Texas, working remotely");
    expect(screen.getByRole("link", { name: "hello@jasoncookdesign.com" })).toBeTruthy();
  });

  it("does not render generic marketing filler", () => {
    render(<AboutPage />);
    for (const phrase of [/passionate about/i, /thought leader/i, /world-class/i, /industry-leading/i,
      /innovative solutions/i, /help you achieve/i, /let's work together/i]) {
      expect(text()).not.toMatch(phrase);
    }
  });
});

describe("About page metadata", () => {
  it("has a search snippet that fits in results and drops the retired firm framing", async () => {
    const { metadata } = await import("@/app/about/page");
    const expected =
      "Enterprise-scale experience, sized for smaller businesses: strategy, design, research, and implementation in one practice, starting with a paid diagnosis.";
    expect(metadata.description).toBe(expected);
    expect(metadata.openGraph?.description).toBe(expected);
    expect(metadata.description?.length).toBeLessThanOrEqual(155);
    expect(JSON.stringify(metadata)).not.toMatch(/consultancy|founder and principal/i);
  });
});
