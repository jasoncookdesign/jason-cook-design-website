/**
 * The real stylesheet must compile through the app's own PostCSS and Tailwind pipeline. Text-level CSS tests do
 * not parse; a single invalid rule in any imported file (for example a var() inside :nth-child) takes down every
 * page with a 500. This runs the compiler in a child process, exactly as the app does, and then parses the
 * result with lightningcss, the parser Next uses, which rejects invalid rules.
 */
import { execFileSync } from "child_process";

const SCRIPT = `
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { transform } from "lightningcss";
import { readFileSync } from "node:fs";
const file = "app/globals.css";
const css = readFileSync(file, "utf8");
const result = await postcss([tailwind()]).process(css, { from: file });
const out = result.css;
// the parser Next uses for CSS: it throws on invalid rules (PostCSS alone does not)
transform({ filename: file, code: Buffer.from(out), errorRecovery: false });
for (const needle of [".frame", ".bar", ".cells", ".faq-item", ".drawing", ".lv"]) {
  if (!out.includes(needle)) { console.error("missing in compiled css: " + needle); process.exit(2); }
}
console.log("ok " + out.length);
`;

describe("stylesheet", () => {
  it("compiles through PostCSS and Tailwind and keeps the kit's selectors", () => {
    const out = execFileSync(process.execPath, ["--input-type=module", "-e", SCRIPT], {
      cwd: process.cwd(),
      encoding: "utf8",
      timeout: 60000,
    });
    expect(out).toMatch(/^ok \d+/);
  }, 90000);
});
