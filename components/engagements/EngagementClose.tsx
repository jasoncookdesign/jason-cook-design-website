import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";
import CallStrip from "@/components/booking/CallStrip";

export default function EngagementClose() {
  return (
    <section className="eng-close" data-sheet="A-107" data-name="CLOSE">
      <h2>Every phase here is meant to be a place you can stop.</h2>
      <p className="eng-close-lead">The first one is the only one you&apos;re deciding on now.</p>
      <Link href={BOOKING_PATH} className="btn">
        Book your strategy call <span aria-hidden="true">&rarr;</span>
      </Link>
      <CallStrip />
    </section>
  );
}
