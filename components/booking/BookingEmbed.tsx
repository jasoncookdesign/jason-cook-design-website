"use client";

import { useEffect, useRef } from "react";
import { BOOKING_URL } from "@/lib/booking";
import { mountCalEmbed } from "@/lib/cal-embed";

/** The embedded Cal.com picker, with a plain link to the event page for visitors whose embed does not load. */
export default function BookingEmbed({ className = "book" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (box.current) mountCalEmbed(box.current);
  }, []);

  return (
    <div id="book" className={className} role="region" aria-label="Book a strategy call with Jason Cook Design">
      <div ref={box} className="cal-inline" />
      <p className="book-fallback">
        <a href={BOOKING_URL}>Open the booking page in Cal.com</a>
      </p>
    </div>
  );
}
