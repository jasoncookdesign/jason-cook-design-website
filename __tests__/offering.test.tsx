import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import OfferingPage from "@/app/engagements/offering/page";
import { expectValidHeadingOrder } from "./helpers/headings";
import { hasFeeFigure } from "./helpers/prices";

const root = path.resolve(__dirname, "..");
// REQ-15, whole page: availability is never expected, inevitable, or the next step.
const FORBIDDEN_PAGE = [
  /inevitabl/i,
  /natural (next|follow)/i,
  /(is|are|will be|should be) expected/i,
  /expected (next|follow)/i,
  /the next step/i,
];
// REQ-15, sixth phase only: stricter, because this is where the claim would be made.
const FORBIDDEN_SIXTH = [
  /next step/i,
  /\bexpect/i,
  /(presumed|assumed) (to|as)/i,
  /\bdefault\b/i,
  /(most|every|all) (clients|engagements)/i,
  /you'll (want|need) to/i,
  /plan for it/i,
];
const OPT_OUT = /(no need|not required|decline|skip|stop here|without it|no obligation|you can (stop|decline|skip))/i;
const OPTIONAL = /optional|if you want|only if|your choice/i;

function phases(container: HTMLElement) {
  const lists = container.querySelectorAll("ol");
  expect(lists).toHaveLength(1);
  return Array.from(lists[0].children).filter((c) => c.tagName === "LI") as HTMLElement[];
}

describe("Offering Engagement problem section", () => {
  const LABELS = ["The idea", "The quick build", "The advice", "One owner"];

  it("renders four problem cards ahead of the phases", () => {
    render(<OfferingPage />);
    for (const label of LABELS) expect(screen.getByText(label)).toBeTruthy();
    const phase = screen.getByRole("heading", { level: 3, name: "Assess the decision" });
    expect(
      screen.getByText("The idea").compareDocumentPosition(phase) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("scopes the section with an eyebrow placed directly before its heading", () => {
    render(<OfferingPage />);
    const heading = screen.getByRole("heading", { name: /decision to make/i });
    const eyebrow = heading.previousElementSibling;
    expect(eyebrow?.tagName).toBe("P");
    expect((eyebrow!.textContent ?? "").trim().length).toBeGreaterThan(5);
  });

  it("shares no card with the operating problem cards", () => {
    const { container } = render(<OfferingPage />);
    expect(container.textContent).not.toMatch(/The old way|The internal attempt|The search outside|outgrown the systems/);
  });
});

describe("Offering Engagement page", () => {
  it("names itself", () => {
    render(<OfferingPage />);
    expect(screen.getAllByText("Offering Engagement").length).toBeGreaterThan(0);
  });

  it("has one h1 and a valid heading order", () => {
    const { container } = render(<OfferingPage />);
    expectValidHeadingOrder(container);
  });

  it("presents exactly six phases in the page's only ordered list", () => {
    const { container } = render(<OfferingPage />);
    expect(phases(container)).toHaveLength(6);
  });

  it("gives every phase its own label and its own 'hold' and 'close' statements under shared, distinct field labels", () => {
    const { container } = render(<OfferingPage />);
    const items = phases(container);
    expect(items).toHaveLength(6);
    const labels = items.map((li) => li.querySelector("h3")?.textContent?.trim() ?? "");
    expect(new Set(labels).size).toBe(6);
    for (const l of labels) expect(l.length).toBeGreaterThan(4);

    const dtSets = items.map((li) => Array.from(li.querySelectorAll("dl > dt")).map((d) => (d.textContent ?? "").trim()));
    const holds: string[] = [];
    const closes: string[] = [];
    items.forEach((li, i) => {
      const dls = li.querySelectorAll("dl");
      expect(dls).toHaveLength(1);
      expect(dtSets[i]).toHaveLength(2);
      expect(li.querySelectorAll("dl > dd")).toHaveLength(2);
      const dds = Array.from(li.querySelectorAll("dl > dd")).map((d) => (d.textContent ?? "").trim());
      for (const dd of dds) expect(dd.split(/\s+/).length).toBeGreaterThanOrEqual(5);
      holds.push(dds[0]);
      closes.push(dds[1]);
    });
    // The same two labels in every phase, and the two labels differ and are real words.
    for (const set of dtSets) expect(set).toEqual(dtSets[0]);
    expect(dtSets[0][0]).not.toBe(dtSets[0][1]);
    for (const l of dtSets[0]) expect(l.length).toBeGreaterThanOrEqual(5);
    expect(new Set(holds).size).toBe(6);
    expect(new Set(closes).size).toBe(6);
  });

  it("presents the sixth phase as optional, names at least two distinct forms, and carries an explicit opt-out", () => {
    const { container } = render(<OfferingPage />);
    const sixth = phases(container)[5];
    expect(sixth).toBeDefined();
    const forms = Array.from(sixth.querySelectorAll("ul > li")).map((li) => (li.textContent ?? "").trim());
    expect(forms.length).toBeGreaterThanOrEqual(2);
    expect(new Set(forms.map((f) => f.toLowerCase())).size).toBe(forms.length);
    for (const f of forms) expect(f.split(/\s+/).length).toBeGreaterThanOrEqual(2);
    const text = sixth.textContent ?? "";
    expect(text).toMatch(OPTIONAL);
    expect(text).toMatch(OPT_OUT);
    for (const re of FORBIDDEN_SIXTH) expect(text).not.toMatch(re);
  });

  it("never describes ongoing availability as expected, inevitable, or the next step anywhere on the page", () => {
    const { container } = render(<OfferingPage />);
    const text = container.textContent ?? "";
    expect(text.length).toBeGreaterThan(200);
    for (const re of FORBIDDEN_PAGE) expect(text).not.toMatch(re);
  });

  it("states that no contract covers the whole engagement and that work can be handed to someone else at each seam", () => {
    const { container } = render(<OfferingPage />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/no contract (covers|spans|binds)/i);
    expect(text).toMatch(/(another provider|your own team|someone else)/i);
  });

  it("shows no fee figure in any form, and carries the price-pending token", () => {
    const { container } = render(<OfferingPage />);
    expect(hasFeeFigure(container.textContent ?? "")).toBe(false);
    expect(screen.getAllByText(/\[GAP: Phase 0 price pending\]/).length).toBeGreaterThan(0);
  });

  it("makes none of the universal claims the operating page used to make", () => {
    const { container } = render(<OfferingPage />);
    expect(container.textContent).not.toMatch(/Every engagement opens the same way/i);
    expect(container.textContent).not.toMatch(/The first step costs/i);
  });

  it("marks every source file of the page as a draft", () => {
    const dir = path.join(root, "components", "engagements", "offering");
    const files = [
      path.join(root, "app", "engagements", "offering", "page.tsx"),
      ...fs.readdirSync(dir).filter((f) => f.endsWith(".tsx")).map((f) => path.join(dir, f)),
    ];
    expect(files.length).toBeGreaterThan(1);
    for (const f of files) expect(fs.readFileSync(f, "utf8")).toContain("DRAFT — Jason to edit");
  });
});
