import Link from "next/link";

export const metadata = {
  title: "Contact | Jason Cook Design",
  description:
    "Book a strategy call with Jason Cook Design. No commitment, 20 minutes.",
  openGraph: {
    title: "Contact | Jason Cook Design",
    description:
      "Book a strategy call with Jason Cook Design. No commitment, 20 minutes.",
  },
};

// Booking URL: cal.com/jasoncookdesign/engagement-consultation
export default function ContactPage() {
  return (
    <section className="hero page solo g" data-sheet="A-101" data-name="HERO">
      <div className="main">
        <p className="eyebrow">Contact</p>
        <h1>Contact</h1>
        <div className="actions">
          <Link
            href="https://cal.com/jasoncookdesign/engagement-consultation"
            className="btn"
          >
            Book your strategy call <span aria-hidden="true">&rarr;</span>
          </Link>
          <p className="strip">
            <span className="a">No commitment. 20 minutes.</span>{" "}
            <span className="b">
              Find out what you need — and what you don&rsquo;t.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
