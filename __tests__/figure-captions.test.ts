import { posts } from "@/lib/posts";

// Site rule: every figure carries caption text after its FIG. number.
describe("figure captions: blog posts", () => {
  const figures = posts.flatMap((post) =>
    post.content.flatMap((block, i) => (block.type === "img" ? [{ where: `${post.slug} block ${i}`, block }] : [])),
  );

  it("finds the figures it is meant to check", () => {
    expect(figures.length).toBeGreaterThan(10);
  });

  it.each(figures.map((f) => [f.where, f.block] as const))("%s has caption text", (_where, block) => {
    expect(block.credit?.trim()).toBeTruthy();
  });
});
