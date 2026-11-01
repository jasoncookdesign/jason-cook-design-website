import { render } from "@testing-library/react";
import WritingPostContent from "@/components/writing/WritingPostContent";
import type { Post, ContentBlock } from "@/lib/writing";

const base = { slug: "t", title: "T", date: "2026-11-01", tags: ["x"], excerpt: "An excerpt for the test." };
const p = (t: string): ContentBlock => ({ type: "p", html: t });
const img = (n: number): ContentBlock => ({ type: "img", src: `/images/f${n}.jpg`, alt: `figure ${n}`, credit: `caption ${n}` });
const render_ = (post: Partial<Post>, content: ContentBlock[]) =>
  render(<WritingPostContent post={{ ...base, ...post, content }} />).container;

describe("post content: ordered list block", () => {
  it("renders an ordered list with one item per entry, in the order given", () => {
    const c = render_({}, [
      p("before"),
      { type: "ol", items: ["First question", "Second question", "Third question"] },
      p("after"),
    ]);
    const lists = c.querySelectorAll(".prose > ol");
    expect(lists).toHaveLength(1);
    const items = Array.from(lists[0].querySelectorAll(":scope > li")).map((li) => li.textContent);
    expect(items).toEqual(["First question", "Second question", "Third question"]);
    // It sits between the paragraphs around it and does not turn them into list items.
    const kinds = Array.from(c.querySelectorAll(".prose > *")).map((el) => el.tagName);
    expect(kinds).toEqual(["P", "OL", "P"]);
  });

  it("keeps inline markup in an item, the way the bulleted list does", () => {
    const c = render_({}, [{ type: "ol", items: ['Read the <a href="/engagements/sample">sample</a> report.<sup>1</sup>'] }]);
    const li = c.querySelector(".prose > ol > li")!;
    expect(li.querySelector('a[href="/engagements/sample"]')).not.toBeNull();
    expect(li.querySelector("sup")!.textContent).toBe("1");
  });

  it("leaves the bulleted list unchanged", () => {
    const c = render_({}, [{ type: "ul", items: ["a", "b"] }]);
    expect(c.querySelectorAll(".prose > ul > li")).toHaveLength(2);
    expect(c.querySelector(".prose > ol")).toBeNull();
  });

  it("is not confused with the footnotes list, which is also an ordered list", () => {
    const c = render_({}, [
      { type: "ol", items: ["one", "two"] },
      { type: "footnotes", items: [{ ref: "1", html: "A source." }] },
    ]);
    expect(c.querySelectorAll(".prose > ol > li")).toHaveLength(2);
    expect(c.querySelectorAll("footer.fns ol > li")).toHaveLength(1);
  });

  it("travels with the text before a figure in the figures-right layout", () => {
    const c = render_({ layout: "figures-right" }, [p("intro"), { type: "ol", items: ["one", "two"] }, img(1)]);
    const text = c.querySelector(".prose > .beat > .beat-text")!;
    expect(text.querySelectorAll(":scope > p")).toHaveLength(1);
    expect(text.querySelectorAll(":scope > ol > li")).toHaveLength(2);
  });
});
