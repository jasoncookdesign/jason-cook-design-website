import Image from "next/image";

// DRAFT — Jason to edit. Fit-proof case body.
const fitProofParagraphs = [
  "The owner of a confidential practice meets clients by appointment. The business ran on a patchwork of cloud tools for scheduling, email, files, and payments. The goal was AI doing real work without any provider reading client records, and systems the owner understood well enough to run without me.",
  "Discovery came first. With the owner's input, I sorted the practice's information by sensitivity and drafted where each kind may go: client notes and identities never reach cloud AI, private strategy stays on local models, and some matters stay out of AI entirely. An outside calendar would see only blank \"Busy\" blocks, with the full record kept private. Scheduling would likely move first, running beside the old system until the owner could recover it without calling me.",
  "It was an unbilled pilot, and the owner paused it after initial discovery, before I'd written an architecture or built anything. What exists is a written record of the objectives, the hard constraints, those rules, and the questions an architecture still has to answer.",
];

// Note: the Twitter/Facebook logos use their historical marks (bird / "f"),
// not the current X/Meta rebrand — pending a decision on whether to update them.

const brandLogos = [
  { name: "Dell", file: "/images/Brands_Dell.png", width: 48 },
  { name: "Microsoft", file: "/images/Brands_Microsoft.png", width: 100 },
  { name: "Ford", file: "/images/Brands_Ford.png", width: 56 },
  { name: "Capital One", file: "/images/Brands_CapitalOne.png", width: 100 },
  { name: "Wells Fargo", file: "/images/Brands_WellsFargo.png", width: 100 },
  { name: "Disney", file: "/images/Brands_Disney.png", width: 72 },
  { name: "Netflix", file: "/images/Brands_Netflix.png", width: 72 },
  { name: "Twitter", file: "/images/Brands_Tw.png", width: 36 },
  { name: "Facebook", file: "/images/Brands_Fb.png", width: 36 },
  // AWS SVG: viewBox 304×182 → at 32px display height, width ≈ 53px
  { name: "AWS", file: "/images/Brands_AWS.svg", width: 53 },
];

const testimonials = [
  {
    quote:
      "From explanation of the user's challenge, to inception of design, through prototyping, refining, some pretty challenging feedback and countless customer interactions, Jason was there to guide us, teach us and learn from us.",
    name: "Chris Coen",
    role: "Engineering Department Lead",
  },
  {
    quote:
      "Jason's ability to understand complex scenarios and be able to perceive the problem and empathize with the user is unparalleled.",
    name: "Rajesh Balaraman",
    role: "Software Engineering Manager",
  },
];

export default function ProofSection() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
        {/* Fit-proof case. DRAFT — Jason to edit. Anonymized; the client cleared anonymized citation
            and sees the final text before publication. Verify every edit against the engagement's
            discovery record. The block deletes cleanly; nothing above or below refers to it. */}
        <article className="mb-20 max-w-[720px] border-b border-border pb-20">
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            From a discovery engagement
          </p>
          <h2 className="text-[24px] font-extralight leading-[1.2] tracking-[-0.03em] text-ink sm:text-[32px]">
            Deciding what the cloud is allowed to see
          </h2>
          {fitProofParagraphs.map((p) => (
            <p key={p} className="mt-6 font-sans text-base leading-relaxed text-body">
              {p}
            </p>
          ))}
        </article>

        {/* Range proof */}
        <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Where the method came from
            </p>
            <h2 className="text-[28px] font-extralight leading-[1.15] tracking-[-0.03em] text-ink sm:text-[44px]">
              These are the programs where I learned which parts of a system a
              business{" "}
              <span className="text-muted-foreground font-medium">actually needs.</span>
            </h2>
            <p className="mt-6 max-w-[520px] font-sans text-base leading-relaxed text-body">
              Work I&apos;ve done at enterprise scale. Building at that size is how
              I know what a business your size does and doesn&apos;t need.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-9 pt-2">
            {brandLogos.map((brand) => (
              <Image
                key={brand.name}
                data-brand="1"
                src={brand.file}
                alt={brand.name}
                width={brand.width}
                height={64}
                className="h-11 w-auto object-contain opacity-55 lg:h-16"
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid gap-14 border-t border-border pt-14 sm:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="flex flex-col gap-5">
              <span className="block h-px w-5 bg-accent" />
              <p className="font-sans text-[22px] font-light leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="font-sans text-sm text-muted-foreground">
                <strong className="font-medium text-ink">{t.name}</strong>
                <span> &mdash; {t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
