import { readFileSync } from "fs";
import { join } from "path";
import { mountCalEmbed } from "@/lib/cal-embed";
import { loadGtm } from "@/lib/analytics";

// A finished booking is a lead: the Cal.com embed reports it, and the site sends generate_lead with method
// booking. The wiring is checked end to end against a stand-in for Cal's command function.

type Win = Window & { Cal?: unknown; calInitialised?: boolean; dataLayer?: unknown[]; __gtmLoaded?: boolean };
const w = window as Win;

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  delete w.Cal;
  delete w.calInitialised;
  delete w.dataLayer;
  delete w.__gtmLoaded;
});

describe("booking lead event", () => {
  it("registers a bookingSuccessfulV2 handler that sends generate_lead with method booking", () => {
    mountCalEmbed(document.body.appendChild(document.createElement("div")));
    const q = (w.Cal as { q: unknown[][] }).q;
    const on = q.find((call) => call[0] === "on") as [string, { action: string; callback: () => void }] | undefined;
    expect(on).toBeDefined();
    expect(on![1].action).toBe("bookingSuccessfulV2");
    localStorage.setItem("jcd_privacy_consent", "accepted");
    loadGtm("GTM-TEST123");
    on![1].callback();
    expect(w.dataLayer).toContainEqual({ event: "generate_lead", method: "booking" });
  });
});

describe("layout and notice", () => {
  const read = (f: string) => readFileSync(join(process.cwd(), f), "utf8");

  it("mounts the Analytics component once in the root layout", () => {
    const layout = read("app/layout.tsx");
    expect(layout).toMatch(/import Analytics from "@\/components\/layout\/Analytics"/);
    expect(layout.match(/<Analytics \/>/g)).toHaveLength(1);
  });

  it("tells visitors in the privacy notice that analytics run only if they accept", () => {
    expect(read("components/layout/PrivacyBanner.tsx")).toMatch(/analytics through Google Tag Manager/i);
  });
});
