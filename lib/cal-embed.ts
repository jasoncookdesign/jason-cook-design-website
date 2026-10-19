import { CAL_LINK, calUiConfig } from "@/lib/booking";
import { track } from "@/lib/analytics";

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; q?: unknown[]; ns?: Record<string, unknown> };

/**
 * Loads Cal.com's embed script (once) and renders the booking picker inline in `el`, themed by calUiConfig().
 * This is Cal.com's documented inline-embed loader. Nothing here runs on the server.
 */
export function mountCalEmbed(el: HTMLElement, calLink: string = CAL_LINK): void {
  const w = window as unknown as { Cal?: CalFn; calInitialised?: boolean };
  if (!w.Cal) {
    const p = (a: { q?: unknown[] }, ar: unknown) => {
      (a.q = a.q || []).push(ar);
    };
    const cal: CalFn = function (...args: unknown[]) {
      const c = w.Cal as CalFn;
      if (!c.loaded) {
        c.ns = {};
        c.q = c.q || [];
        const s = document.createElement("script");
        s.src = "https://app.cal.com/embed/embed.js";
        document.head.appendChild(s);
        c.loaded = true;
      }
      p(c, args);
    } as CalFn;
    w.Cal = cal;
  }
  const Cal = w.Cal as CalFn;
  // Already showing this event (React strict-mode double mount): nothing to do. A different event replaces the picker.
  if (el.dataset.calLink === calLink && el.childElementCount > 0) return;
  el.replaceChildren();
  el.dataset.calLink = calLink;
  if (!w.calInitialised) {
    Cal("init", { origin: "https://app.cal.com" });
    // A finished booking is a lead; track() does nothing unless the visitor accepted analytics.
    Cal("on", { action: "bookingSuccessfulV2", callback: () => track("generate_lead", { method: "booking" }) });
    w.calInitialised = true;
  }
  Cal("inline", { elementOrSelector: el, calLink, layout: "month_view", config: { theme: "dark", layout: "month_view" } });
  Cal("ui", calUiConfig());
}
