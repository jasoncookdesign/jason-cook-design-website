// DRAFT — Jason to edit
import Link from "next/link";
import { engagementTypes } from "@/lib/engagement-types";

export default function EngagementTypeCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {engagementTypes.map((t) => (
        <article
          key={t.slug}
          className="flex flex-col gap-5 rounded-[6px] border border-border p-6 sm:p-10"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {t.name}
          </p>
          <h2 className="text-2xl font-extralight leading-tight tracking-[-0.03em] text-ink sm:text-[32px]">
            {t.situation}
          </h2>
          <p className="font-sans text-base leading-relaxed text-body">{t.fit}</p>
          <p className="font-sans text-base leading-relaxed text-muted-foreground">
            {t.arcSummary}
          </p>
          <Link
            href={`/engagements/${t.slug}`}
            className="mt-2 inline-flex w-fit items-center gap-3 rounded-[6px] bg-btn-bg px-[22px] py-[14px] font-sans text-[15px] font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
          >
            Explore the {t.name}
            <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-accent" />
          </Link>
        </article>
      ))}
    </div>
  );
}
