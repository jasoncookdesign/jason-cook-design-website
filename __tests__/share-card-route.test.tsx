/** @jest-environment node */
import { GET, generateStaticParams } from "@/app/card/[...path]/route";
import { cardPaths } from "@/lib/social-cards";

// Rendering the PNG needs a running server (ImageResponse does not run under Jest): see e2e/share-cards.spec.ts.
const call = (path: string[]) => GET(new Request(`https://jasoncookdesign.com/card/${path.join("/")}`), { params: Promise.resolve({ path }) });

describe("/card/<page path>", () => {
  it("answers 404 for a path with no card, so the domain cannot be made to render arbitrary text", async () => {
    expect((await call(["no-such-page"])).status).toBe(404);
    expect((await call(["writing", "blog", "not-a-post"])).status).toBe(404);
  });

  it("pre-builds exactly the paths in the card registry", async () => {
    const built = (await generateStaticParams()).map((p: { path: string[] }) => "/" + p.path.join("/"));
    expect(built.sort()).toEqual(cardPaths().sort());
  });
});
