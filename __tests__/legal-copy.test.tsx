import { render } from "@testing-library/react";
import LegalPage from "@/app/legal/page";

// The legal copy is drafted from what the site verifiably does, so each claim is pinned to a fact about the
// code: the third parties it loads, what it stores, when analytics run, and who to contact. The draft is for the
// owner's edit and for counsel's review before launch.

const text = (id: string) => {
  const { container } = render(<LegalPage />);
  return (container.querySelector(`section#${id}`) as HTMLElement).textContent ?? "";
};
const page = () => {
  const { container } = render(<LegalPage />);
  return container.textContent ?? "";
};

describe("privacy copy matches what the site does", () => {
  it("names the third parties the site loads, and says analytics run only after the visitor accepts", () => {
    const t = text("privacy");
    expect(t).toMatch(/Cal\.com/);
    expect(t).toMatch(/Google Tag Manager/);
    expect(t).toMatch(/Google Analytics/);
    expect(t).toMatch(/only if you accept|if you accept/i);
    expect(t).toMatch(/decline/i);
  });

  it("says the booking widget loads unless the visitor declines (not only after accepting), and that loading third parties sends the IP address", () => {
    const t = text("privacy");
    expect(t).toMatch(/unless you decline/i);
    expect(t).toMatch(/IP address/);
    expect(t).toMatch(/browser storage/i);
  });

  it("names what is stored on the visitor's device and how to reset the choice", () => {
    const t = text("privacy");
    expect(t).toMatch(/local storage/i);
    expect(t).toMatch(/clear(ing)? (this site's|the site's) data/i);
  });

  it("states the retention period and the advertising setting as configured on the analytics property (14 months, Google signals off), and names the stored consent key", () => {
    const t = text("privacy");
    expect(t).toMatch(/14 months/);
    expect(t).toMatch(/Google signals/i);
    expect(t).toMatch(/jcd_privacy_consent/);
  });

  it("says links to other sites leave this policy's scope", () => {
    expect(text("privacy")).toMatch(/other sites/i);
  });

  it("gives a contact address for questions and deletion requests", () => {
    expect(text("privacy")).toMatch(/hello@jasoncookdesign\.com/);
  });
});

describe("accessibility copy", () => {
  it("states the WCAG target without claiming conformance, and says how to report a problem", () => {
    const t = text("accessibility");
    expect(t).toMatch(/WCAG\)? 2\.1/);
    expect(t).toMatch(/Level AA/);
    expect(t).toMatch(/hasn't been audited|haven't had the site audited|not been audited/i);
    expect(t).toMatch(/hello@jasoncookdesign\.com/);
  });

  it("says informative graphics have text alternatives, and describes contrast as a design target", () => {
    const t = text("accessibility");
    expect(t).toMatch(/text alternative/i);
    expect(t).toMatch(/designed to meet/i);
  });
});

describe("terms copy", () => {
  it("names the operator and the governing law", () => {
    const t = text("terms");
    expect(t).toMatch(/Jason Cook Design LLC/);
    expect(t).toMatch(/Texas/);
  });
});

describe("the whole page", () => {
  it("shows no pending tokens and carries a last-updated date in each section", () => {
    const t = page();
    expect(t).not.toMatch(/\[LEGAL/);
    expect(t.match(/Last updated: [A-Z][a-z]+ \d{1,2}, \d{4}/g)).toHaveLength(3);
  });

  it("links the contact address in each section", () => {
    const { container } = render(<LegalPage />);
    for (const id of ["privacy", "accessibility", "terms"]) {
      const a = container.querySelector(`section#${id} a[href="mailto:hello@jasoncookdesign.com"]`);
      expect(a).not.toBeNull();
    }
  });
});

describe("the privacy notice names what is tracked on the sample page", () => {
  it("says analytics records downloads of the sample report, clicks to book from it, and reaching its checklist", () => {
    const t = text("privacy");
    expect(t).toMatch(/download the sample report/i);
    expect(t).toMatch(/book a call from the sample page/i);
    expect(t).toMatch(/reach the checklist/i);
  });
});
