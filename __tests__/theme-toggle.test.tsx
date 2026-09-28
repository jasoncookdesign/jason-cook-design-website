import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/layout/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.clear();
  });

  it("renders Light and Dark controls with icons and aria-labels", () => {
    render(<ThemeToggle />);
    const lightBtn = screen.getByRole("button", { name: "Light theme" });
    const darkBtn = screen.getByRole("button", { name: "Dark theme" });
    expect(lightBtn).toBeTruthy();
    expect(darkBtn).toBeTruthy();
    // Each button must contain an SVG icon (no visible text labels)
    expect(lightBtn.querySelector("svg")).toBeTruthy();
    expect(darkBtn.querySelector("svg")).toBeTruthy();
  });

  it("switches data-theme on <html> and persists the choice", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Dark theme" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("jcd-theme")).toBe("dark");

    fireEvent.click(screen.getByRole("button", { name: "Light theme" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("jcd-theme")).toBe("light");
  });
});
