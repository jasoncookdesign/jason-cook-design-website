import { execFileSync, spawnSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const script = path.resolve(__dirname, "..", ".sdlc", "check-no-client-terms.sh");
const TERM = "zzfixtureterm";

function sh(cwd: string, args: string[]) {
  execFileSync("git", args, { cwd, stdio: "ignore" });
}

function makeRepo(files: Record<string, string>, tracked: string[]) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "terms-"));
  sh(dir, ["init", "-q"]);
  for (const [rel, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), body);
  }
  if (tracked.length) sh(dir, ["add", ...tracked]);
  return dir;
}

function run(cwd: string, termsFile?: string) {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.CLIENT_TERMS_FILE;
  if (termsFile !== undefined) env.CLIENT_TERMS_FILE = termsFile;
  return spawnSync("bash", [script], { cwd, env, encoding: "utf8" });
}

function termsFile(body: string) {
  const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "termsfile-")), "terms.txt");
  fs.writeFileSync(f, body);
  return f;
}

describe("check-no-client-terms.sh (M9, INV-10)", () => {
  it("passes on a clean repo when terms are supplied", () => {
    const dir = makeRepo({ "a.md": "nothing here\n", ".sdlc/n.md": "clean\n" }, ["a.md", ".sdlc/n.md"]);
    expect(run(dir, termsFile(`${TERM}\n`)).status).toBe(0);
  });

  it("fails when CLIENT_TERMS_FILE is unset", () => {
    const dir = makeRepo({ "a.md": "x\n" }, ["a.md"]);
    const r = run(dir);
    expect(r.status).not.toBe(0);
    expect(r.stderr + r.stdout).toMatch(/CLIENT_TERMS_FILE/);
  });

  it("fails when the terms file is missing or unreadable", () => {
    const dir = makeRepo({ "a.md": "x\n" }, ["a.md"]);
    expect(run(dir, path.join(dir, "no-such-file.txt")).status).not.toBe(0);
  });

  it("fails when the terms file holds no terms, so an empty list cannot pass silently", () => {
    const dir = makeRepo({ "a.md": "x\n" }, ["a.md"]);
    expect(run(dir, termsFile("\n# only a comment\n\n")).status).not.toBe(0);
  });

  it("fails on a term in a tracked file, naming the file and line but never the term", () => {
    const dir = makeRepo({ "docs/a.md": `line one\nmentions ${TERM} here\n` }, ["docs/a.md"]);
    const r = run(dir, termsFile(`${TERM}\n`));
    expect(r.status).not.toBe(0);
    const out = r.stdout + r.stderr;
    expect(out).toContain("docs/a.md");
    expect(out).toMatch(/docs\/a\.md:?\s*2|docs\/a\.md.*\b2\b/);
    expect(out.toLowerCase()).not.toContain(TERM);
  });

  it("matches case-insensitively", () => {
    const dir = makeRepo({ "a.md": "ZZFixtureTerm\n" }, ["a.md"]);
    expect(run(dir, termsFile(`${TERM}\n`)).status).not.toBe(0);
  });

  it("scans .sdlc even when its files are untracked", () => {
    const dir = makeRepo({ "a.md": "clean\n", ".sdlc/n.md": `${TERM}\n` }, ["a.md"]);
    expect(run(dir, termsFile(`${TERM}\n`)).status).not.toBe(0);
  });

  it("ignores untracked files outside .sdlc", () => {
    const dir = makeRepo({ "a.md": "clean\n", "scratch.md": `${TERM}\n` }, ["a.md"]);
    expect(run(dir, termsFile(`${TERM}\n`)).status).toBe(0);
  });

  it("finds a term in source files at any depth, including paths with spaces", () => {
    for (const rel of ["components/x/y.tsx", "lib/z.ts", "app/some dir/page.tsx", "README.md"]) {
      const dir = makeRepo({ [rel]: `export const a = "${TERM}";\n`, "ok.md": "clean\n" }, [rel, "ok.md"]);
      expect(run(dir, termsFile(`${TERM}\n`)).status).not.toBe(0);
    }
  });

  it("uses every term in the terms file, not only the first", () => {
    const dir = makeRepo({ "a.md": "second term here: otherfixture\n" }, ["a.md"]);
    expect(run(dir, termsFile(`${TERM}\notherfixture\n`)).status).not.toBe(0);
  });

  it("tolerates a terms file with Windows line endings or trailing spaces", () => {
    const dir = makeRepo({ "a.md": `${TERM}\n` }, ["a.md"]);
    expect(run(dir, termsFile(`${TERM}\r\n`)).status).not.toBe(0);
    expect(run(dir, termsFile(`${TERM}   \n`)).status).not.toBe(0);
  });

  it("treats a term as a fixed string, not a pattern, and skips blank and comment lines", () => {
    const dir = makeRepo({ "a.md": "abc\n" }, ["a.md"]);
    expect(run(dir, termsFile("# note\n\na.c\n")).status).toBe(0);
    const dir2 = makeRepo({ "a.md": "a.c\n" }, ["a.md"]);
    expect(run(dir2, termsFile("# note\n\na.c\n")).status).not.toBe(0);
  });
});
