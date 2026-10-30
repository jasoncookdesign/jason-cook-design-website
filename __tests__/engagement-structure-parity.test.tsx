import { render } from "@testing-library/react";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

const pages = { offering: () => <OfferingPage />, operating: () => <OperatingPage /> } as const;
const names = (c: HTMLElement) => Array.from(c.querySelectorAll("section[data-name]")).map((s) => s.getAttribute("data-name"));
const section = (c: HTMLElement, name: string) => c.querySelector(`section[data-name="${name}"]`)!;
// Generated ids (base-ui-_r_N_) count up per render; everything else must match exactly.
const html = (name: string) =>
  [render(pages.offering()), render(pages.operating())].map((r) => section(r.container, name).outerHTML.replace(/_r_[a-z0-9]+_/g, "_r_"));

describe("the two engagement pages share one structure", () => {
  it.each(Object.keys(pages) as (keyof typeof pages)[])("%s: sections run Hero, Problem, Phases, Portability, Pricing, FAQ, Close", (k) => {
    const { container } = render(pages[k]());
    expect(names(container)).toEqual(["HERO", "PROBLEM", "PHASES", "PORTABILITY", "PRICE", "FAQ", "CLOSE"]);
  });

  it.each(["PORTABILITY", "PRICE", "FAQ", "CLOSE"])("%s renders identically on both pages", (name) => {
    const [a, b] = html(name);
    expect(a).toBe(b);
  });

  it("the phase list has identical titles, keys, and field labels, and only the content differs", () => {
    const rows = (k: keyof typeof pages) =>
      Array.from(render(pages[k]()).container.querySelectorAll('section[data-name="PHASES"] ol.rows > li')).map((li) => ({
        key: li.querySelector(".k")!.textContent,
        title: li.querySelector("h3")!.textContent,
        fields: Array.from(li.querySelectorAll("dl > dt")).map((d) => d.textContent),
        optional: li.classList.contains("opt"),
      }));
    const off = rows("offering");
    const op = rows("operating");
    expect(off).toHaveLength(6);
    expect(off.map((r) => r.key)).toEqual(["00", "01", "02", "03", "04", "05"]);
    expect(off).toEqual(op);
    for (const r of off) expect(r.fields).toEqual(["What you get", "Closes with", "Scoped and priced"]);
    expect(off.map((r) => r.optional)).toEqual([false, false, false, false, false, true]);
  });

  it("the phase section's heading furniture is shared", () => {
    const [a, b] = [render(pages.offering()), render(pages.operating())].map((r) => {
      const s = section(r.container, "PHASES");
      return [s.querySelector(".eyebrow")!.textContent, s.querySelector("h2")!.textContent];
    });
    expect(a).toEqual(b);
  });

  it("the hero differs only in its headline and its first paragraph", () => {
    const parts = (k: keyof typeof pages) => {
      const hero = section(render(pages[k]()).container, "HERO");
      return {
        paras: Array.from(hero.querySelectorAll(".eng-hero-copy p")).map((p) => p.textContent),
        metric: hero.querySelector("[data-hero-metric]")!.textContent,
      };
    };
    const off = parts("offering");
    const op = parts("operating");
    expect(off.paras.slice(1)).toEqual(op.paras.slice(1));
    expect(off.paras[0]).not.toBe(op.paras[0]);
    expect(off.metric).toBe(op.metric);
  });
});
