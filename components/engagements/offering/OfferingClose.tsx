import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";
// DRAFT — Jason to edit

export default function OfferingClose() {
  return (
    <section className="eng-close" data-sheet="A-106" data-name="CLOSE">
      <h2>Start by talking through the decision.</h2>
      <Link href={BOOKING_PATH} className="btn">
        Book your strategy call <span aria-hidden="true">&rarr;</span>
      </Link>
      <p className="strip">
        <span className="a">No commitment. 20 minutes.</span>{" "}
        <span className="b">Find out what you need &mdash; and what you don&apos;t.</span>
      </p>
    </section>
  );
}
