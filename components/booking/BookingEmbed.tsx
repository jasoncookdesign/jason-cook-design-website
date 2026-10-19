"use client";

import { useEffect, useRef } from "react";
import { BOOKING_URL } from "@/lib/booking";
import { mountCalEmbed } from "@/lib/cal-embed";
import { useConsent } from "@/lib/consent";

/** The embedded Cal.com picker, with a plain link to the event page for visitors whose embed does not load. */
export default function BookingEmbed({ className = "book" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const consent = useConsent();
  const declined = consent === "declined";
  useEffect(() => {
    if (!declined && box.current) mountCalEmbed(box.current);
  }, [declined]);

  return (
    <div id="book" className={className} role="region" aria-label="Book a strategy call with Jason Cook Design">
      {declined ? (
        <p className="book-off">The booking calendar is off because you declined the privacy notice. Use the link below to book on Cal.com.</p>
      ) : (
        <div ref={box} className="cal-inline" />
      )}
      <p className="book-fallback">
        <a href={BOOKING_URL}>Open the booking page in Cal.com</a>
      </p>
    </div>
  );
}
