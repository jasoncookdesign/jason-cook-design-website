/**
 * @jest-environment-options {"url": "https://jason-cook-design-website-git-feat-x.vercel.app/"}
 */
import { render, fireEvent } from "@testing-library/react";
import Analytics from "@/components/layout/Analytics";

// The same component on a preview host: the visitor has accepted, the container id is set, and still nothing
// loads or sends. The hostname comes from the page, not from a constant inside the component.

type Win = Window & { dataLayer?: unknown[]; __gtmLoaded?: boolean };
const w = window as Win;

it("loads nothing and sends nothing on a preview host, even after the visitor accepted", () => {
  localStorage.setItem("jcd_privacy_consent", "accepted");
  process.env.NEXT_PUBLIC_GTM_ID = "GTM-TEST123";
  const { container } = render(
    <div>
      <Analytics />
      <a href="mailto:hello@jasoncookdesign.com">Email</a>
    </div>
  );
  fireEvent.click(container.querySelector("a")!);
  expect(document.head.querySelectorAll('script[src*="googletagmanager.com"]')).toHaveLength(0);
  expect(w.dataLayer).toBeUndefined();
});
