import { ANCHORS, LONG } from "@/lib/first-phase-terms";
import { withSocial } from "@/lib/metadata";
import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";
import CallStrip from "@/components/booking/CallStrip";
import { engagementTypes } from "@/lib/engagement-types";

// DRAFT — Jason to edit
const description =
  "What the first phase asks of you, who it is for, how the credit works, and what the guarantee covers.";

export const metadata = withSocial({
  title: "The first phase | Jason Cook Design",
  description,
  openGraph: { title: "The first phase | Jason Cook Design", description },
  twitter: { title: "The first phase | Jason Cook Design", description },
  alternates: { canonical: "/engagements/first-phase" },
});

function Section({ id, sheet, eyebrow, heading, children }: { id: string; sheet: string; eyebrow: string; heading: string; children: React.ReactNode }) {
  return (
    <section id={id} data-sheet={sheet} data-name={id.toUpperCase()}>
      <div className="intro g">
        <div className="t">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{heading}</h2>
        </div>
      </div>
      <div className="eng-body">
        <div className="prose">{children}</div>
      </div>
    </section>
  );
}

export default function FirstPhasePage() {
  const { whatItAsks, fit, credit, guarantee } = LONG;
  return (
    <>
      <section className="hero page g" data-sheet="A-110" data-name="FIRST-PHASE">
        <div className="main">
          <p className="eyebrow">Before you buy</p>
          <h1>The first phase</h1>
          <div>
            <p className="lead">What it asks of you, who it is for, and what stands behind it.</p>
          </div>
        </div>
      </section>
      <Section id={ANCHORS.whatItAsks} sheet="A-111" eyebrow="What it asks" heading={whatItAsks.heading}>
        {whatItAsks.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Section>
      <Section id={ANCHORS.fit} sheet="A-112" eyebrow="Fit" heading={fit.heading}>
        <p>{fit.forYouIntro}</p>
        <ul>
          {fit.forYou.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p>{fit.notForYouIntro}</p>
        <ul>
          {fit.notForYou.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Section>
      <Section id={ANCHORS.credit} sheet="A-113" eyebrow="Credit" heading={credit.heading}>
        {credit.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Section>
      <Section id={ANCHORS.guarantee} sheet="A-114" eyebrow="Guarantee" heading={guarantee.heading}>
        {guarantee.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>{guarantee.exclusionsIntro}</p>
        <ul>
          {guarantee.exclusions.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Section>
      <section data-sheet="A-115" data-name="ENGAGEMENTS">
        <div className="intro g">
          <div className="t">
            <p className="eyebrow">After the first phase</p>
            <h2>Where the work can go from here.</h2>
          </div>
        </div>
        <div className="eng-body">
          <div className="prose">
            <p>The first phase comes before either kind of engagement. Read about the one that matches your situation.</p>
            <ul>
              {engagementTypes.map((t) => (
                <li key={t.slug}>
                  <Link href={`/engagements/${t.slug}`}>{t.name}</Link>: {t.situation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="eng-close" data-sheet="A-116" data-name="CLOSE">
        <Link href={BOOKING_PATH} className="btn">
          Book your strategy call <span aria-hidden="true">&rarr;</span>
        </Link>
        <CallStrip />
      </section>
    </>
  );
}
