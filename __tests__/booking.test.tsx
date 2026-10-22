import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { BOOKING_PATH, BOOKING_URL, MEETING_TYPES, CAL_LINK, calLinkFor, calUiConfig } from "@/lib/booking";
import MeetPage, { metadata as meetMetadata } from "@/app/meet/page";
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

describe("meeting types", () => {
  it("lists the old site's personal meeting, coffee, breakfast, lunch, and dinner; the strategy call is not among them", () => {
    expect(MEETING_TYPES.map((t) => t.slug)).toEqual(["meeting", "coffee", "breakfast", "lunch", "dinner"]);
    expect(MEETING_TYPES.map((t) => t.label)).toEqual(["Meeting", "Coffee", "Breakfast", "Lunch", "Dinner"]);
    expect(calLinkFor("coffee")).toBe("jasoncookdesign/coffee");
    expect(MEETING_TYPES.map((t) => t.slug)).not.toContain(CAL_LINK.split("/")[1]);
  });
});

describe("BookingEmbed with a meeting-type chooser", () => {
  it("shows one pressed button per type, the first pressed, and loads the first event", () => {
    const { container } = render(<BookingEmbed types={MEETING_TYPES} />);
    const group = screen.getByRole("group", { name: /choose a meeting type/i });
    const buttons = within(group).getAllByRole("button");
    expect(buttons.map((b) => b.textContent)).toEqual(["Meeting", "Coffee", "Breakfast", "Lunch", "Dinner"]);
    expect(buttons.map((b) => b.getAttribute("aria-pressed"))).toEqual(["true", "false", "false", "false", "false"]);
    expect(mountCalEmbed).toHaveBeenCalledWith(container.querySelector(".cal-inline"), "jasoncookdesign/meeting");
  });

  it("switching type moves the pressed state, reloads the picker for that event, and updates the fallback link", () => {
    const { container } = render(<BookingEmbed types={MEETING_TYPES} />);
    fireEvent.click(screen.getByRole("button", { name: "Coffee" }));
    expect(screen.getByRole("button", { name: "Coffee" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "Meeting" }).getAttribute("aria-pressed")).toBe("false");
    expect(mountCalEmbed).toHaveBeenLastCalledWith(container.querySelector(".cal-inline"), "jasoncookdesign/coffee");
    expect(screen.getByRole("link", { name: /open the booking page in cal\.com/i }).getAttribute("href")).toBe("https://cal.com/jasoncookdesign/coffee");
  });

  it("has no chooser unless asked (the home close sheet and the contact page keep the strategy call only)", () => {
    render(<BookingEmbed />);
    expect(screen.queryByRole("group", { name: /choose a meeting type/i })).toBeNull();
  });

  it("the contact page offers the strategy call alone", () => {
    const { container } = render(<ContactPage />);
    expect(screen.queryByRole("group", { name: /choose a meeting type/i })).toBeNull();
    expect(mountCalEmbed).toHaveBeenCalledWith(container.querySelector(".cal-inline"), CAL_LINK);
    for (const label of ["Meeting", "Coffee", "Breakfast", "Lunch", "Dinner"]) {
      expect(screen.queryByRole("button", { name: label })).toBeNull();
    }
  });

  it("the unlisted meet page asks for the chooser", () => {
    render(<MeetPage />);
    expect(screen.getByRole("group", { name: /choose a meeting type/i })).toBeTruthy();
  });
});

describe("BookingEmbed", () => {
  it("renders a labelled container, mounts the widget into it, and keeps a plain Cal.com link as fallback", () => {
    const { container } = render(<BookingEmbed />);
    const box = container.querySelector("#book .cal-inline")!;
    expect(box).not.toBeNull();
    expect(mountCalEmbed).toHaveBeenCalledWith(box, CAL_LINK);
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

describe("meeting-type chooser layout", () => {
  const css = readFileSync(join(process.cwd(), "app/blueprint-motion.css"), "utf8") + readFileSync(join(process.cwd(), "app/bp-content.css"), "utf8");
  it("gives every type an equal share of the row, and clears the sheet tag above the row", () => {
    expect(css).toMatch(/\.cal-typebar button\s*\{[^}]*flex:\s*1 1 0/);
    expect(css).toMatch(/\.book-sheet\s*\{[^}]*padding:\s*44px var\(--pad\) 0/);
  });
});

describe("the meet page explains itself", () => {
  it("follows the h1 with a lead line saying how to meet", () => {
    const { container } = render(<MeetPage />);
    const lead = container.querySelector("h1 + div p.lead, h1 ~ p.lead");
    expect((lead?.textContent ?? "").replace(/\s+/g, " ").trim()).toBe("Book time with Jason Cook online, by phone, or in person.");
  });
});

describe("the meet page is unlisted", () => {
  it("asks search engines not to index or follow it", () => {
    expect(meetMetadata.robots).toEqual({ index: false, follow: false });
  });
});
