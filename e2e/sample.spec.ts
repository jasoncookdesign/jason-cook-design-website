import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const CONSENT = "jcd_privacy_consent";

async function withConsent(page: import("@playwright/test").Page, value: "accepted" | "declined" | null) {
  await page.addInitScript(
    ([key, v]) => {
      if (v) window.localStorage.setItem(key as string, v as string);
      (window as unknown as { __gtmLoaded: boolean; dataLayer: unknown[] }).__gtmLoaded = true;
      (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
    },
    [CONSENT, value],
  );
}
const events = (page: import("@playwright/test").Page) =>
  page.evaluate(() => ((window as unknown as { dataLayer: { event?: string }[] }).dataLayer || []).map((e) => e.event).filter(Boolean));

test.describe("the sample page in a real browser", () => {
  test("the first viewport says it is a sample for a fictional client with a guarantee behind it", async ({ page }) => {
    await page.goto("/engagements/sample");
    const statement = page.getByText(/sample of the report you get from the paid first phase/i);
    await expect(statement).toBeInViewport();
    await expect(page.getByText(/fictional client/i).first()).toBeInViewport();
    await expect(page.getByText(/guarantee stands behind/i)).toBeInViewport();
  });

  test("there is one primary action in the first viewport, and it books the call", async ({ page }) => {
    await page.goto("/engagements/sample");
    const primaries = page.locator("main a.btn:not(.secondary):not(.tertiary)");
    expect(await primaries.count()).toBe(1);
    await expect(primaries.first()).toBeInViewport();
    await expect(primaries.first()).toHaveAttribute("href", "/contact");
  });

  test("the page has no horizontal overflow", async ({ page }) => {
    await page.goto("/engagements/sample");
    const over = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(over).toBe(false);
  });

  test("a screenshot is legible: its text renders at 12px or more, scrolling inside its own frame on a phone", async ({ page }) => {
    await page.goto("/engagements/sample");
    const img = page.locator('figure[data-shot="summary"] img');
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    const { rendered, natural } = await img.evaluate((el: HTMLImageElement) => ({ rendered: el.getBoundingClientRect().width, natural: el.naturalWidth }));
    // Body text in the crop is about 26px tall at its natural width.
    expect((26 * rendered) / natural).toBeGreaterThanOrEqual(12);
  });

  test("it has no accessibility violations against WCAG 2.1 AA", async ({ page }) => {
    await page.goto("/engagements/sample");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });

  test("the terms page has no accessibility violations", async ({ page }) => {
    await page.goto("/engagements/first-phase");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});

test.describe("movement events", () => {
  test("with consent accepted, each event fires once", async ({ page }) => {
    await withConsent(page, "accepted");
    await page.goto("/engagements/sample");
    await page.locator("main a.btn:not(.secondary):not(.tertiary)").evaluate((a) => a.addEventListener("click", (e) => e.preventDefault()));
    await page.locator("main a.btn:not(.secondary):not(.tertiary)").click();
    await page.locator("main a.btn:not(.secondary):not(.tertiary)").click();
    const [download] = await Promise.all([page.waitForEvent("download"), page.locator("[data-download] a[download]").click()]);
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    await page.locator("[data-checklist]").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const e = await events(page);
    expect(e.filter((x) => x === "sample_call_click")).toHaveLength(1);
    expect(e.filter((x) => x === "sample_download_click")).toHaveLength(1);
    expect(e.filter((x) => x === "sample_checklist_view")).toHaveLength(1);
  });

  for (const consent of ["declined", null] as const) {
    test(`with consent ${consent ?? "undecided"}, no event is sent`, async ({ page }) => {
      await withConsent(page, consent);
      await page.goto("/engagements/sample");
      await page.locator("main a.btn:not(.secondary):not(.tertiary)").evaluate((a) => a.addEventListener("click", (e) => e.preventDefault()));
      await page.locator("main a.btn:not(.secondary):not(.tertiary)").click();
      await page.locator("[data-checklist]").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      expect(await events(page)).toEqual([]);
    });
  }
});
