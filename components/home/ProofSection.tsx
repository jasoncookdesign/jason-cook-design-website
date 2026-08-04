import Image from "next/image";

// Note: the Twitter/Facebook logos use their historical marks (bird / "f"),
// not the current X/Meta rebrand — pending a decision on whether to update them.
// AWS has no logo asset available and is rendered as text.

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
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Fit-proof placeholder — renders literally until a real case exists */}
        <div className="mb-16 rounded-xl bg-muted/40 px-6 py-8 text-sm text-muted-foreground font-mono">
          [FIT-PROOF &mdash; pending a real, consented case]
        </div>

        {/* Range proof */}
        <h2 className="text-2xl font-semibold tracking-tight">
          Where the method came from
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          These are the programs where I learned which parts of a system a
          business actually needs, and which parts it doesn&apos;t.
        </p>

        {/* Logo row — Brands_*.png images; AWS text-only (no source PNG) */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
          {brandLogos.map((brand) => (
            <Image
              key={brand.name}
              src={brand.file}
              alt={brand.name}
              width={brand.width}
              height={32}
              className="h-7 w-auto object-contain opacity-70"
            />
          ))}
          {/* AWS: no source PNG available — rendered as text */}
          <span className="text-sm font-medium text-muted-foreground opacity-70">
            AWS
          </span>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Work I&apos;ve done at enterprise scale. Building at that size is how
          I know what a business your size does and doesn&apos;t need.
        </p>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="flex flex-col gap-4">
              <p className="text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-sm">
                <strong className="font-semibold">{t.name}</strong>
                <span className="text-muted-foreground"> &mdash; {t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
