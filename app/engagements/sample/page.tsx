import manifest from "@/data/sample-manifest.json";
import { BOOKING_PATH } from "@/lib/booking";
import { DONE_CRITERIA, SHORT } from "@/lib/first-phase-terms";
import { withSocial } from "@/lib/metadata";
import CallStrip from "@/components/booking/CallStrip";
import Link from "next/link";
import TrackedLink from "@/components/sample/TrackedLink";
import ViewTrack from "@/components/sample/ViewTrack";

// DRAFT — Jason to edit
const TITLE = "A sample first-phase report for a fictional client | Jason Cook Design";
const DESCRIPTION =
  "See what the paid first phase delivers. A written sample report for a fictional client, with the guarantee that stands behind the real one.";

export const metadata = withSocial({
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
  alternates: { canonical: "/engagements/sample" },
});

function size(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function SamplePage() {
  const { pdf, shots, checklist } = manifest;
  return (
    <>
      <section className="hero page g" data-question="what-is-this" data-sheet="A-120" data-name="SAMPLE">
        <div className="main">
          <p className="eyebrow">See what you would get</p>
          <h1>A sample first-phase report</h1>
          <div>
            <p className="lead">
              This is a sample of the report you get from the paid first phase, written for a fictional client so you can see
              what the $2,500 buys. None of its people, numbers or findings belong to a real company. A guarantee stands behind the
              real one.
            </p>
            <p style={{ marginTop: 32 }}>
              <TrackedLink href={BOOKING_PATH} event="sample_call_click" className="btn">
                Book your strategy call <span aria-hidden="true">&rarr;</span>
              </TrackedLink>
            </p>
            <CallStrip />
          </div>
        </div>
      </section>

      <section data-question="what-you-get" data-sheet="A-121" data-name="WHAT-YOU-GET">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">What you get</p>
            <h2>A written report you can act on, and the evidence behind it.</h2>
          </div>
        </div>
        <div className="eng-body">
          <div className="prose">
            <p>
              The sample runs {pdf.pages} pages. A summary you can act on alone comes first, then the findings, a recommendation
              with its conditions, and appendices that hold the evidence. Here are six of its pages and what each one does for you.
            </p>
          </div>
          <div className="sample-shots">
            {shots.map((s) => (
              <figure key={s.id} data-shot={s.id}>
                <a href={s.full}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.alt} loading="lazy" />
                </a>
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section data-question="why-worth-it" data-sheet="A-122" data-name="WHY-WORTH-IT">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">Why it is worth the fee</p>
            <h2>It tells you what to decide, and why, before you spend more.</h2>
          </div>
        </div>
        <div className="eng-body">
          <div className="sample-compare">
            <div>
              <p className="eyebrow">What the owner asked</p>
              <p>&ldquo;Everyone tells me AI can sort this out.&rdquo; The owner wanted AI to explain the business.</p>
            </div>
            <div>
              <p className="eyebrow">What the report found</p>
              <p>
                The business could not take a larger deal as it runs, the owner was the queue for decisions, and its data could not
                show why. Fix what is captured first, then use AI on it.
              </p>
            </div>
          </div>
          <div className="prose">
            <p>
              That is the work: the report starts from what you say you want, tests it against evidence, and tells you what to do
              first and what would change the answer. Every finding shows its evidence and how sure we are.
            </p>
          </div>
        </div>
      </section>

      <section data-question="what-stands-behind" data-sheet="A-123" data-name="WHAT-STANDS-BEHIND">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">What stands behind it</p>
            <h2>A written list of what the report will contain, and a refund if it misses.</h2>
          </div>
        </div>
        <div className="eng-body">
          <div className="prose">
            <p>
              {SHORT.both.text}{" "}
              <Link href={SHORT.both.href} className="underline">
                {SHORT.both.label}
              </Link>
            </p>
            <p>The report is yours to take to anyone.</p>
          </div>
          <ViewTrack event="sample_checklist_view" data-checklist="">
            <table>
              <caption>What the guarantee covers, and the page of this sample that meets it</caption>
              <thead>
                <tr>
                  <th scope="col">Covered</th>
                  <th scope="col">Where it is met</th>
                </tr>
              </thead>
              <tbody>
                {DONE_CRITERIA.map((c) => {
                  const row = checklist.find((r) => r.criterion === c);
                  if (!row) throw new Error(`The sample report's checklist does not map the criterion: ${c}`);
                  return (
                    <tr key={c}>
                      <td>{c}</td>
                      <td>
                        {row.where}, PDF page {row.page}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </ViewTrack>
          <aside data-stop-panel="" className="sample-stop">
            <p className="eyebrow">What a stop would have looked like</p>
            <p>
              Suppose the evidence had shown that the agency could manage a larger deal as it runs, and that its data already showed
              how its work was going. The report would have said so: don&apos;t buy the next phase, keep what you have, and watch one
              measure. You would still hold the full report and a clear answer, and that is what the $2,500 would have bought.
            </p>
          </aside>
        </div>
      </section>

      <section data-question="next-step" data-sheet="A-124" data-name="NEXT-STEP">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">Next</p>
            <h2>Read the whole sample, then book a call.</h2>
          </div>
        </div>
        <div className="eng-body">
          <div className="prose" data-download="">
            <p>
              <TrackedLink href={pdf.href} event="sample_download_click" download className="btn secondary">
                Download the sample report
              </TrackedLink>
            </p>
            <p>
              Sample report for a fictional client, PDF, {pdf.pages} pages, {size(pdf.bytes)}.
            </p>
            <p>
              {SHORT.fit.text}{" "}
              <Link href={SHORT.fit.href} className="underline">
                {SHORT.fit.label}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
