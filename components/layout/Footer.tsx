import Link from "next/link";
import { SITE_NAV } from "@/lib/site-nav";
import JcdMark from "@/components/brand/JcdMark";

// The foot of the sheet: a plate of three ruled cells (the mark, the site, the contact) over the colophon row.
export default function Footer() {
  return (
    <footer data-sheet="Z-001" data-name="COLOPHON" className="foot-sheet">
      <div className="cells c3">
        <div className="cell">
          <JcdMark className="foot-mark" />
          <p className="lbl">Jason Cook Design</p>
        </div>

        <nav aria-label="Footer navigation" className="cell">
          <p className="lbl">Site</p>
          <ul role="list">
            {SITE_NAV.filter((i) => i.href !== "/").map(({ href, label, children }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
                {children && (
                  <ul role="list" className="foot-sub">
                    {children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href}>{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li><Link href="/capabilities">Capabilities and institutional work</Link></li>
          </ul>
        </nav>

        <div className="cell">
          <p className="lbl">Contact</p>
          <a href="mailto:hello@jasoncookdesign.com" className="foot-mail">
            hello@jasoncookdesign.com
          </a>
        </div>
      </div>

      <div className="colo">
        <nav aria-label="Legal">
          <Link href="/legal#privacy">Privacy Policy</Link>
          <Link href="/legal#accessibility">Accessibility Statement</Link>
          <Link href="/legal#terms">Terms</Link>
        </nav>
        <span>&copy; Jason Cook Design LLC</span>
      </div>
    </footer>
  );
}
