import { fireEvent, render } from "@testing-library/react";
import manifest from "@/data/sample-manifest.json";
import { DONE_CRITERIA, SHORT } from "@/lib/first-phase-terms";
import { BOOKING_PATH } from "@/lib/booking";
import SamplePage, { metadata } from "@/app/engagements/sample/page";

const track = jest.fn();
jest.mock("@/lib/analytics", () => ({ track: (...a: unknown[]) => track(...a) }));

beforeEach(() => track.mockClear());

const QUESTIONS = ["what-is-this", "what-you-get", "why-worth-it", "what-stands-behind", "next-step"];

describe("the sample page", () => {
  it("follows the five questions in order, each section naming the question it serves", () => {
    const { container } = render(<SamplePage />);
    const sections = Array.from(container.querySelectorAll("section[data-question]"));
    expect(sections.map((s) => s.getAttribute("data-question"))).toEqual(QUESTIONS);
  });

  it("says in its first section that this is a sample of the paid first phase's report, for a fictional client, with a guarantee behind it", () => {
    const { container } = render(<SamplePage />);
    const first = container.querySelector("section[data-question]")!.textContent!.toLowerCase();
    expect(first).toContain("sample");
    expect(first).toContain("first-phase report");
    expect(first).toContain("fictional client");
    expect(first).toContain("guarantee");
  });

  it("puts 'sample' and 'fictional client' in the title", () => {
    expect(String(metadata.title).toLowerCase()).toContain("sample");
    expect(String(metadata.title).toLowerCase()).toContain("fictional client");
  });

  it("shows six screenshots from the manifest, each with alt text, a caption and a link to the full page", () => {
    const { container } = render(<SamplePage />);
    const figs = Array.from(container.querySelectorAll("figure[data-shot]"));
    expect(figs).toHaveLength(6);
    for (const shot of manifest.shots) {
      const fig = container.querySelector(`figure[data-shot="${shot.id}"]`)!;
      const img = fig.querySelector("img")!;
      expect(img.getAttribute("alt")).toBe(shot.alt);
      expect(img.getAttribute("src")).toContain(shot.image.split("/").pop());
      expect(fig.querySelector("figcaption")!.textContent).toContain(shot.caption);
      const link = fig.querySelector("a")!;
      expect(link.getAttribute("href")).toBe(shot.full);
    }
  });

  it("offers one download of the PDF, stating its size and page count from the manifest", () => {
    const { container } = render(<SamplePage />);
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>(`a[href="${manifest.pdf.href}"]`));
    expect(links).toHaveLength(1);
    expect(links[0].hasAttribute("download")).toBe(true);
    const text = links[0].closest("[data-download]")!.textContent!;
    expect(text).toContain(`${manifest.pdf.pages} pages`);
    expect(text).toMatch(/KB|MB/);
    expect(text.toLowerCase()).toContain("sample");
    expect(text.toLowerCase()).toContain("fictional client");
  });

  it("shows the done-criteria checklist, with each criterion and the page of the report that meets it", () => {
    const { container } = render(<SamplePage />);
    const rows = Array.from(container.querySelectorAll("[data-checklist] tr")).slice(1);
    expect(rows).toHaveLength(DONE_CRITERIA.length);
    for (const c of DONE_CRITERIA) expect(container.querySelector("[data-checklist]")!.textContent).toContain(c);
    for (const row of manifest.checklist) expect(container.querySelector("[data-checklist]")!.textContent).toContain(String(row.page));
  });

  it("gives the credit and the guarantee, and who it is not for, as short forms that link to the terms page", () => {
    const { container } = render(<SamplePage />);
    expect(container.textContent).toContain(SHORT.both.text);
    expect(container.querySelector(`a[href="${SHORT.both.href}"]`)).not.toBeNull();
    expect(container.textContent).toContain(SHORT.fit.text);
    expect(container.querySelector(`a[href="${SHORT.fit.href}"]`)).not.toBeNull();
  });

  it("shows what a stop would have looked like", () => {
    const { container } = render(<SamplePage />);
    const panel = container.querySelector("[data-stop-panel]");
    expect(panel).not.toBeNull();
    expect(panel!.textContent!.toLowerCase()).toContain("stop");
  });

  it("has one primary action, the booking link", () => {
    const { container } = render(<SamplePage />);
    const primaries = Array.from(container.querySelectorAll<HTMLAnchorElement>("a.btn:not(.secondary)"));
    expect(primaries).toHaveLength(1);
    primaries.forEach((a) => expect(a.getAttribute("href")).toBe(BOOKING_PATH));
  });

  it("restates no term in full: it carries none of the long-form markers", () => {
    const { container } = render(<SamplePage />);
    const t = container.textContent!;
    expect(t).not.toMatch(/45 days|15 business days|no cash value|first invoice/);
  });
});

describe("the sample page's movement events", () => {
  it("records a download click, once per page view", () => {
    const { container } = render(<SamplePage />);
    const link = container.querySelector<HTMLAnchorElement>(`a[href="${manifest.pdf.href}"]`)!;
    fireEvent.click(link);
    fireEvent.click(link);
    expect(track.mock.calls.filter((c) => c[0] === "sample_download_click")).toHaveLength(1);
  });

  it("records a click on the call link from this page, once", () => {
    const { container } = render(<SamplePage />);
    const call = container.querySelector<HTMLAnchorElement>("a.btn:not(.secondary)")!;
    fireEvent.click(call);
    fireEvent.click(call);
    expect(track.mock.calls.filter((c) => c[0] === "sample_call_click")).toHaveLength(1);
  });

  it("records the checklist coming into view, once", () => {
    let cb: IntersectionObserverCallback = () => {};
    class IO { constructor(c: IntersectionObserverCallback) { cb = c; } observe() {} disconnect() {} unobserve() {} takeRecords() { return []; } root = null; rootMargin = ""; thresholds = []; }
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
    const { container } = render(<SamplePage />);
    const el = container.querySelector("[data-checklist]")!;
    cb([{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    cb([{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(track.mock.calls.filter((c) => c[0] === "sample_checklist_view")).toHaveLength(1);
  });
});
