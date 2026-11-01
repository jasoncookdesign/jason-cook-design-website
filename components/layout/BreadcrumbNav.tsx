import Link from "next/link";
import type { Crumb } from "@/lib/breadcrumbs";

/** The breadcrumb trail as markup. Used by the client Breadcrumb and by the post page's layout. */
export default function BreadcrumbNav({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="crumb crumbbar" aria-label="Breadcrumb">
      <ol>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.href}>
              {last ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
