import { render, screen } from "@testing-library/react";
import EngagementsPage from "@/app/engagements/operating/page";
import { SHORT } from "@/lib/first-phase-terms";

describe("Engagements page", () => {
  it("renders the hero H1", () => {
    render(<EngagementsPage />);
    expect(
      screen.getByRole("heading", {
        name: /Every phase leaves you something you can use/i,
      })
    ).toBeTruthy();
  });

  it("renders the hero eyebrow as the type name", () => {
    const { container } = render(<EngagementsPage />);
    expect(container.querySelector("section p")!.textContent).toBe("Operating Engagement");
  });

  it("renders the four problem cards ahead of the phases", () => {
    render(<EngagementsPage />);
    for (const label of ["The old way", "The internal attempt", "The search outside", "The split"]) {
      expect(screen.getByText(label)).toBeTruthy();
    }
    const phase = screen.getByText(/One — understand it, then decide the shape/i);
    const card = screen.getByText("The old way");
    expect(card.compareDocumentPosition(phase) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders all five phase labels", () => {
    render(<EngagementsPage />);
    expect(screen.getByText(/One — understand it, then decide the shape/i)).toBeTruthy();
    expect(screen.getByText(/Two — specify it in detail/i)).toBeTruthy();
    expect(screen.getByText(/Three — build it/i)).toBeTruthy();
    expect(screen.getByText(/Four — hand it over/i)).toBeTruthy();
    expect(screen.getByText(/Five — stay available/i)).toBeTruthy();
  });

  it("renders the portability section", () => {
    render(<EngagementsPage />);
    expect(
      screen.getByText(/You can hand this to another provider at any seam/i)
    ).toBeTruthy();
  });

  it("renders the pricing section with three cards", () => {
    render(<EngagementsPage />);
    expect(screen.getByText(/Set in advance/i)).toBeTruthy();
    expect(screen.getByText(/Quoted per phase/i)).toBeTruthy();
    expect(screen.getByText(/Monthly, if you want it/i)).toBeTruthy();
  });

  it("names the paid diagnosis in plain wording in the pricing card", () => {
    render(<EngagementsPage />);
    expect(screen.getByText(/The paid diagnosis is the only part with a price I can publish/)).toBeTruthy();
    expect(screen.queryByText(/\[ENTRY-OFFER-NAME\]/)).toBeNull();
  });

  it("gives the credit in the pricing card as a short form with a link to the terms page", () => {
    const { container } = render(<EngagementsPage />);
    expect(container.textContent).toContain(SHORT.credit.text);
    expect(container.querySelector(`a[href="${SHORT.credit.href}"]`)).not.toBeNull();
  });

  it("links the pricing card to the sample report", () => {
    const { container } = render(<EngagementsPage />);
    expect(container.querySelector('a[href="/engagements/sample"]')).not.toBeNull();
  });

  it("renders $2,500 in the pricing card", () => {
    render(<EngagementsPage />);
    expect(screen.getAllByText(/\$2,500/).length).toBeGreaterThan(0);
  });

  it("renders the FAQ section including FAQ-E6", () => {
    render(<EngagementsPage />);
    expect(screen.getByText(/Can my own team do the build/i)).toBeTruthy();
    expect(screen.getByText(/What's my time commitment/i)).toBeTruthy();
  });

  it("renders the terms blocks", () => {
    render(<EngagementsPage />);
    expect(
      screen.getByText(/A late payment pauses the work/i)
    ).toBeTruthy();
  });
});
