/**
 * Analytics through Google Tag Manager. The container loads on the production hostname only, and only after the
 * visitor accepts the privacy notice, so previews, localhost, and declined or undecided visitors never reach the
 * GA4 property. Events go through the data layer; what GTM does with them is configured in the container.
 */
import { getConsent, type Consent } from "@/lib/consent";

export const GTM_HOSTS = ["jasoncookdesign.com"];

type Win = Window & { dataLayer?: Record<string, unknown>[]; __gtmLoaded?: boolean };

export function shouldLoadGtm(hostname: string, consent: Consent | null, id: string | undefined): boolean {
  return Boolean(id) && consent === "accepted" && GTM_HOSTS.includes(hostname);
}

/** GTM's documented loader snippet. Safe to call more than once. */
export function loadGtm(id: string): void {
  const w = window as Win;
  if (w.__gtmLoaded) return;
  w.__gtmLoaded = true;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/**
 * Pushes an event once the container has loaded and while the visitor's choice is still "accepted". Before that
 * it does nothing, so nothing is replayed after consent. A container that already loaded keeps running until the
 * next full page load if the visitor withdraws, but nothing more is sent from the site's own events.
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  const w = window as Win;
  if (!w.__gtmLoaded || getConsent() !== "accepted") return;
  (w.dataLayer = w.dataLayer || []).push({ event, ...params });
}
