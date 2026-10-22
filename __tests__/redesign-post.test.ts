import { existsSync } from "fs";
import { join } from "path";
import { posts } from "@/lib/writing";

const post = posts.find((p) => p.slug === "rebuilding-jasoncookdesign-com");

describe("the redesign write-up", () => {
  it("is listed as a post, dated and tagged", () => {
    expect(post).toBeDefined();
    expect(post!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(post!.tags).toEqual(expect.arrayContaining(["design", "process"]));
    expect(post!.excerpt.length).toBeGreaterThan(20);
  });

  it("has the five sections the draft ends up with, in order", () => {
    const h2 = post!.content.filter((b) => b.type === "h2").map((b) => (b as { text: string }).text);
    expect(h2).toEqual(["Context", "Audit", "Design iterations", "Identity", "Outcome"]);
  });

  it("carries nine figures, each a real file in public with alt text and a caption", () => {
    const imgs = post!.content.filter((b) => b.type === "img") as Array<{ src: string; alt: string; credit?: string }>;
    expect(imgs).toHaveLength(9);
    for (const img of imgs) {
      expect(existsSync(join(process.cwd(), "public", img.src))).toBe(true);
      expect(img.alt.length).toBeGreaterThan(10);
      expect((img.credit ?? "").length).toBeGreaterThan(10);
    }
  });

  it("ships no unfilled placeholder", () => {
    expect(JSON.stringify(post)).not.toMatch(/PLACEHOLDER|\[\[|SAMPLE:/);
  });
});
