import { shouldLoadGtm, loadGtm, track, GTM_HOSTS } from "@/lib/analytics";

// Analytics load through Google Tag Manager, on the production hostname only and only after the visitor accepts
// the privacy notice. Previews, localhost, and declined or undecided visitors never load the container, so they
// never reach the GA4 property.

type Win = Window & { dataLayer?: unknown[] };
const w = window as Win;

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = "";
  delete w.dataLayer;
  delete (w as { __gtmLoaded?: boolean }).__gtmLoaded;
});

describe("shouldLoadGtm", () => {
  const id = "GTM-TEST123";

  it("is true only for the production host, an accepted choice, and a container id", () => {
    expect(shouldLoadGtm("jasoncookdesign.com", "accepted", id)).toBe(true);
  });

  it.each([
    ["localhost", "accepted"],
    ["jason-cook-design-website-git-feat-x.vercel.app", "accepted"],
    ["www.jasoncookdesign.com", "accepted"],
    ["jasoncookdesign.com", "declined"],
    ["jasoncookdesign.com", null],
  ] as const)("is false for %s with consent %s", (host, consent) => {
    expect(shouldLoadGtm(host, consent, id)).toBe(false);
  });

  it("is false without a container id", () => {
    expect(shouldLoadGtm("jasoncookdesign.com", "accepted", undefined)).toBe(false);
    expect(shouldLoadGtm("jasoncookdesign.com", "accepted", "")).toBe(false);
  });

  it("names the production host", () => {
    expect(GTM_HOSTS).toEqual(["jasoncookdesign.com"]);
  });
});

describe("loadGtm", () => {
  it("injects the container script once and starts the data layer", () => {
    loadGtm("GTM-TEST123");
    loadGtm("GTM-TEST123");
    const scripts = document.head.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
    expect(scripts).toHaveLength(1);
    expect(scripts[0].getAttribute("src")).toBe("https://www.googletagmanager.com/gtm.js?id=GTM-TEST123");
    expect((scripts[0] as HTMLScriptElement).async).toBe(true);
    const starts = (w.dataLayer ?? []).filter((e) => (e as { event?: string }).event === "gtm.js");
    expect(starts).toHaveLength(1);
  });
});

describe("track", () => {
  it("does nothing until the container has loaded, so pre-consent events are never replayed", () => {
    track("generate_lead", { method: "email" });
    expect(w.dataLayer).toBeUndefined();
  });

  it("pushes the event with its parameters once the container has loaded and the visitor has accepted", () => {
    localStorage.setItem("jcd_privacy_consent", "accepted");
    loadGtm("GTM-TEST123");
    track("generate_lead", { method: "email" });
    expect(w.dataLayer).toContainEqual({ event: "generate_lead", method: "email" });
  });
});
