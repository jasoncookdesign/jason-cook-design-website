"use client";
// DRAFT — Jason to edit
import Link from "next/link";
import { usePathname } from "next/navigation";
import { engagementTypes } from "@/lib/engagement-types";

/**
 * Switches between the engagement types. Each option is a link, so every type keeps its own URL.
 * It sits at the head of the first sheet: the hero below it carries the sheet tag.
 */
export default function EngagementSelector() {
  const pathname = usePathname();
  const active =
    engagementTypes.find((t) => pathname === `/engagements/${t.slug}`) ?? engagementTypes[0];

  return (
    <div className="eng-select">
      <nav aria-label="Engagement type" className="seg">
        {engagementTypes.map((t) => {
          const isActive = t.slug === active.slug;
          return (
            <Link
              key={t.slug}
              href={`/engagements/${t.slug}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="lbl">{t.name}</span>
              <span className="sit">{t.situation}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
