import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/layout/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.clear();
  });

  it("renders Light and Dark controls", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /Light/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Dark/i })).toBeTruthy();
  });

  it("switches data-theme on <html> and persists the choice", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /Dark/i }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("jcd-theme")).toBe("dark");

    fireEvent.click(screen.getByRole("button", { name: /Light/i }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("jcd-theme")).toBe("light");
  });
});
