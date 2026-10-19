"use client";
// DRAFT — Jason to edit
import Link from "next/link";
import { usePathname } from "next/navigation";
import { engagementTypes } from "@/lib/engagement-types";

/** Switches between the engagement types. Each option is a link, so every type keeps its own URL. */
export default function EngagementSelector() {
  const pathname = usePathname();
  const active =
    engagementTypes.find((t) => pathname === `/engagements/${t.slug}`) ?? engagementTypes[0];

  return (
    <nav
      aria-label="Engagement type"
      className="mx-auto max-w-[1200px] px-6 pt-16 sm:px-10 sm:pt-20"
    >
      <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
        {engagementTypes.map((t) => {
          const isActive = t.slug === active.slug;
          return (
            <Link
              key={t.slug}
              href={`/engagements/${t.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col gap-2 p-6 transition-colors sm:p-8 ${
                isActive ? "bg-surface" : "bg-background hover:bg-surface"
              }`}
            >
              <span className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t.name}
              </span>
              <span
                className={`text-xl font-extralight leading-tight tracking-[-0.02em] sm:text-2xl ${
                  isActive ? "text-ink" : "text-body"
                }`}
              >
                {t.situation}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
