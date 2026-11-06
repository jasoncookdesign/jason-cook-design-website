import { caseStudies } from "@/lib/work";

// Site rule: every figure carries caption text after its FIG. number.
describe("figure captions: case studies", () => {
  const figures = caseStudies.flatMap((cs) =>
    cs.sections.flatMap((s) =>
      s.blocks.flatMap((block, i) => (block.type === "img" ? [{ where: `${cs.slug} / ${s.heading} / block ${i}`, block }] : [])),
    ),
  );

  it("finds the figures it is meant to check", () => {
    expect(figures.length).toBeGreaterThan(50);
  });

  it.each(figures.map((f) => [f.where, f.block] as const))("%s has caption text", (_where, block) => {
    expect(block.caption?.trim()).toBeTruthy();
  });
});
