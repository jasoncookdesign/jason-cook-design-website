import { withSocial } from "@/lib/metadata";
import { legalSections, CONTACT_EMAIL } from "@/lib/legal";
export const metadata = withSocial({
  title: "Legal | Jason Cook Design",
  description: "Privacy policy, accessibility statement, and terms for Jason Cook Design.",
  openGraph: {
    title: "Legal | Jason Cook Design",
    description: "Privacy policy, accessibility statement, and terms for Jason Cook Design.",
  },
});

// One page for all legal text; the footer links to each section by anchor. The copy lives in lib/legal.ts.

// Turns each mention of the contact address into a mailto link.
function withEmailLink(detail: string) {
  return detail.split(CONTACT_EMAIL).flatMap((part, i, all) =>
    i < all.length - 1
      ? [part, <a key={i} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>]
      : [part]
  );
}

export default function LegalPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <h1>Legal</h1>
        </div>
      </section>
      {legalSections.map(({ id, heading, eyebrow, entries }, i) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className="pgs"
          data-sheet={`A-${102 + i}`}
          data-name={id.toUpperCase()}
        >
          <div className="intro g">
            <div className="t">
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={`${id}-heading`}>{heading}</h2>
            </div>
          </div>
          <dl className="defs">
            {entries.map(({ term, detail }) => (
              <div key={term} className="d">
                <dt>{term}</dt>
                <dd>{withEmailLink(detail)}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  );
}
