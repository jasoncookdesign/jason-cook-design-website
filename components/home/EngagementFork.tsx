// DRAFT — Jason to edit
import Link from "next/link";
import { engagementTypes } from "@/lib/engagement-types";

export default function EngagementFork() {
  return (
    <section data-sheet="A-102" data-name="FORK">
      <div className="intro g">
        <div className="t">
          <h2>Two ways to start. Pick the one that sounds like you.</h2>
        </div>
      </div>
      <div className="rows">
        {engagementTypes.map((t) => (
          <Link key={t.slug} href={`/engagements/${t.slug}`} className="row plain">
            <div>
              <p className="lbl">{t.name}</p>
              <h3>{t.situation}</h3>
            </div>
            <span className="go" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
