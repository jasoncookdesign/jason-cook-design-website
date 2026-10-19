import { existsSync, readFileSync } from "fs";
import { join } from "path";

// URLs the old GitHub Pages site served; public/ keeps them alive after the cutover.
const legacyPdfs = [
  "resume.pdf",
  "resume_designproduction.pdf",
  "archive/portfolio-old-mobile.pdf",
];

describe("legacy PDF URLs", () => {
  it.each(legacyPdfs)("serves %s from public/ as a real PDF", (file) => {
    const path = join(process.cwd(), "public", file);
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path).subarray(0, 5).toString()).toBe("%PDF-");
  });
});
