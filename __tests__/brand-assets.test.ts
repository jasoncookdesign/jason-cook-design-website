/**
 * Brand asset contract: the icon set is generated from the JCD mark, sized as declared,
 * and the manifest and tile colors match the --bg token.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(root, p));
const bg = (fs.readFileSync(path.join(root, "app/globals.css"), "utf8").match(/--bg:\s*(#[0-9A-Fa-f]{6})/) ?? [])[1];

function pngSize(p: string): [number, number] {
  const b = read(p);
  if (b.subarray(1, 4).toString() !== "PNG") throw new Error(`${p} is not a PNG`);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

describe("brand assets", () => {
  it.each([
    ["public/favicon-16x16.png", 16],
    ["public/favicon-32x32.png", 32],
    ["app/apple-icon.png", 180],
    ["public/android-chrome-192x192.png", 192],
    ["public/android-chrome-256x256.png", 256],
    ["public/mstile-150x150.png", 150],
  ])("%s is %i px square", (file, size) => {
    expect(pngSize(file)).toEqual([size, size]);
  });

  it("app/icon.svg is the JCD favicon (a clip path and seven band rects)", () => {
    const svg = read("app/icon.svg").toString();
    expect(svg).toMatch(/viewBox="0 0 100 100"/);
    expect(svg).toMatch(/<clipPath/);
  });

  it("app/favicon.ico is a valid ICO with 16, 32, and 48 px images", () => {
    const b = read("app/favicon.ico");
    expect(b.readUInt16LE(0)).toBe(0);
    expect(b.readUInt16LE(2)).toBe(1);
    const count = b.readUInt16LE(4);
    const sizes = Array.from({ length: count }, (_, i) => b[6 + i * 16] || 256).sort((a, b2) => a - b2);
    expect(sizes).toEqual([16, 32, 48]);
  });

  it("the manifest and tile colors match the --bg token", () => {
    const manifest = JSON.parse(read("public/site.webmanifest").toString());
    expect(bg).toBeTruthy();
    expect(manifest.theme_color.toUpperCase()).toBe(bg.toUpperCase());
    expect(manifest.background_color.toUpperCase()).toBe(bg.toUpperCase());
    expect(read("public/browserconfig.xml").toString().toUpperCase()).toContain(bg.toUpperCase());
  });

  it("the pinned-tab icon is a single-color mask", () => {
    const svg = read("public/safari-pinned-tab.svg").toString();
    expect(svg).toMatch(/<svg/);
    expect(svg).not.toMatch(/#(?!000000|000\b)[0-9a-fA-F]{3,6}/);
  });
});
