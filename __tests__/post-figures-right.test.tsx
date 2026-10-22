import { render } from "@testing-library/react";
import WritingPostContent from "@/components/writing/WritingPostContent";
import { posts, type Post, type ContentBlock } from "@/lib/writing";

const base = { slug: "t", title: "T", date: "2026-10-22", tags: ["x"], excerpt: "An excerpt for the test." };
const p = (t: string): ContentBlock => ({ type: "p", html: t });
const img = (n: number): ContentBlock => ({ type: "img", src: `/images/f${n}.jpg`, alt: `figure ${n}`, credit: `caption ${n}` });
const render_ = (post: Partial<Post>, content: ContentBlock[]) =>
  render(<WritingPostContent post={{ ...base, ...post, content }} />).container;

describe("post layout: figures right", () => {
  it("pairs the text before each figure with it in a beat, figure in the right-hand column", () => {
    const c = render_({ layout: "figures-right" }, [{ type: "h2", text: "A" }, p("one"), p("two"), img(1), p("three"), img(2)]);
    expect(c.querySelector(".prose.beats")).not.toBeNull();
    const beats = Array.from(c.querySelectorAll(".prose > .beat"));
    expect(beats).toHaveLength(2);
    expect(beats[0].querySelectorAll(":scope > .beat-text > h2, :scope > .beat-text > p")).toHaveLength(3);
    expect(beats[0].lastElementChild!.matches("figure.fig")).toBe(true);
  });

  it("keeps the numbered plate captions, with the caption text, inside the beat", () => {
    const c = render_({ layout: "figures-right" }, [p("one"), img(1), p("two"), img(2)]);
    const caps = Array.from(c.querySelectorAll(".beat figcaption"));
    expect(caps.map((f) => f.textContent)).toEqual(["FIG. 1caption 1", "FIG. 2caption 2"]);
  });

  it("leaves text after the last figure as plain siblings", () => {
    const c = render_({ layout: "figures-right" }, [p("one"), img(1), p("tail")]);
    expect(c.querySelectorAll(".prose > .beat")).toHaveLength(1);
    expect(c.querySelectorAll(".prose > p")).toHaveLength(1);
  });

  it("does not change posts that do not ask for it", () => {
    const c = render_({}, [p("one"), img(1)]);
    expect(c.querySelector(".beats")).toBeNull();
    expect(c.querySelectorAll(".prose > figure.fig")).toHaveLength(1);
  });

  it("is what the redesign write-up asks for", () => {
    expect(posts.find((x) => x.slug === "rebuilding-jasoncookdesign-com")!.layout).toBe("figures-right");
  });
});
