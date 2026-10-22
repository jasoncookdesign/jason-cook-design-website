import BookingEmbed from "@/components/booking/BookingEmbed";
import { MEETING_TYPES } from "@/lib/booking";

// Unlisted: not linked from the site, not in the sitemap, and marked noindex. It holds the personal meeting types
// that used to share the contact page with the strategy call.
export const metadata = {
  title: "Meet | Jason Cook Design",
  robots: { index: false, follow: false },
};

export default function MeetPage() {
  return (
    <>
    <section className="hero page g" data-sheet="A-101" data-name="HERO">
      <div className="main">
        <h1>Meet</h1>
        <div>
          <p className="lead">
            Book time with Jason Cook online, by phone, or in person.
          </p>
        </div>
      </div>
    </section>

    <section className="book-sheet" data-sheet="A-102" data-name="BOOK">
      <BookingEmbed types={MEETING_TYPES} label="Book a time with Jason Cook" />
    </section>
    </>
  );
}
