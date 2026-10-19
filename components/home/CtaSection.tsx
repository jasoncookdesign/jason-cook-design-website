import Link from "next/link";
import BookingEmbed from "@/components/booking/BookingEmbed";

export default function CtaSection() {
  return (
    <section className="close" data-sheet="A-107" data-name="CLOSE">
      <div className="pitch">
        <h2>When you&apos;re done guessing how to fix it</h2>
        <p className="quote">
          &ldquo;Build the right thing&rdquo; comes before &ldquo;build the thing right.&rdquo;
        </p>
        <Link className="btn" href="#book">
          Book your strategy call <span aria-hidden="true">&rarr;</span>
        </Link>
        <p className="strip">
          <span className="a">No commitment. 20 minutes.</span>{" "}
          <span className="b">Find out what you need &mdash; and what you don&apos;t.</span>
        </p>
      </div>
      <BookingEmbed />
    </section>
  );
}
