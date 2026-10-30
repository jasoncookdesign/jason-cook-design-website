import Image from "next/image";
import Link from "next/link";
import { withSocial } from "@/lib/metadata";

export const metadata = withSocial({
  title: "About | Jason Cook Design",
  description:
    "Enterprise-scale experience, sized for smaller businesses: strategy, design, research, and implementation in one practice, starting with a paid first step.",
  openGraph: {
    title: "About | Jason Cook Design",
    description:
      "Enterprise-scale experience, sized for smaller businesses: strategy, design, research, and implementation in one practice, starting with a paid first step.",
  },
});

// DRAFT — Jason to edit. First-person practice copy, ported from the 2026-09-10 placeholder draft.
const paragraphs = [
  "Most operators who end up working with me describe the same progression. They've named a problem — a product that needed updating, a process that needed replacing, a system that had outgrown its original design — and somewhere in the effort to address it, they found the named problem wasn't the real one. The real one was structural: something in how the organization, the technology, and the customer experience related to each other.",
  "I recognize that pattern because I've spent years leading programs at enterprise scale where the presenting problem and the underlying one were rarely the same thing. Eight of those programs are documented on the Work page — at OSIsoft, Ford, Dovetail Systems, Banco Azteca, Millennium Systems International, Microsoft, Leading Hotels of the World, and Dell. The contexts differ. The diagnostic structure doesn't.",
  "What working at that scale teaches you is what a smaller business doesn't need. An enterprise runs a more complex version of the same systems a smaller operation uses — layered with redundancy that's built for scale, tooling assembled over years, governance designed for regulatory surfaces the smaller business doesn't have. The architecture of the problem is the same. The footprint isn't. Someone who has built the enterprise version has the calibration to help size a smaller one correctly — and to recognize what it can safely leave out.",
  "That judgment is what Jason Cook Design is built on. The practice combines strategy, design, research, and implementation — not as a fixed service menu, but applied in whatever proportions the problem requires, held in one practice rather than handed across seams. I bring in specialists when the work needs one; the diagnosis and the recommendation stay mine.",
  "I start every engagement with a paid first step. Nothing gets designed or built until there's a shared, written definition of what the problem actually is. For an existing business that step is a diagnosis; for a new product or business line it is an assessment of the decision itself. What it produces is a written recommendation: what the real problem is, what to address first, and what addressing it takes. If the right answer is that you shouldn't build — or that what you're looking for is outside what this practice does — that's what it says.",
  "AI is part of this work when it creates real leverage. It isn't the identity of the practice. The question the diagnosis answers is whether any given technology — AI included — is the right fit for the specific problem.",
  "The recommendation you can trust is the one that's built to say no. If that kind of rigor is what you're looking for, the paid first step is where it starts.",
];

const FIRST_STEP = "paid first step";
function withFirstPhaseLink(text: string) {
  const at = text.indexOf(FIRST_STEP);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <Link href="/engagements/first-phase" className="underline">{FIRST_STEP}</Link>
      {text.slice(at + FIRST_STEP.length)}
    </>
  );
}

// DRAFT — Jason to edit. Career facts from Jason's own records; titles as recorded there.
const background = [
  { org: "Dell Technologies", years: "2019–2024", role: "Senior Manager of Research and Design, Global Services" },
  { org: "Alpha Chi Technology", years: "2012–2019", role: "cofounder and Principal Experience Consultant" },
  { org: "Meredith Xcelerated Marketing", years: "2011–2012", role: "Director of UX" },
  { org: "IdentityMine", years: "2007–2011", role: "Director of UX" },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <h1>About</h1>
          <div>
            <p className="lead long">{paragraphs[0]}</p>
          </div>
        </div>
        <div className="side">
          <figure className="fig portrait">
            {/* A gamma curve lifts the midtones (the face and jacket) while the light backdrop stays put; the filter also drops the color. */}
            <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
              <filter id="portrait-lift" colorInterpolationFilters="sRGB">
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncR type="gamma" exponent="0.65" />
                  <feFuncG type="gamma" exponent="0.65" />
                  <feFuncB type="gamma" exponent="0.65" />
                </feComponentTransfer>
              </filter>
            </svg>
            <Image src="/images/jason-cook.jpg" alt="Portrait of Jason Cook" width={1200} height={1200} sizes="(min-width: 900px) 30vw, 90vw" priority />
            <figcaption>Jason Cook</figcaption>
          </figure>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="PROFILE">
        <div className="pg">
          <div className="prose">
            {paragraphs.slice(1).map((para, i) => (
              <p key={i}>{withFirstPhaseLink(para)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-103" data-name="FACTS">
        <dl className="defs">
          <div className="d">
            <dt>Based in</dt>
            <dd>Texas, working remotely</dd>
          </div>
          <div className="d">
            <dt>Practice</dt>
            <dd>Architecture, specification, implementation, handoff</dd>
          </div>
          <div className="d">
            <dt>Background</dt>
            <dd>
              <ul>
                {background.map(({ org, years, role }) => (
                  <li key={org}>
                    {org}, {years}: <span>{role}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="d">
            <dt>Contact</dt>
            <dd>
              <a href="mailto:hello@jasoncookdesign.com">
                hello@jasoncookdesign.com
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
