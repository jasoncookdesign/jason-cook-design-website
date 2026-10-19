// DRAFT — Jason to edit
import Link from "next/link";
import { engagementTypes } from "@/lib/engagement-types";

export default function EngagementFork() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-10 sm:pb-28">
      <h2 className="mb-10 max-w-[720px] text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
        Two ways to start. Pick the one that sounds like you.
      </h2>
      <ul className="list-none border-t border-border">
        {engagementTypes.map((t) => (
          <li key={t.slug} className="border-b border-border">
            <Link
              href={`/engagements/${t.slug}`}
              className="group flex items-center justify-between gap-6 py-7"
            >
              <span className="block">
                <span className="block font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {t.name}
                </span>
                <span className="mt-3 block text-2xl font-extralight leading-tight tracking-[-0.03em] text-ink sm:text-[32px]">
                  {t.situation}
                </span>
              </span>
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[6px] border border-border transition-colors group-hover:border-ink">
                <span className="block h-[11px] w-[11px] -translate-x-[1px] rotate-45 border-r border-t border-accent" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
