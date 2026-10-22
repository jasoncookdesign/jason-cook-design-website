import Link from "next/link";
import BookingEmbed from "@/components/booking/BookingEmbed";
import { BOOKING_TYPES } from "@/lib/booking";
import { withSocial } from "@/lib/metadata";
import CallStrip from "@/components/booking/CallStrip";

export const metadata = withSocial({
  title: "Contact | Jason Cook Design",
  description:
    "Book a strategy call with Jason Cook Design. Free, 20 minutes, no commitment.",
  openGraph: {
    title: "Contact | Jason Cook Design",
    description:
      "Book a strategy call with Jason Cook Design. Free, 20 minutes, no commitment.",
  },
});

export default function ContactPage() {
  return (
    <>
    <section className="hero page solo g" data-sheet="A-101" data-name="HERO">
      <div className="main">
        <h1>Contact</h1>
        <div className="actions">
          <Link href="#book" className="btn">
            Book your strategy call <span aria-hidden="true">&rarr;</span>
          </Link>
          <CallStrip />
        </div>
      </div>
    </section>

    <section className="book-sheet" data-sheet="A-102" data-name="BOOK">
      <BookingEmbed types={BOOKING_TYPES} />
    </section>
    </>
  );
}
