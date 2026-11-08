import { expect, test } from "@playwright/test";

// What a link preview reads from the served page, and the image it points at. Runs against a production build.
const SITE = "https://jasoncookdesign.com";
const pages = ["/about", "/work/ford", "/writing/blog/the-quality-gate", "/engagements/offering"];

const meta = (html: string, key: string) =>
  new RegExp(`<meta[^>]+(?:property|name)="${key}"[^>]+content="([^"]*)"|<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${key}"`).exec(html)?.slice(1).find(Boolean);

for (const path of pages) {
  test(`${path} serves its own og:url, canonical, and card image`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(meta(html, "og:url")).toBe(`${SITE}${path}`);
    expect(html).toContain(`<link rel="canonical" href="${SITE}${path}"`);
    const image = meta(html, "og:image");
    expect(image).toBe(`${SITE}/card${path}`);
    expect(meta(html, "twitter:image")).toBe(image);
    const res = await request.get(`/card${path}`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    const b = await res.body();
    expect({ w: b.readUInt32BE(16), h: b.readUInt32BE(20) }).toEqual({ w: 1200, h: 630 });
    expect(b.length).toBeLessThan(600 * 1024);
  });
}

test("two pages get two different card images", async ({ request }) => {
  const a = await (await request.get("/card/about")).body();
  const b = await (await request.get("/card/contact")).body();
  expect(a.equals(b)).toBe(false);
});

test("a path with no page gets no card", async ({ request }) => {
  expect((await request.get("/card/no-such-page")).status()).toBe(404);
});
