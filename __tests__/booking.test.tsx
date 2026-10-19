import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { render, screen } from "@testing-library/react";
import { BOOKING_PATH, BOOKING_URL, CAL_LINK, calUiConfig } from "@/lib/booking";
import BookingEmbed from "@/components/booking/BookingEmbed";
import ContactPage from "@/app/contact/page";

jest.mock("@/lib/cal-embed", () => ({ mountCalEmbed: jest.fn() }));
import { mountCalEmbed } from "@/lib/cal-embed";

// Booking is on the site: every call-to-action goes to the contact page, and the close sheet of the home page
// shows the picker beside the pitch. Both use the embedded Cal.com widget, themed in the blueprint's palette.
// The Cal.com event is named in one place (lib/booking.ts).

const globals = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
const tok = (n: string) => globals.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`))![1].toLowerCase();
const lum = (h: string) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

describe("booking module", () => {
  it("names the engagement-consultation event once", () => {
    expect(BOOKING_PATH).toBe("/contact");
    expect(CAL_LINK).toBe("jasoncookdesign/engagement-consultation");
    expect(BOOKING_URL).toBe(`https://cal.com/${CAL_LINK}`);
  });

  it("themes the widget dark with the site's own palette", () => {
    const cfg = calUiConfig();
    const d = cfg.cssVarsPerTheme.dark;
    expect(cfg.theme).toBe("dark");
    expect(cfg.layout).toBe("month_view");
    expect(d["cal-bg"]).toBe(tok("bg"));
    expect(d["cal-text-emphasis"]).toBe(tok("ink"));
    expect(d["cal-brand"]).toBe(tok("ink"));
    expect(d["cal-border"]).toBe(tok("border"));
    expect(d["radius"]).toBe("0px");
    for (const v of Object.values(d)) expect(v).toMatch(/^(#[0-9a-f]{6}|0px)$/);
  });

  it("keeps the widget's text and selected day readable (4.5:1) and its borders visible (3:1)", () => {
    const d = calUiConfig().cssVarsPerTheme.dark;
    for (const t of ["cal-text", "cal-text-emphasis", "cal-text-subtle"]) expect(ratio(d[t], d["cal-bg"])).toBeGreaterThanOrEqual(4.5);
    expect(ratio(d["cal-brand-text"], d["cal-brand"])).toBeGreaterThanOrEqual(4.5);
    expect(ratio(d["cal-border"], d["cal-bg"])).toBeGreaterThanOrEqual(3);
    expect(ratio(d["cal-text-muted"], d["cal-bg"])).toBeGreaterThanOrEqual(3);
  });
});

describe("BookingEmbed", () => {
  it("renders a labelled container, mounts the widget into it, and keeps a plain Cal.com link as fallback", () => {
    const { container } = render(<BookingEmbed />);
    const box = container.querySelector("#book .cal-inline")!;
    expect(box).not.toBeNull();
    expect(mountCalEmbed).toHaveBeenCalledWith(box);
    expect(screen.getByRole("link", { name: /open the booking page in cal\.com/i }).getAttribute("href")).toBe(BOOKING_URL);
    expect(container.querySelector("#book")!.getAttribute("aria-label")).toBe("Book a strategy call with Jason Cook Design");
  });
});

describe("contact page", () => {
  it("hosts the embed under the hero, and its button scrolls to it", () => {
    const { container } = render(<ContactPage />);
    expect(container.querySelector("#book .cal-inline")).not.toBeNull();
    expect(screen.getByRole("link", { name: /Book your strategy call/i }).getAttribute("href")).toBe("#book");
  });
});

describe("no component carries its own Cal.com URL", () => {
  const walk = (d: string): string[] =>
    readdirSync(join(process.cwd(), d), { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(join(d, e.name)) : /\.tsx?$/.test(e.name) ? [join(d, e.name)] : []
    );
  it.each(["components", "app"])("%s", (d) => {
    expect(walk(d).filter((f) => /cal\.com/.test(readFileSync(join(process.cwd(), f), "utf8")))).toEqual([]);
  });
});
