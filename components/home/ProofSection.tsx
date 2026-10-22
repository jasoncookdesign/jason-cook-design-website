import Image from "next/image";

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
    photo: "/images/people/chris-coen.jpg",
  },
  {
    quote:
      "Jason's ability to understand complex scenarios and be able to perceive the problem and empathize with the user is unparalleled.",
    name: "Rajesh Balaraman",
    role: "Software Engineering Manager",
    photo: "/images/people/rajesh-balaraman.jpg",
  },
];

export default function ProofSection() {
  return (
    <section data-sheet="A-105" data-name="PROOF">
      <div className="logos c5" data-build>
        {brandLogos.map((brand) => (
          <div key={brand.name}>
            <Image
              data-brand="1"
              src={brand.file}
              alt={brand.name}
              width={brand.width}
              height={64}
            />
          </div>
        ))}
      </div>

      <div className="intro g">
        <div className="t">
          <p className="eyebrow">Where the method came from</p>
          <h2>
            These are the programs where I learned which parts of a system a
            business <span className="em">actually needs.</span>
          </h2>
          <p className="sub">
            Work I&apos;ve done at enterprise scale. Building at that size is how
            I know what a business your size does and doesn&apos;t need.
          </p>
        </div>
      </div>

      <div className="quotes" data-build>
        {testimonials.map((t) => (
          <figure key={t.name}>
            <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="byline">
              <Image src={t.photo} alt="" width={60} height={60} />
              <span>
                <b>{t.name}</b>
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
