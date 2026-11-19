import { render, fireEvent } from "@testing-library/react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { CLIENT_LOGIN } from "@/lib/site-nav";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Client login link", () => {
  it("points at the client portal", () => {
    expect(CLIENT_LOGIN).toEqual({ label: "Client login", href: "https://clients.jasoncookdesign.com" });
  });

  it("menu: is the last item, after a hairline divider", () => {
    const { container } = render(<Nav />);
    fireEvent.click(container.querySelector("button.menu-btn")!);
    const menu = container.querySelector("#mobile-menu")!;
    const kids = Array.from(menu.children);
    const last = kids[kids.length - 1] as HTMLAnchorElement;
    expect(last.tagName).toBe("A");
    expect(last.textContent).toBe("Client login");
    expect(last.getAttribute("href")).toBe(CLIENT_LOGIN.href);
    const divider = kids[kids.length - 2];
    expect(divider.tagName).toBe("HR");
    expect(divider.getAttribute("aria-hidden")).toBe("true");
    expect(divider.className).toMatch(/menu-rule/);
  });

  it("footer: links to the portal from the site list", () => {
    const { container } = render(<Footer />);
    const nav = container.querySelector('nav[aria-label="Footer navigation"]')!;
    const link = Array.from(nav.querySelectorAll("a")).find((a) => a.textContent === "Client login")!;
    expect(link.getAttribute("href")).toBe(CLIENT_LOGIN.href);
  });
});
