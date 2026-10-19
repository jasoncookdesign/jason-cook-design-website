const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function CtaSection() {
  return (
    <section className="close" data-sheet="A-107" data-name="CLOSE">
      <h2>When you&apos;re done guessing how to fix it</h2>
      <p className="quote">
        &ldquo;Build the right thing&rdquo; comes before &ldquo;build the thing right.&rdquo;
      </p>
      <a className="btn" href={CTA_URL} target="_blank" rel="noopener noreferrer">
        Book your strategy call <span aria-hidden="true">&rarr;</span>
      </a>
      <p className="strip">
        <span className="a">No commitment. 20 minutes.</span>{" "}
        <span className="b">Find out what you need &mdash; and what you don&apos;t.</span>
      </p>
    </section>
  );
}
