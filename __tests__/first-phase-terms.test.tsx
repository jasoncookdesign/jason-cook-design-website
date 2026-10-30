import fs from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { ANCHORS, DONE_CRITERIA, LONG, SHORT, TERMS_PATH, hrefFor } from "@/lib/first-phase-terms";
import FirstPhasePage from "@/app/engagements/first-phase/page";

const longText = () =>
  [
    ...LONG.whatItAsks.paragraphs,
    LONG.fit.forYouIntro, ...LONG.fit.forYou, LONG.fit.notForYouIntro, ...LONG.fit.notForYou,
    ...LONG.credit.paragraphs,
    ...LONG.guarantee.paragraphs, LONG.guarantee.exclusionsIntro, ...LONG.guarantee.exclusions,
  ].join("\n");

describe("the public text of the first phase's credit, guarantee and fit", () => {
  it("states each customer-facing term of the credit", () => {
    const t = LONG.credit.paragraphs.join("\n");
    expect(t).toMatch(/credited in full|comes off its price in full/i);
    expect(t).toMatch(/applied automatically on that phase's first invoice/i);
    expect(t).toMatch(/45 days from the day I issue it/);
    expect(t).toMatch(/extend it once, by up to 30 days/);
    expect(t).toMatch(/can't move to another project or another company/);
    expect(t).toMatch(/no cash value/);
    expect(t).toMatch(/not a deposit/i);
  });

  it("states each customer-facing term of the guarantee", () => {
    const t = [...LONG.guarantee.paragraphs, LONG.guarantee.exclusionsIntro, ...LONG.guarantee.exclusions].join("\n");
    expect(t).toMatch(/list of what the report will contain/i);
    expect(t).toMatch(/within 15 business days of delivery/);
    expect(t).toMatch(/within 3 business days/);
    expect(t).toMatch(/within 10 business days.*one round|one round/i);
    expect(t).toMatch(/refund the \$2,500 in full within 10 business days/);
    expect(t).toMatch(/you keep the report/);
    expect(LONG.guarantee.exclusions).toHaveLength(3);
    expect(LONG.guarantee.exclusions.join(" ")).toMatch(/conclusion/i);
    expect(LONG.guarantee.exclusions.join(" ")).toMatch(/after the first phase/i);
    expect(LONG.guarantee.exclusions.join(" ")).toMatch(/requested information/i);
  });

  it("keeps the terms that stay in the decision records out of the public text", () => {
    const t = longText();
    expect(t).not.toMatch(/carries to the next invoice|rest carries|remainder/i);
    expect(t).not.toMatch(/take your side|in your favor|benefit of the doubt/i);
    expect(t).not.toMatch(/refund also ends the credit|ends the credit/i);
  });

  it("carries no internal process language", () => {
    expect(longText()).not.toMatch(/DEC-JCD|amendment|policy|Opportunity Selection|CEO/i);
  });

  it("states who it is for and who it is not, with the three disqualifiers", () => {
    expect(LONG.fit.forYou).toHaveLength(3);
    expect(LONG.fit.notForYou).toHaveLength(3);
    const n = LONG.fit.notForYou.join(" ");
    expect(n).toMatch(/exactly what you want built/i);
    expect(n).toMatch(/pick a tool/i);
    expect(n).toMatch(/two to three hours/i);
  });

  it("lists the done criteria the guarantee covers", () => {
    expect(DONE_CRITERIA).toHaveLength(7);
    expect(new Set(DONE_CRITERIA).size).toBe(7);
  });

  it("gives every short form text, a label and a full-path link to the matching anchor", () => {
    for (const [name, anchor] of [["credit", ANCHORS.credit], ["guarantee", ANCHORS.guarantee], ["both", ANCHORS.credit], ["fit", ANCHORS.fit]] as const) {
      const s = SHORT[name];
      expect(s.text.length).toBeGreaterThan(20);
      expect(s.label.length).toBeGreaterThan(3);
      expect(s.href).toBe(`${TERMS_PATH}#${anchor}`);
    }
    expect(hrefFor(ANCHORS.credit)).toBe("/engagements/first-phase#credit");
  });

  it("keeps every short form shorter than the long form it stands for", () => {
    expect(SHORT.both.text.length).toBeLessThan(longText().length / 3);
  });
});

describe("the first-phase terms page", () => {
  it("renders the four anchored sections in order, once", () => {
    const { container } = render(<FirstPhasePage />);
    const ids = Array.from(container.querySelectorAll("[id]")).map((e) => e.id).filter((id) => Object.values(ANCHORS).includes(id as never));
    expect(ids).toEqual([ANCHORS.whatItAsks, ANCHORS.fit, ANCHORS.credit, ANCHORS.guarantee]);
  });

  it("renders the long form text from the approved module", () => {
    const { container } = render(<FirstPhasePage />);
    const text = container.textContent ?? "";
    expect(text).toContain(LONG.credit.paragraphs[0]);
    expect(text).toContain(LONG.guarantee.paragraphs[0]);
    for (const x of LONG.fit.notForYou) expect(text).toContain(x);
    for (const x of LONG.guarantee.exclusions) expect(text).toContain(x);
  });
});

describe("the long form lives in one place", () => {
  const roots = ["app", "components", "lib"];
  const markers = [/45 days/, /15 business days/, /no cash value/, /first invoice/, /you keep the report/i];
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
    }
  };
  roots.forEach((r) => walk(path.join(process.cwd(), r)));

  it("restates the terms in full only in the approved-text module", () => {
    const offenders = files.filter((f) => !f.endsWith(path.join("lib", "first-phase-terms.ts"))).filter((f) => {
      const s = fs.readFileSync(f, "utf8");
      return markers.some((m) => m.test(s));
    });
    expect(offenders.map((f) => path.relative(process.cwd(), f))).toEqual([]);
  });
});
