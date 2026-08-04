const logoRow = [
  "Dell",
  "Microsoft",
  "Ford",
  "Capital One",
  "Wells Fargo",
  "Disney",
  "Netflix",
  "Twitter",
  "Facebook",
  "AWS",
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

        {/* Logo row — text representation pending final logo assets */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {logoRow.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Work I&apos;ve done at enterprise scale. Building at that size is how I know
          what a business your size does and doesn&apos;t need.
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
