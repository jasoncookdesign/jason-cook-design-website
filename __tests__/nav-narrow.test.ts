import fs from "fs";
import path from "path";

describe("Nav on narrow phones", () => {
  it("hides the wordmark text visually (the link keeps its name), keeping the mark, when the bar is too narrow to fit it", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(/\.frame > \.bar\s*\{[^}]*container-type:\s*inline-size/);
    expect(css).toMatch(/@container[^{]*max-width:\s*\d+px\)\s*\{[^@]*\.bar \.wm-name\s*\{[^}]*clip:\s*rect/);
  });
});
