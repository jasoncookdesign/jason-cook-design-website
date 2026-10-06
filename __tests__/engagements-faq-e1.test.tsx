import { render, screen, fireEvent } from "@testing-library/react";
import EngagementsPage from "@/app/engagements/page";

function openOwnTeamAnswer() {
  const view = render(<EngagementsPage />);
  fireEvent.click(screen.getByRole("button", { name: "Can my own team do the build?" }));
  return view;
}

describe("Engagements FAQ: can my own team do the build?", () => {
  it("opens to the full answer", () => {
    openOwnTeamAnswer();
    expect(
      screen.getByText("Yes. The specification is written to be built from, and it's the same specification either way.")
    ).toBeTruthy();
  });

  it("answers what happens when the client's team builds", () => {
    openOwnTeamAnswer();
    expect(
      screen.getByText(
        "If your team builds it, I stay on as engineering lead, not engineer. It can still end in a handoff, and any later support starts from that handoff."
      )
    ).toBeTruthy();
  });

  it("renders no unresolved [GAP] marker in the open answer", () => {
    const { container } = openOwnTeamAnswer();
    expect(container.textContent).toContain("same specification either way");
    expect(container.textContent).not.toContain("[GAP:");
  });
});
