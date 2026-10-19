export const metadata = {
  title: "Legal | Jason Cook Design",
  description: "Privacy policy, accessibility statement, and terms for Jason Cook Design.",
  openGraph: {
    title: "Legal | Jason Cook Design",
    description: "Privacy policy, accessibility statement, and terms for Jason Cook Design.",
  },
};

// One page for all legal text; the footer links to each section by anchor.
// The [LEGAL: …] tokens stay literal until the owner supplies the text.
const sections = [
  { id: "privacy", heading: "Privacy Policy" },
  { id: "accessibility", heading: "Accessibility Statement" },
  { id: "terms", heading: "Terms" },
];

export default function LegalPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <h1>Legal</h1>
        </div>
      </section>
      {sections.map(({ id, heading }, i) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className="pgs"
          data-sheet={`A-${102 + i}`}
          data-name={id.toUpperCase()}
        >
          <div className="intro g">
            <div className="t">
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${id}-heading`}>{heading}</h2>
            </div>
          </div>
          <div className="pg">
            <p className="ph-line">
              <span className="ph">[LEGAL: {heading} text pending]</span>
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
