import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";
import CallStrip from "@/components/booking/CallStrip";
// DRAFT — Jason to edit

export default function OfferingClose() {
  return (
    <section className="eng-close" data-sheet="A-106" data-name="CLOSE">
      <h2>Start by talking through the decision.</h2>
      <Link href={BOOKING_PATH} className="btn">
        Book your strategy call <span aria-hidden="true">&rarr;</span>
      </Link>
      <CallStrip />
    </section>
  );
}
