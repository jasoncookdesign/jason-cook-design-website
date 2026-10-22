"use client";

import { useEffect, useRef, useState } from "react";
import { CAL_LINK, calLinkFor, calUrlFor } from "@/lib/booking";
import { mountCalEmbed } from "@/lib/cal-embed";
import { useConsent } from "@/lib/consent";

/** The embedded Cal.com picker, with a plain link to the event page for visitors whose embed does not load. */
type BookingType = { readonly slug: string; readonly label: string };

export default function BookingEmbed({ className = "book", types, label = "Book a strategy call with Jason Cook Design" }: { className?: string; types?: readonly BookingType[]; label?: string }) {
  const [slug, setSlug] = useState(types?.[0]?.slug ?? "");
  const calLink = types && slug ? calLinkFor(slug) : CAL_LINK;
  const box = useRef<HTMLDivElement>(null);
  const consent = useConsent();
  const declined = consent === "declined";
  useEffect(() => {
    if (!declined && box.current) mountCalEmbed(box.current, calLink);
  }, [declined, calLink]);

  return (
    <div id="book" className={className} role="region" aria-label={label}>
      {types ? (
        <div className="cal-typebar" role="group" aria-label="Choose a meeting type">
          {types.map((t) => (
            <button key={t.slug} type="button" aria-pressed={t.slug === slug} onClick={() => setSlug(t.slug)}>
              {t.label}
            </button>
          ))}
        </div>
      ) : null}
      {declined ? (
        <p className="book-off">The booking calendar is off because you declined the privacy notice. Use the link below to book on Cal.com.</p>
      ) : (
        <div ref={box} className="cal-inline" />
      )}
      <p className="book-fallback">
        <a href={calUrlFor(calLink)}>Open the booking page in Cal.com</a>
      </p>
    </div>
  );
}
