import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("NotFound (404) page", () => {
  it("renders a heading indicating the page was not found", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: /Page not found/i })
    ).toBeTruthy();
  });

  it("renders a link back to the home page", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink).toBeTruthy();
    expect((homeLink as HTMLAnchorElement).getAttribute("href")).toBe("/");
  });
});
