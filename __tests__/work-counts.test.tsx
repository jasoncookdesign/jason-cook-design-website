import { render } from "@testing-library/react";
import WorkPage from "@/app/work/page";

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

describe("Work page does not put a number on the engagements", () => {
  beforeEach(() => {
    mockStudies = [...Array.from({ length: 8 }, (_, i) => study(i + 1)), study(9, "assessment")];
  });

  it("shows no count numeral and no row index", () => {
    const { container } = render(<WorkPage />);
    const bareNumbers = Array.from(container.querySelectorAll("*")).filter(
      (el) => el.children.length === 0 && /^\d+$/.test((el.textContent ?? "").trim())
    );
    expect(bareNumbers).toHaveLength(0);
  });

  it("states no count in words or digits", () => {
    const { container } = render(<WorkPage />);
    const intro = container.querySelector("h1")!.parentElement!.querySelector("p")!.textContent ?? "";
    expect(intro).not.toMatch(/\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d+)\b/i);
    expect(intro).not.toMatch(/engagements/i);
  });

  it("still lists one link per study, assessment included", () => {
    const { container } = render(<WorkPage />);
    expect(container.querySelectorAll('a[href^="/work/"]')).toHaveLength(9);
  });

  it("keeps the diagnosis-first intro without a count", () => {
    const { container } = render(<WorkPage />);
    expect(container.textContent).toMatch(/started with a diagnosis of the actual problem/i);
  });
});
