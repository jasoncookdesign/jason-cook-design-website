import { render, fireEvent } from "@testing-library/react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { CLIENT_LOGIN } from "@/lib/site-nav";

jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Client login link", () => {
  it("points at the client portal", () => {
    expect(CLIENT_LOGIN).toEqual({ label: "Client login", href: "https://clients.jasoncookdesign.com" });
  });

  it("mobile menu: sits after About and before Start a conversation, with no divider", () => {
    const { container } = render(<Nav />);
    fireEvent.click(container.querySelector("button.menu-btn")!);
    const menu = container.querySelector("#mobile-menu")!;
    const labels = Array.from(menu.children).map((el) => el.textContent);
    const at = labels.indexOf("Client login");
    expect(labels[at - 1]).toBe("About");
    expect(labels[at + 1]).toBe("Start a conversation");
    expect(menu.querySelector("hr")).toBeNull();
    expect(menu.children[at].getAttribute("href")).toBe(CLIENT_LOGIN.href);
  });

  it("header bar: is the last item of the main navigation, after About", () => {
    const { container } = render(<Nav />);
    const items = Array.from(container.querySelectorAll('nav[aria-label="Main navigation"] > ul > li'));
    const last = items[items.length - 1];
    expect(items[items.length - 2].textContent).toBe("About");
    expect(last.textContent).toBe("Client login");
    expect(last.querySelector("a")!.getAttribute("href")).toBe(CLIENT_LOGIN.href);
  });

  it("footer: links to the portal from the site list", () => {
    const { container } = render(<Footer />);
    const nav = container.querySelector('nav[aria-label="Footer navigation"]')!;
    const link = Array.from(nav.querySelectorAll("a")).find((a) => a.textContent === "Client login")!;
    expect(link.getAttribute("href")).toBe(CLIENT_LOGIN.href);
  });
});
