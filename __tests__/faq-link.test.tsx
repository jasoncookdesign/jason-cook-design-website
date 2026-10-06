import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";
import EngagementsPage from "@/app/engagements/page";

describe("Engagements portability links to the home FAQ on what the client keeps", () => {
  it("home FAQ exposes an anchor for the keep-it question", () => {
    const { container } = render(<HomePage />);
    const target = container.querySelector("#faq-11");
    expect(target).not.toBeNull();
    expect(within(target as HTMLElement).getByText("What do I keep when it's over?")).toBeTruthy();
  });

  it("engagements portability section links to that anchor", () => {
    render(<EngagementsPage />);
    const link = screen.getByRole("link", { name: "What do I keep when it's over?" });
    expect(link.getAttribute("href")).toBe("/#faq-11");
    // Inline in body text: underlined at rest so it isn't marked by color alone.
    expect(link.className.split(" ")).toContain("underline");
  });
});
