import { render, screen } from "@testing-library/react";
import WorkPage from "@/app/work/page";

// A getter keeps the mocked module live, so each test sets its own data without re-requiring the page.
let mockStudies: unknown[] = [];
jest.mock("@/lib/work", () => ({
  get caseStudies() {
    return mockStudies;
  },
}));

function study(i: number, kind?: "assessment") {
  return {
    slug: `study-${i}`,
    client: `Client ${i}`,
    title: `Title ${i}`,
    subtitle: `Subtitle ${i}`,
    indexOneLiner: `One liner ${i}`,
    backgroundImage: "/images/background_cs01.jpg",
    sections: [],
    ...(kind ? { kind } : { testimonial: { quote: "q", name: "n", role: "r" } }),
  };
}

const eight = Array.from({ length: 8 }, (_, i) => study(i + 1));
const WORDS: Record<number, string> = { 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve" };

function introOf(container: HTMLElement) {
  const h1 = container.querySelector("h1")!;
  const p = h1.parentElement!.querySelector("p")!;
  return (p.textContent ?? "").toLowerCase();
}

describe("Work page counts follow the data (INV-04)", () => {
  it("reads 08 for eight studies: the numeral and the last row index", () => {
    mockStudies = eight;
    render(<WorkPage />);
    expect(screen.getAllByText("08")).toHaveLength(2);
    expect(screen.queryByText("09")).toBeNull();
  });

  it("reads 09 for nine studies, one of them an assessment", () => {
    mockStudies = [...eight, study(9, "assessment")];
    render(<WorkPage />);
    expect(screen.getAllByText("09")).toHaveLength(2);
    expect(screen.queryAllByText("08")).toHaveLength(1);
  });

  it("lists one row per study, assessment included", () => {
    mockStudies = [...eight, study(9, "assessment")];
    const { container } = render(<WorkPage />);
    expect(container.querySelectorAll('a[href^="/work/"]')).toHaveLength(9);
  });

  it("reads 11 for eleven studies, so the numeral is computed rather than switched between two values", () => {
    mockStudies = [...eight, study(9, "assessment"), study(10, "assessment"), study(11, "assessment")];
    render(<WorkPage />);
    expect(screen.getAllByText("11")).toHaveLength(2);
    expect(screen.queryByText("08")).not.toBeNull();
  });

  it.each([8, 9, 11])("states the count in its intro for %i studies", (n) => {
    mockStudies = Array.from({ length: n }, (_, i) => (i < 8 ? study(i + 1) : study(i + 1, "assessment")));
    const { container } = render(<WorkPage />);
    const intro = introOf(container);
    expect(intro.includes(String(n)) || intro.includes(WORDS[n])).toBe(true);
  });

  it("does not say 'Eight enterprise engagements' once the set is mixed", () => {
    mockStudies = [...eight, study(9, "assessment")];
    const { container } = render(<WorkPage />);
    expect(container.textContent).not.toMatch(/Eight enterprise engagements/);
  });
});
