/**
 * The early boot script sets html flags before paint: js, rm (reduced motion), layers, t3d, rmtilt, boot,
 * and the tilt tuning variables. Content never depends on it.
 */
import { LAYER_BOOT_SCRIPT } from "@/lib/layer-view-boot";

let reduced = false;
function run(search: string, stored: Record<string, string> = {}) {
  document.documentElement.className = "";
  document.documentElement.removeAttribute("style");
  sessionStorage.clear();
  Object.entries(stored).forEach(([k, v]) => sessionStorage.setItem(k, v));
  window.history.pushState({}, "", "/" + search);
  window.matchMedia = ((q: string) => ({ matches: /prefers-reduced-motion/.test(q) ? reduced : false, media: q })) as unknown as typeof window.matchMedia;
  new Function(LAYER_BOOT_SCRIPT)();
  return document.documentElement;
}

describe("layer boot script", () => {
  beforeEach(() => { reduced = false; });

  it("only marks that scripting is available by default", () => {
    const h = run("");
    expect(h.classList.contains("js")).toBe(true);
    expect(h.classList.contains("layers")).toBe(false);
  });

  it("starts with the layers on, tilting, when asked", () => {
    const h = run("?layers=1");
    expect(h.classList.contains("layers")).toBe(true);
    expect(h.classList.contains("t3d")).toBe(true);
  });

  it("starts flat under reduced motion", () => {
    reduced = true;
    const h = run("?layers=1");
    expect(h.classList.contains("rm")).toBe(true);
    expect(h.classList.contains("layers")).toBe(true);
    expect(h.classList.contains("t3d")).toBe(false);
  });

  it("restores a remembered state and suppresses transitions for the first frame", () => {
    const h = run("", { "jcd-layers": "1" });
    expect(h.classList.contains("layers")).toBe(true);
    expect(h.classList.contains("boot")).toBe(true);
  });

  it("honors a remembered opt-in to the still tilt under reduced motion", () => {
    reduced = true;
    const h = run("?layers=1", { "jcd-rmtilt": "1" });
    expect(h.classList.contains("rmtilt")).toBe(true);
    expect(h.classList.contains("t3d")).toBe(true);
  });

  it("lets the query tune the total tilt in degrees", () => {
    const h = run("?layers=1&tilt=6.4");
    expect(h.style.getPropertyValue("--k")).toBe("2");
  });

  it("never throws when storage is unavailable", () => {
    const spy = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(() => run("?layers=1")).not.toThrow();
    spy.mockRestore();
  });
});
