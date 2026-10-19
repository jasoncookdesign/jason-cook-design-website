/**
 * Dark-only shell: no theme toggle, no stored theme preference, html fixed to the dark theme.
 */
import fs from "fs";
import path from "path";
import { render, screen } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

describe("dark-only shell", () => {
  it("Nav renders no theme controls", () => {
    render(<Nav />);
    expect(screen.queryByRole("button", { name: /light|dark|theme/i })).toBeNull();
  });

  it("layout fixes data-theme to dark and reads no stored preference", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "app/layout.tsx"), "utf8");
    expect(src).toMatch(/data-theme="dark"/);
    expect(src).not.toMatch(/localStorage|jcd-theme/);
  });
});
