"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trailFor } from "@/lib/breadcrumbs";

/** The first control on every page but the home page: where this page sits in the site. */
export default function Breadcrumb() {
  const trail = trailFor(usePathname());
  if (!trail) return null;
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
