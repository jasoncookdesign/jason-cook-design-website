import Link from "next/link";
import BookingEmbed from "@/components/booking/BookingEmbed";
import CallStrip from "@/components/booking/CallStrip";

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
        <CallStrip />
      </div>
      <BookingEmbed />
    </section>
  );
}
