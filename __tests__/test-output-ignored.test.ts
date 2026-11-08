import { execFileSync } from "child_process";

// Playwright writes its run record and reports into the working tree. They are build output, not source:
// git must ignore them and track none, or every e2e run leaves the tree dirty.
const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8" });
const ignored = (path: string) => {
  try {
    git("check-ignore", "-q", path);
    return true;
  } catch {
    return false;
  }
};

describe("Playwright output", () => {
  it.each(["test-results/.last-run.json", "test-results/some-run/error-context.md", "playwright-report/index.html", "blob-report/report.zip", "playwright/.cache/state.json"])(
    "ignores %s",
    (path) => expect(ignored(path)).toBe(true),
  );

  it("tracks nothing under the output folders", () => {
    expect(git("ls-files", "test-results", "playwright-report", "blob-report", "playwright/.cache").trim()).toBe("");
  });

  it("still tracks the e2e specs", () => {
    expect(git("ls-files", "e2e").split("\n")).toContain("e2e/share-cards.spec.ts");
    expect(ignored("e2e/share-cards.spec.ts")).toBe(false);
  });
});
