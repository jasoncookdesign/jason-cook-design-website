import { render } from "@testing-library/react";
import OperatingPage from "@/app/engagements/operating/page";
import OfferingPage from "@/app/engagements/offering/page";
import { SHORT } from "@/lib/first-phase-terms";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

const price = (page: React.JSX.Element) => render(page).container.querySelector('section[data-name="PRICE"]')!;

describe("the pricing is the same for both engagement types, so the module is too", () => {
  it("renders identical markup on the offering and operating pages", () => {
    expect(price(<OfferingPage />).outerHTML).toBe(price(<OperatingPage />).outerHTML);
  });

  it("states the one published price once, with the credit, the guarantee, and the sample", () => {
    const s = price(<OfferingPage />);
    expect(s.textContent!.match(/\$2,500/g)!.length).toBeGreaterThanOrEqual(1);
    expect(s.textContent).toContain(SHORT.both.text);
    expect(s.querySelector(`a[href="${SHORT.both.href}"]`)).not.toBeNull();
    expect(s.querySelector('a[href="/engagements/sample"]')).not.toBeNull();
  });

  it("names the three ways the work is priced, as plate rows", () => {
    const rows = Array.from(price(<OfferingPage />).querySelectorAll(".pl .sp .l, .pl .sp .w"));
    const text = rows.map((r) => r.textContent).join("|");
    for (const label of ["Set in advance", "Quoted per phase", "Monthly, if you want it"]) expect(text).toContain(label);
  });
});
