/**
 * @jest-environment-options {"url": "https://jasoncookdesign.com/"}
 */
import { render, fireEvent, act } from "@testing-library/react";
import Analytics from "@/components/layout/Analytics";
import { setConsent } from "@/lib/consent";

// The real composition: the Analytics component, the real consent store, and the production hostname (set by the
// docblock above). Only the network is absent: jsdom does not fetch the injected script.

type Win = Window & { dataLayer?: unknown[] };
const w = window as Win;
const gtmScripts = () => document.head.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = "";
  delete w.dataLayer;
  delete (w as { __gtmLoaded?: boolean }).__gtmLoaded;
  process.env.NEXT_PUBLIC_GTM_ID = "GTM-TEST123";
});

describe("Analytics", () => {
  it("loads nothing until the visitor accepts", () => {
    render(<Analytics />);
    expect(gtmScripts()).toHaveLength(0);
    act(() => setConsent("declined"));
    expect(gtmScripts()).toHaveLength(0);
  });

  it("loads the container when the visitor accepts", () => {
    render(<Analytics />);
    act(() => setConsent("accepted"));
    expect(gtmScripts()).toHaveLength(1);
  });

  it("loads on mount for a returning visitor who already accepted", () => {
    localStorage.setItem("jcd_privacy_consent", "accepted");
    render(<Analytics />);
    expect(gtmScripts()).toHaveLength(1);
  });

  it("sends generate_lead with method email when a mailto link is clicked, and ignores other links", () => {
    localStorage.setItem("jcd_privacy_consent", "accepted");
    const { container } = render(
      <div>
        <Analytics />
        <a href="mailto:hello@jasoncookdesign.com">Email</a>
        <a href="https://example.com/">Elsewhere</a>
      </div>
    );
    const [mail, work] = Array.from(container.querySelectorAll("a"));
    fireEvent.click(work);
    expect(w.dataLayer).not.toContainEqual(expect.objectContaining({ event: "generate_lead" }));
    fireEvent.click(mail);
    expect(w.dataLayer).toContainEqual({ event: "generate_lead", method: "email" });
  });

  it("sends nothing when the visitor declined", () => {
    localStorage.setItem("jcd_privacy_consent", "declined");
    const { container } = render(
      <div>
        <Analytics />
        <a href="mailto:hello@jasoncookdesign.com">Email</a>
      </div>
    );
    fireEvent.click(container.querySelector("a")!);
    expect(w.dataLayer).toBeUndefined();
  });

  it("stops sending once a visitor who accepted later declines", () => {
    localStorage.setItem("jcd_privacy_consent", "accepted");
    const { container } = render(
      <div>
        <Analytics />
        <a href="mailto:hello@jasoncookdesign.com">Email</a>
      </div>
    );
    const mail = container.querySelector("a")!;
    fireEvent.click(mail);
    expect((w.dataLayer ?? []).filter((e) => (e as { event?: string }).event === "generate_lead")).toHaveLength(1);
    act(() => setConsent("declined"));
    fireEvent.click(mail);
    expect((w.dataLayer ?? []).filter((e) => (e as { event?: string }).event === "generate_lead")).toHaveLength(1);
  });
});
