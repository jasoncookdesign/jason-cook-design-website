import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { SHORT } from "@/lib/first-phase-terms";
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
    const phase = screen.getByRole("heading", { level: 3, name: "Assess it" });
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

describe("Offering Engagement opens with a paid first phase", () => {
  it("says on the offering page that the first phase is paid and prices it at $2,500, with no other fee figure", () => {
    const { container } = render(<OfferingPage />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/first phase is paid/i);
    expect(text).toContain("$2,500");
    expect(hasFeeFigure(text.replaceAll("$2,500", ""))).toBe(false);
  });

  it("gives the credit and the guarantee as a short form with a link to the terms page, with no other fee figure", () => {
    const { container } = render(<OfferingPage />);
    const text = container.textContent ?? "";
    expect(text).toContain(SHORT.both.text);
    expect(container.querySelector(`a[href="${SHORT.both.href}"]`)).not.toBeNull();
    expect(hasFeeFigure(text.replaceAll("$2,500", ""))).toBe(false);
  });

  it("says on the home page that the Offering Engagement opens with a paid assessment", () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).toMatch(/Offering Engagement opens with a paid assessment of the decision/);
    expect(container.textContent).toMatch(/the first phase is a paid assessment of the decision itself/);
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

  it("gives every phase its own label and its own 'what you get' and 'closes with' statements under shared field labels", () => {
    const { container } = render(<OfferingPage />);
    const items = phases(container);
    expect(items).toHaveLength(6);
    const labels = items.map((li) => li.querySelector("h3")?.textContent?.trim() ?? "");
    expect(new Set(labels).size).toBe(6);
    for (const l of labels) expect(l.length).toBeGreaterThan(4);
    const gets: string[] = [];
    const closes: string[] = [];
    for (const li of items) {
      expect(li.querySelectorAll("dl")).toHaveLength(1);
      const dts = Array.from(li.querySelectorAll("dl > dt")).map((d) => (d.textContent ?? "").trim());
      expect(dts).toEqual(["What you get", "Closes with", "Scoped and priced"]);
      const dds = Array.from(li.querySelectorAll("dl > dd")).map((d) => (d.textContent ?? "").trim());
      gets.push(dds[0]);
      closes.push(dds[1]);
    }
    // The optional last phase says the same thing on both pages; every other phase has its own statements.
    expect(new Set(gets).size).toBe(6);
    expect(new Set(closes.slice(0, 5)).size).toBe(5);
  });

  it("presents the sixth phase as optional, and carries an explicit opt-out", () => {
    const { container } = render(<OfferingPage />);
    const sixth = phases(container)[5];
    expect(sixth).toBeDefined();
    expect(sixth.classList.contains("opt")).toBe(true);
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

  it("prices only the first phase: $2,500 appears with that phase, and the token is gone", () => {
    const { container } = render(<OfferingPage />);
    expect(screen.queryByText(/\[GAP: Phase 0 price pending\]/)).toBeNull();
    const card = screen.getByText(/only part with a price I can publish: \$2,500/).closest("div")!;
    expect(card.textContent).toContain("first phase is paid");
    expect(container.textContent).toMatch(/Every later phase is quoted on its own/);
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
