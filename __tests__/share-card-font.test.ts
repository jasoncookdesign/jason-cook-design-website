import { readFileSync } from "fs";
import { join } from "path";

// The share cards are set in Newsreader, the site's serif, so a link preview matches the page it links to.
// ImageResponse reads TTF, OTF, or WOFF (not WOFF2), so the files are vendored here with their license.
const FONTS = join(process.cwd(), "lib/fonts");
const route = readFileSync(join(process.cwd(), "app/card/[...path]/route.tsx"), "utf8");

describe("share card font", () => {
  it.each(["Newsreader-Regular.woff", "Newsreader-SemiBold.woff"])("%s is a WOFF file the card route loads", (file) => {
    expect(readFileSync(join(FONTS, file)).subarray(0, 4).toString("latin1")).toBe("wOFF");
    expect(route).toContain(file);
  });

  it("ships the SIL Open Font License beside the fonts", () => {
    expect(readFileSync(join(FONTS, "OFL.txt"), "utf8")).toMatch(/SIL Open Font License, Version 1\.1/);
  });

  it("sets the card text in Newsreader", () => {
    expect(route).toMatch(/name:\s*"Newsreader"/);
    expect(route).toMatch(/fontFamily:\s*"Newsreader"/);
  });
});
