import nextConfig from "../next.config";

type Rule = { source: string; destination: string; permanent: boolean };

// Resolve a path the way Next does for these rules: first match wins, ":name" matches one segment.
async function resolve(path: string): Promise<{ to: string; permanent: boolean } | null> {
  const rules = ((await nextConfig.redirects?.()) ?? []) as Rule[];
  for (const r of rules) {
    const names: string[] = [];
    const pattern = r.source.replace(/[.]/g, "\\.").replace(/:(\w+)/g, (_m, n) => (names.push(n), "([^/]+)"));
    const m = path.match(new RegExp(`^${pattern}$`));
    if (!m) continue;
    let to = r.destination;
    names.forEach((n, i) => (to = to.replace(`:${n}`, m[i + 1])));
    return { to, permanent: r.permanent };
  }
  return null;
}

describe("legacy jasoncookdesign.github.io URLs keep working", () => {
  it.each([
    ["/cs01.html", "/work/osisoft"],
    ["/cs02.html", "/work/ford"],
    ["/cs03.html", "/work/qu-pos"],
    ["/cs04.html", "/work/banco-azteca"],
    ["/cs05.html", "/work/millennium-meevo"],
    ["/cs06.html", "/work/microsoft-surface"],
    ["/cs07.html", "/work/leading-hotels"],
    ["/cs08.html", "/work/dell"],
    ["/index.html", "/"],
    ["/blog", "/writing"],
    ["/blog/index.html", "/writing"],
    ["/blog/the-quality-gate", "/writing/the-quality-gate"],
    ["/blog/why-this-blog-exists", "/writing/why-this-blog-exists"],
    [
      "/blog/you-re-not-building-a-tool-you-re-building-an-organization-treat-it-that-way",
      "/writing/youre-not-building-a-tool-youre-building-an-organization",
    ],
  ])("%s permanently redirects to %s", async (from, to) => {
    expect(await resolve(from)).toEqual({ to, permanent: true });
  });

  it.each([
    ["/calendar", "https://cal.com/jasoncookdesign"],
    ["/calendar/30min", "https://cal.com/jasoncookdesign/meeting"],
    ["/calendar/60min", "https://cal.com/jasoncookdesign/meeting"],
    ["/calendar/coffee", "https://cal.com/jasoncookdesign/coffee"],
    ["/calendar/breakfast", "https://cal.com/jasoncookdesign/breakfast"],
    ["/calendar/lunch", "https://cal.com/jasoncookdesign/lunch"],
    ["/calendar/dinner", "https://cal.com/jasoncookdesign/dinner"],
    ["/calendar/studio", "https://cal.com/jasoncookdesign/studio"],
  ])("%s temporarily redirects to booking at %s", async (from, to) => {
    expect(await resolve(from)).toEqual({ to, permanent: false });
  });

  it("leaves current routes and the retired feed alone", async () => {
    for (const path of ["/", "/work", "/writing/the-quality-gate", "/engagements", "/blog/feed.xml"]) {
      expect(await resolve(path)).toBeNull();
    }
  });

  it("does not open arbitrary calendar paths", async () => {
    expect(await resolve("/calendar/anything-else")).toBeNull();
  });
});
