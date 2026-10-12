import Link from "next/link";

export const metadata = {
  title: "Capabilities | Jason Cook Design",
  description:
    "Architecture, specification, implementation, and handoff — the range of work Jason Cook Design takes on.",
  openGraph: {
    title: "Capabilities | Jason Cook Design",
    description:
      "Architecture, specification, implementation, and handoff — the range of work Jason Cook Design takes on.",
  },
};

// DRAFT — Jason to edit. Case-study register for procurement and institutional readers, ported from the
// 2026-09-10 placeholder draft. Tokens stay literal until named; candidates sit beside them below.
const intro = [
  "Eight case studies. Each one documents a program across enterprise software, financial services, global consumer products, and regulated industries — the client's situation, what the work found, what was built, and what the outcome was.",
  "What they have in common isn't the industry or the client type. Each program began with a diagnostic phase — the situation mapped, the constraints identified, the real problem named — before any design or build decision was made. The architectural approach runs the same way across all eight contexts. The deliverables differ.",
];

const disciplines = [
  {
    term: "Research and diagnosis",
    detail:
      "User research, stakeholder interviews, organizational observation, and technical landscape mapping — the work that establishes what the problem actually is before anyone commits to a solution.",
  },
  {
    term: "Architecture",
    detail:
      "Enterprise UI framework design, operating model architecture, consumer product design, service design, operational interface design, natural user interface research and definition.",
  },
  {
    term: "Specification",
    detail:
      "Technical specifications written to be built from — by me, by the client's team, or by another provider. The specification is the same either way.",
  },
  {
    term: "Implementation",
    detail: "Build, configuration, data migration, integration, testing, and delivery.",
  },
  {
    term: "Organizational capability",
    detail:
      "Training, governance documentation, operating procedures, and the guided handoff that makes owner capability a deliverable rather than a courtesy.",
  },
];

// Outcomes are listed only where they have a checkable source.
const outcomes = [
  "At Dell, a unified contact-center redesign produced a 20% reduction in chat pollution and a 300 basis-point improvement in customer satisfaction.",
  "At Ford, the interaction models my team designed for the Build and Price product are still in use years later.",
  "At Microsoft, my research, designs, inventions, and libraries are part of Microsoft's ongoing natural user interface story.",
  "At Banco Azteca, the constraint wasn't staffing — the operations center had no room to expand headcount. The design made the existing team more effective.",
  "At Millennium Systems International, the platform has earned 40 industry awards.",
];

// DRAFT — Jason to edit. Company data for SAM.gov and procurement readers. Entity facts are from Jason's
// own business records. Those records don't hold the identifiers or the registration's current status,
// so those stay as tokens for Jason to fill from SAM.gov.
const companyData: { term: string; detail: string; href?: string }[] = [
  { term: "Legal name", detail: "Jason Cook Design LLC" },
  { term: "Structure", detail: "Single-member limited liability company, Texas" },
  { term: "Formed", detail: "November 15, 2024" },
  { term: "UEI", detail: "[UEI]" },
  { term: "CAGE code", detail: "[CAGE-CODE]" },
  { term: "NAICS codes", detail: "[NAICS-CODES]" },
  { term: "SAM.gov registration", detail: "[SAM-STATUS]" },
  { term: "Contact", detail: "hello@jasoncookdesign.com", href: "mailto:hello@jasoncookdesign.com" },
];

const h2 = "text-2xl font-extralight tracking-[-0.03em] text-ink sm:text-[36px] sm:leading-[1.2]";
const body = "font-sans text-[17px] leading-[1.7] text-body";

export default function CapabilitiesPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="max-w-[800px]">
        <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Capabilities and institutional work
        </p>
        <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
          Capabilities
        </h1>

        <div className="mt-8 flex flex-col gap-5">
          <p className="font-sans text-xl font-light leading-relaxed text-body">{intro[0]}</p>
          <p className={body}>{intro[1]}</p>
        </div>

        <Link
          href="/work"
          className="mt-8 inline-block font-sans text-base text-link transition-colors hover:text-accent"
        >
          See all case studies &rarr;
        </Link>

        <p className={`mt-16 ${body}`}>
          The work on these programs has spanned the full arc a complex problem requires.
        </p>
        <dl className="mt-6 border-t border-border">
          {disciplines.map(({ term, detail }) => (
            <div key={term} className="grid gap-2 border-b border-border py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:pt-1">
                {term}
              </dt>
              <dd className={body}>{detail}</dd>
            </div>
          ))}
        </dl>

        <h2 className={`mt-20 ${h2}`}>Outcomes on the record</h2>
        <ul className="mt-6 flex flex-col gap-4">
          {outcomes.map((line) => (
            <li key={line} className={body}>
              {line}
            </li>
          ))}
        </ul>

        {/* DRAFT — Jason to edit. Practice-name candidates (DRAFT, none chosen; rationale in
            docs/content-token-candidates.md): Operating Architecture · Systems Architecture ·
            Structural Architecture · Integrated Architecture · Organizational Architecture.
            Entry-offer candidates: System Diagnostic · Architecture Diagnostic · Situational Diagnosis ·
            Problem Definition · Organizational Diagnosis. */}
        <h2 className={`mt-20 ${h2}`}>[PRACTICE-NAME]</h2>
        <div className="mt-6 flex flex-col gap-5">
          <p className={body}>
            The discipline behind all eight programs is [PRACTICE-NAME]: the organizational architecture that spans
            people, process, information, AI, software, infrastructure, and client experience — diagnosed before
            it&apos;s designed, designed before it&apos;s built, held in one practice from the first step through
            handoff.
          </p>
          <p className={body}>
            The Work page has the full case studies. For institutional or government procurement inquiries,
            [ENTRY-OFFER-NAME] is the paid first step: a written recommendation before any design or build begins.
          </p>
        </div>

        <h2 className={`mt-20 ${h2}`}>Company data</h2>
        <dl className="mt-6 border-t border-border">
          {companyData.map(({ term, detail, href }) => (
            <div key={term} className="grid gap-2 border-b border-border py-4 sm:grid-cols-[220px_1fr] sm:gap-8">
              <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:pt-1">
                {term}
              </dt>
              <dd className={body}>
                {href ? (
                  <a href={href} className="text-link transition-colors hover:text-accent">
                    {detail}
                  </a>
                ) : (
                  detail
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
