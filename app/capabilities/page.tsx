import Link from "next/link";
import { withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: "Capabilities | Jason Cook Design",
  description:
    "Architecture, specification, implementation, and handoff — the range of work Jason Cook Design takes on.",
  openGraph: {
    title: "Capabilities | Jason Cook Design",
    description:
      "Architecture, specification, implementation, and handoff — the range of work Jason Cook Design takes on.",
  },
});

// DRAFT — Jason to edit. Case-study register for procurement and institutional readers, ported from the
// 2026-09-10 placeholder draft.
const intro = [
  "Each case study documents a program across enterprise software, financial services, global consumer products, and regulated industries — the client's situation, what the work found, what was built, and what the outcome was.",
  "What they have in common isn't the industry or the client type. Each program began with a diagnostic phase — the situation mapped, the constraints identified, the real problem named — before any design or build decision was made. The architectural approach runs the same way across every context. The deliverables differ. For a new product or business line, the first phase assesses the decision itself.",
];

// DRAFT — Jason to edit.
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

// DRAFT — Jason to edit. Outcomes are listed only where they have a checkable source.
const outcomes = [
  "At Dell, a unified contact-center redesign produced a 20% reduction in chat pollution and a 300 basis-point improvement in customer satisfaction.",
  "At Ford, the interaction models my team designed for the Build and Price product are still in use years later.",
  "At Microsoft, my research, designs, inventions, and libraries are part of Microsoft's ongoing natural user interface story.",
  "At Banco Azteca, the constraint wasn't staffing — the operations center had no room to expand headcount. The design made the existing team more effective.",
  "At Millennium Systems International, the platform has earned 40 industry awards.",
];

// DRAFT — Jason to edit. Company data for SAM.gov and procurement readers. UEI, CAGE code, and registration
// status are from Jason (2026-10-19). The NAICS codes are the six ratified for the retired opportunity
// engine's search scope; confirm they match the registration's Goods and Services list.
const naicsCodes = ["541511", "541512", "541519", "541430", "541611", "541990"];

const companyData: { term: string; detail: string; href?: string; codes?: string[] }[] = [
  { term: "Legal name", detail: "Jason Cook Design LLC" },
  { term: "Structure", detail: "Single-member limited liability company, Texas" },
  { term: "Formed", detail: "November 15, 2024" },
  { term: "UEI", detail: "QVJFVZEBQAL5" },
  { term: "CAGE code", detail: "22J29" },
  { term: "NAICS codes", detail: naicsCodes.join(", "), codes: naicsCodes },
  { term: "SAM.gov registration", detail: "Current" },
  { term: "Contact", detail: "hello@jasoncookdesign.com", href: "mailto:hello@jasoncookdesign.com" },
];

export default function CapabilitiesPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <p className="eyebrow">Capabilities and institutional work</p>
          <h1>Capabilities</h1>
          <div>
            <p className="lead">{intro[0]}</p>
            <p className="sub">{intro[1]}</p>
          </div>
          <div className="actions">
            <Link href="/work" className="btn ghost">
              See all case studies &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="SCOPE">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">What the work covers</p>
            <p className="lead">
              The work on these programs has spanned the full arc a complex problem requires.
            </p>
          </div>
        </div>
        <dl className="defs">
          {disciplines.map(({ term, detail }) => (
            <div key={term} className="d">
              <dt>{term}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pgs" data-sheet="A-103" data-name="PROOF">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">What the programs produced</p>
            <h2>Outcomes on the record</h2>
          </div>
        </div>
        <ul className="rows out">
          {outcomes.map((line) => (
            <li key={line} className="row hold plain">
              <p>{line}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pgs" data-sheet="A-104" data-name="COMPANY">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">For registration and procurement</p>
            <h2>Company data</h2>
            <p className="lead">
              For institutional or government procurement inquiries, every engagement opens with a paid first step: a
              written recommendation before any design or build begins.
            </p>
          </div>
        </div>
        <dl className="defs">
          {companyData.map(({ term, detail, href, codes }) => (
            <div key={term} className="d">
              <dt>{term}</dt>
              <dd>
                {codes
                  ? codes.map((code, i) => (
                      <span key={code}>
                        {i > 0 && ", "}
                        <a
                          href={`https://www.naics.com/naics-code-description/?code=${code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {code}
                        </a>
                      </span>
                    ))
                  : href
                    ? <a href={href}>{detail}</a>
                    : detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
