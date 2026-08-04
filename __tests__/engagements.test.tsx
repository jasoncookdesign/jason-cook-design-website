import { render, screen } from "@testing-library/react";
import EngagementsPage from "@/app/engagements/page";

describe("Engagements page", () => {
  it("renders the hero H1", () => {
    render(<EngagementsPage />);
    expect(
      screen.getByRole("heading", {
        name: /Every phase leaves you something you can use/i,
      })
    ).toBeTruthy();
  });

  it("renders the hero eyebrow", () => {
    render(<EngagementsPage />);
    // Exact match to avoid collision with "Scoped after the first step." in pricing terms
    expect(screen.getByText("After the first step")).toBeTruthy();
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

  it("renders the [ENTRY-OFFER-NAME] token literally in pricing card", () => {
    render(<EngagementsPage />);
    // Should appear at least once — S3-CARD-1 and possibly elsewhere
    expect(screen.getAllByText(/\[ENTRY-OFFER-NAME\]/).length).toBeGreaterThan(0);
  });

  it("renders $2,500 in the pricing card", () => {
    render(<EngagementsPage />);
    expect(screen.getByText(/\$2,500/)).toBeTruthy();
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
