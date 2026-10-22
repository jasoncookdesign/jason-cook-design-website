import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { book } from "@/lib/book";

// Every file the book page links to must be in the repo, not just on one machine: a page merged without them would
// show empty picture frames and download buttons that lead nowhere.
const files = [...book.plates.map((p) => p.src), book.formats.pdf.href, book.formats.epub.href].map((href) => path.join("public", href));

describe("the files the book page links to", () => {
  it.each(files)("%s exists and is not empty", (file) => {
    expect(fs.statSync(file).size).toBeGreaterThan(0);
  });

  it.each(files)("%s is committed", (file) => {
    expect(() => execFileSync("git", ["ls-files", "--error-unmatch", "--", file], { stdio: "pipe" })).not.toThrow();
  });
});
