/**
 * The visitor's privacy choice: accepted or declined, stored in this browser only. Declining stops third-party
 * widgets (today, the Cal.com booking embed) from loading. Until a choice is made the value is null.
 * Storage can be blocked, so every access is guarded.
 */
import { useSyncExternalStore } from "react";

export const CONSENT_KEY = "jcd_privacy_consent";
export const CONSENT_EVENT = "jcd-consent";
export type Consent = "accepted" | "declined";

export function getConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* storage blocked: the choice lasts until the page closes */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The current choice, kept in sync across components and tabs. Null on the server and before a choice. */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}
