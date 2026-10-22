import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";

// A slim last word after the questions: anything not answered above goes to the free call.
export default function AskSection() {
  return (
    <section className="ask" data-sheet="A-109" data-name="ASK">
      <h2>Have a question that isn&apos;t here?</h2>
      <p>Book a free 20-minute call and ask it.</p>
      <Link className="btn secondary" href={BOOKING_PATH}>
        Book a free 20-minute call <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}
