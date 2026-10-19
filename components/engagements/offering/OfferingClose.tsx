// DRAFT — Jason to edit
const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function OfferingClose() {
  return (
    <section className="eng-close" data-sheet="A-106" data-name="CLOSE">
      <h2>Start by talking through the decision.</h2>
      <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="btn">
        Book your strategy call <span aria-hidden="true">&rarr;</span>
      </a>
      <p className="strip">
        <span className="a">No commitment. 20 minutes.</span>{" "}
        <span className="b">Find out what you need &mdash; and what you don&apos;t.</span>
      </p>
    </section>
  );
}
