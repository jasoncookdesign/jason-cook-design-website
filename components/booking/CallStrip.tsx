import { CALL_STRIP } from "@/lib/booking";

/** The two lines under a booking button: the free intro call, and what comes of it. */
export default function CallStrip() {
  return (
    <p className="strip">
      <span className="a">{CALL_STRIP.a}</span>{" "}
      <span className="b">{CALL_STRIP.b}</span>
    </p>
  );
}
