import { readFileSync } from "fs";
import { join } from "path";
import { render, screen, fireEvent, act } from "@testing-library/react";
import PrivacyBanner from "@/components/layout/PrivacyBanner";
import BookingEmbed from "@/components/booking/BookingEmbed";
import { getConsent, setConsent, CONSENT_KEY } from "@/lib/consent";

jest.mock("@/lib/cal-embed", () => ({ mountCalEmbed: jest.fn() }));
import { mountCalEmbed } from "@/lib/cal-embed";

// The privacy banner tells visitors what the site loads from third parties and records their choice. Declining
// stops the Cal.com widget from loading (the booking link stays). Modelled on the Dyson Hope consent bar: a fixed
// bar, a mono label, a short line with a link to the policy, Decline and Accept.

beforeEach(() => {
  localStorage.clear();
  (mountCalEmbed as jest.Mock).mockClear();
});

describe("consent store", () => {
  it("reads null until a choice is made, then the stored choice", () => {
    expect(getConsent()).toBeNull();
    setConsent("accepted");
    expect(localStorage.getItem(CONSENT_KEY)).toBe("accepted");
    expect(getConsent()).toBe("accepted");
    setConsent("declined");
    expect(getConsent()).toBe("declined");
  });

  it("ignores any stored value that is not a choice, and never throws without storage", () => {
    localStorage.setItem(CONSENT_KEY, "maybe");
    expect(getConsent()).toBeNull();
    const spy = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(getConsent()).toBeNull();
    spy.mockRestore();
    const set = jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => setConsent("accepted")).not.toThrow();
    set.mockRestore();
  });
});

describe("PrivacyBanner", () => {
  it("shows a labelled notice with a policy link and two choices when no choice is stored", async () => {
    render(<PrivacyBanner />);
    const region = await screen.findByRole("region", { name: /privacy notice/i });
    expect(region.textContent).toMatch(/cal\.com/i);
    expect(screen.getByRole("link", { name: /privacy policy/i }).getAttribute("href")).toBe("/legal#privacy");
    expect(screen.getByRole("button", { name: /decline/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /accept/i })).toBeTruthy();
  });

  it("is not shown once a choice is stored", () => {
    setConsent("declined");
    render(<PrivacyBanner />);
    expect(screen.queryByRole("region", { name: /privacy notice/i })).toBeNull();
  });

  it.each([
    ["accept", "accepted"],
    ["decline", "declined"],
  ])("%s stores the choice and hides the banner", async (btn, stored) => {
    render(<PrivacyBanner />);
    fireEvent.click(await screen.findByRole("button", { name: new RegExp(btn, "i") }));
    expect(getConsent()).toBe(stored);
    expect(screen.queryByRole("region", { name: /privacy notice/i })).toBeNull();
  });

  it("keeps both buttons at the 44px target and the bar clear of the layer strip", () => {
    const css = readFileSync(join(process.cwd(), "app/blueprint-motion.css"), "utf8") + readFileSync(join(process.cwd(), "app/blueprint-patterns.css"), "utf8");
    expect(css).toMatch(/\.privacy \.btn\s*\{[^}]*min-height:\s*44px/);
    expect(css).toMatch(/\.privacy\s*\{[^}]*position:\s*fixed[^}]*bottom:\s*0[^}]*z-index:\s*\d{2,}/);
  });
});

describe("booking embed honours the choice", () => {
  it("loads the widget when no choice is stored or the visitor accepted", () => {
    render(<BookingEmbed />);
    expect(mountCalEmbed).toHaveBeenCalledTimes(1);
  });

  it("does not load the widget after a decline, and says why, keeping the plain link", () => {
    setConsent("declined");
    render(<BookingEmbed />);
    expect(mountCalEmbed).not.toHaveBeenCalled();
    expect(screen.getByText(/booking calendar is off/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /open the booking page in cal\.com/i })).toBeTruthy();
  });

  it("loads the widget once the visitor accepts later", () => {
    setConsent("declined");
    render(<BookingEmbed />);
    act(() => setConsent("accepted"));
    expect(mountCalEmbed).toHaveBeenCalledTimes(1);
  });
});
