"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { setConsent, useConsent } from "@/lib/consent";

// DRAFT — Jason to edit. The policy text itself is pending on the legal page.
/**
 * The privacy notice: what the site loads from third parties, with Decline and Accept. Shown until a choice is
 * stored; rendered only after mount so returning visitors never see it flash.
 */
export default function PrivacyBanner() {
  const consent = useConsent();
  // false on the server and during hydration, true afterwards, without a state update in an effect
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!mounted || consent) return null;

  return (
    <div className="privacy" role="region" aria-label="Privacy notice">
      <p>
        <span className="tag">Privacy</span>
        Booking runs through an embedded Cal.com calendar, which may set cookies, and accepting also turns on
        analytics through Google Tag Manager. Decline and both stay off; the booking link still works.{" "}
        <Link href="/legal#privacy">Privacy policy</Link>.
      </p>
      <div className="privacy-actions">
        <button type="button" className="btn ghost sm" onClick={() => setConsent("declined")}>
          Decline
        </button>
        <button type="button" className="btn sm" onClick={() => setConsent("accepted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
