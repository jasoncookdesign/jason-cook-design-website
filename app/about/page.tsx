export const metadata = {
  title: "About | Jason Cook Design",
  description:
    "The practice combines strategy, design, research, and implementation — not as a fixed service menu, but applied in whatever proportions the problem requires, held in one practice rather than handed across seams.",
  openGraph: {
    title: "About | Jason Cook Design",
    description:
      "The practice combines strategy, design, research, and implementation — not as a fixed service menu, but applied in whatever proportions the problem requires, held in one practice rather than handed across seams.",
  },
};

// First-person practice copy; [ENTRY-OFFER-NAME] stays literal until the offer is named.
const paragraphs = [
  "Most operators who end up working with me describe the same progression. They've named a problem — a product that needed updating, a process that needed replacing, a system that had outgrown its original design — and somewhere in the effort to address it, they found the named problem wasn't the real one. The real one was structural: something in how the organization, the technology, and the customer experience related to each other.",
  "I recognize that pattern because I've spent years leading programs at enterprise scale where the presenting problem and the underlying one were rarely the same thing. Eight of those programs are documented on the Work page — at OSIsoft, Ford, Dovetail Systems, Banco Azteca, Millennium Systems International, Microsoft, Leading Hotels of the World, and Dell. The contexts differ. The diagnostic structure doesn't.",
  "What working at that scale teaches you is what a smaller business doesn't need. An enterprise runs a more complex version of the same systems a smaller operation uses — layered with redundancy that's built for scale, tooling assembled over years, governance designed for regulatory surfaces the smaller business doesn't have. The architecture of the problem is the same. The footprint isn't. Someone who has built the enterprise version has the calibration to help size a smaller one correctly — and to recognize what it can safely leave out.",
  "That judgment is what Jason Cook Design is built on. The practice combines strategy, design, research, and implementation — not as a fixed service menu, but applied in whatever proportions the problem requires, held in one practice rather than handed across seams. I bring in specialists when the work needs one; the diagnosis and the recommendation stay mine.",
  "I start every engagement with a paid diagnosis. Nothing gets designed or built until there's a shared, written definition of what the problem actually is. That first step is [ENTRY-OFFER-NAME]. What it produces is a written recommendation: what the real problem is, what to address first, and what addressing it takes. If the right answer is that you shouldn't build — or that what you're looking for is outside what this practice does — that's what it says.",
  "AI is part of this work when it creates real leverage. It isn't the identity of the practice. The question the diagnosis answers is whether any given technology — AI included — is the right fit for the specific problem.",
  "The recommendation you can trust is the one that's built to say no. If that kind of rigor is what you're looking for, [ENTRY-OFFER-NAME] is where it starts.",
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <div className="max-w-[720px] flex-1">
          <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            About
          </p>
          <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
            About
          </h1>

          <div className="mt-10 flex flex-col gap-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-sans text-xl font-light leading-relaxed text-body-strong"
                    : "font-sans text-[17px] leading-[1.7] text-body"
                }
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <dl className="flex flex-col gap-7 border-border pl-0 lg:mt-24 lg:w-[280px] lg:flex-shrink-0 lg:border-l lg:pl-8">
          <div className="flex flex-col gap-2">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Based in
            </dt>
            <dd className="font-sans text-base leading-snug text-ink">
              Texas, working remotely
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Practice
            </dt>
            <dd className="font-sans text-base leading-snug text-ink">
              Architecture, specification, implementation, handoff
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Contact
            </dt>
            <dd className="font-sans text-base leading-snug">
              <a
                href="mailto:hello@jasoncookdesign.com"
                className="text-link transition-colors hover:text-accent"
              >
                hello@jasoncookdesign.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
