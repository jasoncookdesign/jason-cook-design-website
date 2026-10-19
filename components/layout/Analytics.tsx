"use client";

import { useEffect } from "react";
import { useConsent } from "@/lib/consent";
import { loadGtm, shouldLoadGtm, track } from "@/lib/analytics";

/**
 * Loads the GTM container once the visitor has accepted, on the production host, and reports a lead whenever a
 * mailto link is clicked. Renders nothing. The container id comes from NEXT_PUBLIC_GTM_ID.
 */
export default function Analytics() {
  const consent = useConsent();
  const id = process.env.NEXT_PUBLIC_GTM_ID;
  const load = shouldLoadGtm(typeof window === "undefined" ? "" : window.location.hostname, consent, id);

  useEffect(() => {
    if (load && id) loadGtm(id);
  }, [load, id]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="mailto:"]');
      if (a) track("generate_lead", { method: "email" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
