import { render, screen } from "@testing-library/react";
import Hero from "@/components/home/Hero";

function stat(label: string) {
  const el = screen.getByText(label);
  return (el.previousElementSibling?.textContent ?? "").trim();
}

describe("Hero stats", () => {
  it("shows countries, awards, and patents with the figures Jason supplied", () => {
    render(<Hero />);
    expect(stat("countries unified in one system")).toBe("143");
    expect(stat("industry awards for shipped work")).toBe("15");
    expect(stat("patents written or contributed")).toBe("4");
  });

  it("no longer shows an engagement count", () => {
    const { container } = render(<Hero />);
    expect(container.textContent).not.toMatch(/enterprise engagements/i);
  });

  it("no longer claims 40 awards", () => {
    const { container } = render(<Hero />);
    expect(container.textContent).not.toMatch(/\b40\b/);
  });

  it("names the offering before the operating work in the eyebrow", () => {
    render(<Hero />);
    const eyebrow = screen.getByText(/new offering to launch/i).textContent ?? "";
    expect(eyebrow.indexOf("offering")).toBeLessThan(eyebrow.indexOf("system"));
  });
});
