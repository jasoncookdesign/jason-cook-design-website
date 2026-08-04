import { render, screen } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

describe("Nav", () => {
  it("renders the brand name", () => {
    render(<Nav />);
    expect(screen.getByText(/Jason Cook Design/i)).toBeTruthy();
  });

  it("renders all five main nav links", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /Home/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Work/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Engagements/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Writing/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /About/i })).toBeTruthy();
  });

  it("renders the CTA button linking to cal.com", () => {
    render(<Nav />);
    const cta = screen.getByRole("link", { name: /Start a conversation/i });
    expect(cta).toBeTruthy();
    expect((cta as HTMLAnchorElement).href).toContain("cal.com");
  });
});
