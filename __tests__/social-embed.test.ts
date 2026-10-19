import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { metadata } from "@/app/layout";

// The share card for SMS, RCS, iMessage, and chat apps: they read og:title, og:description, and og:image from
// the page. The image is a 1200 x 630 PNG under 600 KB with alt text; the URLs are absolute against the site's
// domain. Every page that sets its own openGraph still gets the card (see the page-level test below).

const png = join(process.cwd(), "app/opengraph-image.png");
const readPngSize = (f: string) => {
  const b = readFileSync(f);
  expect(b.subarray(1, 4).toString()).toBe("PNG");
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
};

describe("social card image", () => {
  it("is a 1200 x 630 PNG under 600 KB, with alt text, and the twitter card matches", () => {
    expect(readPngSize(png)).toEqual({ w: 1200, h: 630 });
    expect(statSync(png).size).toBeLessThan(600 * 1024);
    expect(readFileSync(join(process.cwd(), "app/opengraph-image.alt.txt"), "utf8")).toMatch(/Jason Cook Design/);
    expect(readPngSize(join(process.cwd(), "app/twitter-image.png"))).toEqual({ w: 1200, h: 630 });
    expect(existsSync(join(process.cwd(), "app/twitter-image.alt.txt"))).toBe(true);
  });
});

describe("site metadata", () => {
  it("resolves URLs against the site's domain and names the site", () => {
    expect(String(metadata.metadataBase)).toBe("https://jasoncookdesign.com/");
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.siteName).toBe("Jason Cook Design");
    expect(og.url).toBe("/");
    expect(og.locale).toBe("en_US");
  });

  it("asks for the large image card on Twitter-style unfurls", () => {
    expect((metadata.twitter as { card: string }).card).toBe("summary_large_image");
  });
});

import { metadata as about } from "@/app/about/page";
import { metadata as capabilities } from "@/app/capabilities/page";
import { metadata as contact } from "@/app/contact/page";
import { metadata as engagements } from "@/app/engagements/page";
import { metadata as offering } from "@/app/engagements/offering/page";
import { metadata as operating } from "@/app/engagements/operating/page";
import { metadata as legal } from "@/app/legal/page";
import { metadata as work } from "@/app/work/page";
import { metadata as writing } from "@/app/writing/page";

describe("every page keeps the share card", () => {
  it.each([
    ["about", about], ["capabilities", capabilities], ["contact", contact], ["engagements", engagements],
    ["offering", offering], ["operating", operating], ["legal", legal], ["work", work], ["writing", writing],
  ])("%s", (_n, m) => {
    const meta = m as unknown as { title: string; description: string; openGraph: { images: { url: string; width: number; height: number; alt: string }[]; siteName: string; title: string }; twitter: { card: string; images: string[]; title: string } };
    expect(meta.openGraph.images).toEqual([expect.objectContaining({ url: "/opengraph-image.png", width: 1200, height: 630 })]);
    expect(meta.openGraph.images[0].alt).toMatch(/Jason Cook Design/);
    expect(meta.openGraph.siteName).toBe("Jason Cook Design");
    expect(meta.openGraph.title).toBe(meta.title);
    expect(meta.twitter.card).toBe("summary_large_image");
    expect(meta.twitter.images).toEqual(["/opengraph-image.png"]);
    expect(meta.twitter.title).toBe(meta.title);
  });
});
