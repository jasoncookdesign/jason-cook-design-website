export const metadata = {
  title: "Legal | Jason Cook Design",
  description: "Privacy policy, accessibility statement, and terms for Jason Cook Design.",
  openGraph: {
    title: "Legal | Jason Cook Design",
    description: "Privacy policy, accessibility statement, and terms for Jason Cook Design.",
  },
};

// One page for all legal text; the footer links to each section by anchor.
// The [LEGAL: …] tokens stay literal until the owner supplies the text.
const sections = [
  { id: "privacy", heading: "Privacy Policy" },
  { id: "accessibility", heading: "Accessibility Statement" },
  { id: "terms", heading: "Terms" },
];

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="max-w-[800px]">
        <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
          Legal
        </h1>
        {sections.map(({ id, heading }) => (
          <section key={id} id={id} aria-labelledby={`${id}-heading`} className="mt-16 scroll-mt-24">
            <h2 id={`${id}-heading`} className="text-2xl font-extralight tracking-[-0.03em] text-ink sm:text-[36px] sm:leading-[1.2]">
              {heading}
            </h2>
            <p className="mt-6 font-mono text-[13px] leading-relaxed text-muted-foreground">
              [LEGAL: {heading} text pending]
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
