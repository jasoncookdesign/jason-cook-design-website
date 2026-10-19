/**
 * Booking lives on the site: every call-to-action links to the contact page, and the contact page and the close
 * sheet of the home page embed the Cal.com picker. This is the one place the Cal.com event is named and the
 * one place the widget is themed.
 */
export const BOOKING_PATH = "/contact";

/** The Cal.com event: username/event-slug. */
export const CAL_LINK = "jasoncookdesign/engagement-consultation";

/** The event page on Cal.com. Also the fallback link under the embed. */
export const BOOKING_URL = `https://cal.com/${CAL_LINK}`;

/**
 * Options for Cal("ui", ...). The widget runs in Cal.com's iframe, so it is themed through Cal's CSS variables;
 * the values are the site's own tokens (app/globals.css), so the picker reads as part of the sheet.
 * Square corners, hairline borders, and ink (not a brand colour) for the selected day.
 */
export function calUiConfig() {
  return {
    theme: "dark",
    layout: "month_view",
    hideEventTypeDetails: false,
    cssVarsPerTheme: {
      dark: {
        "cal-bg": "#0d2438",
        "cal-bg-subtle": "#133049",
        "cal-bg-muted": "#133049",
        "cal-bg-emphasis": "#1b3e5c",
        "cal-text": "#d3dee8",
        "cal-text-emphasis": "#e8eff5",
        "cal-text-subtle": "#a9bdcd",
        "cal-text-muted": "#6f93ad",
        "cal-border": "#5e7e96",
        "cal-border-emphasis": "#a9bdcd",
        "cal-border-subtle": "#2f5775",
        "cal-border-muted": "#173650",
        "cal-border-booker": "#5e7e96",
        "cal-border-booker-width": "0px",
        "cal-brand": "#e8eff5",
        "cal-brand-emphasis": "#d3dee8",
        "cal-brand-subtle": "#5e7e96",
        "cal-brand-text": "#0d2438",
        "cal-brand-accent": "#0d2438",
        radius: "0px",
      } as Record<string, string>,
    },
  };
}
