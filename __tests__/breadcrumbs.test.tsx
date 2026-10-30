import { render, screen } from "@testing-library/react";
import { trailFor } from "@/lib/breadcrumbs";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { caseStudies } from "@/lib/work";
import { posts } from "@/lib/writing";

let mockPathname: string | null = null;
jest.mock("next/navigation", () => ({ usePathname: () => mockPathname }));

const labels = (p: string) => trailFor(p)?.map((c) => c.label);
const hrefs = (p: string) => trailFor(p)?.map((c) => c.href);

describe("trailFor", () => {
  it("has no trail on the home page or on an unknown route", () => {
    expect(trailFor("/")).toBeNull();
    expect(trailFor("/nope")).toBeNull();
    expect(trailFor("/engagements/nope")).toBeNull();
    expect(trailFor(null)).toBeNull();
  });

  it("puts the engagement types, the first phase, and the sample side by side under Engagements", () => {
    for (const [path, label] of [
      ["/engagements/offering", "Offering Engagement"],
      ["/engagements/operating", "Operating Engagement"],
      ["/engagements/first-phase", "The first phase"],
      ["/engagements/sample", "Sample report"],
    ]) {
      expect(labels(path)).toEqual(["Home", "Engagements", label]);
      expect(hrefs(path)!.slice(0, 2)).toEqual(["/", "/engagements"]);
    }
  });

  it("covers every top-level page", () => {
    expect(labels("/engagements")).toEqual(["Home", "Engagements"]);
    for (const [path, label] of [["/about", "About"], ["/capabilities", "Capabilities"], ["/contact", "Contact"], ["/legal", "Legal"], ["/meet", "Meet"], ["/work", "Work"], ["/writing", "Writing"]]) {
      expect(labels(path)).toEqual(["Home", label]);
    }
  });

  it("names case studies and posts under their section", () => {
    expect(labels(`/work/${caseStudies[0].slug}`)).toEqual(["Home", "Work", caseStudies[0].client]);
    const p = posts[0];
    expect(labels(`/writing/blog/${p.slug}`)).toEqual(["Home", "Writing", p.shortTitle ?? p.title]);
    expect(labels("/writing/longform")).toEqual(["Home", "Writing", "Longform"]);
    expect(trailFor("/work/not-a-study")).toBeNull();
    expect(trailFor("/writing/blog/not-a-post")).toBeNull();
  });

  it("ignores a trailing slash", () => {
    expect(labels("/engagements/first-phase/")).toEqual(["Home", "Engagements", "The first phase"]);
  });
});

describe("Breadcrumb", () => {
  it("renders nothing on the home page", () => {
    mockPathname = "/";
    const { container } = render(<Breadcrumb />);
    expect(container.firstChild).toBeNull();
  });

  it("links every ancestor and marks the current page without a link", () => {
    mockPathname = "/engagements/first-phase";
    render(<Breadcrumb />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    const links = Array.from(nav.querySelectorAll("a")).map((a) => [a.textContent, a.getAttribute("href")]);
    expect(links).toEqual([["Home", "/"], ["Engagements", "/engagements"]]);
    const current = nav.querySelector('[aria-current="page"]')!;
    expect(current.textContent).toBe("The first phase");
    expect(current.closest("a")).toBeNull();
  });

  it("is an ordered list so assistive tech announces the depth", () => {
    mockPathname = "/work";
    render(<Breadcrumb />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" }).querySelectorAll("ol > li")).toHaveLength(2);
  });
});
