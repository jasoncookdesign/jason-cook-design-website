import { render } from "@testing-library/react";
import Nav from "@/components/layout/Nav";

// The top bar carries no numbered microcopy: numbering earns its place only where a reader uses the number
// (a sequence, a count, a reference), and a document number in the header is decoration.
describe("Nav — no decorative numbering", () => {
  it("shows no document number or any other digits in the bar", () => {
    const { container } = render(<Nav />);
    const bar = container.querySelector("header.bar") as HTMLElement;
    expect(bar).not.toBeNull();
    expect(bar.querySelector(".wm-name")?.textContent).toBe("Jason Cook Design");
    expect(bar.textContent).not.toMatch(/\d/);
  });
});
