import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";

export default function EngagementsClose() {
  return (
    <section className="eng-close" data-sheet="A-106" data-name="CLOSE">
      <h2>Every phase here is meant to be a place you can stop.</h2>
      <p className="eng-close-lead">The first one is the only one you&apos;re deciding on now.</p>
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
