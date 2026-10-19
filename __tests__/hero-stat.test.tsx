import { render, screen } from "@testing-library/react";
import Hero from "@/components/home/Hero";

let mockStudies: unknown[] = [];
jest.mock("@/lib/work", () => ({
  get caseStudies() {
    return mockStudies;
  },
}));

const enterprise = (n: number) => Array.from({ length: n }, (_, i) => ({ slug: `e${i}` }));
const assessment = (n: number) => Array.from({ length: n }, (_, i) => ({ slug: `a${i}`, kind: "assessment" }));

function statValue() {
  const label = screen.getByText("enterprise engagements");
  return (label.previousElementSibling?.textContent ?? "").trim();
}

describe("Hero stat counts enterprise programs only (INV-04)", () => {
  it("reads 8 for eight enterprise studies", () => {
    mockStudies = enterprise(8);
    render(<Hero />);
    expect(statValue()).toBe("8");
  });

  it("still reads 8 when an assessment is added", () => {
    mockStudies = [...enterprise(8), ...assessment(1)];
    render(<Hero />);
    expect(statValue()).toBe("8");
  });

  it("follows the data: nine enterprise studies and one assessment read 9", () => {
    mockStudies = [...enterprise(9), ...assessment(1)];
    render(<Hero />);
    expect(statValue()).toBe("9");
  });
});
