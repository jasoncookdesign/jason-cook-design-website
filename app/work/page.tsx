import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/work";
import { withSocial } from "@/lib/metadata";

// DRAFT — Jason to edit

export const metadata = withSocial({
  title: "Work | Jason Cook Design",
  description:
    "Case studies from Jason Cook Design's enterprise and institutional work across software, consumer platforms, and regulated industries.",
  openGraph: {
    title: "Work | Jason Cook Design",
    description:
      "Case studies from Jason Cook Design's enterprise and institutional work across software, consumer platforms, and regulated industries.",
  },
});

export default function WorkPage() {
  return (
    <>
      <section className="hero page g" data-sheet="A-101" data-name="HERO">
        <div className="main">
          <p className="eyebrow">Work</p>
          <h1>Work</h1>
          <div>
            <p className="lead">
              Each engagement started with a diagnosis of the actual problem
              before any design work began.
            </p>
          </div>
        </div>
      </section>

      <section className="pgs" data-sheet="A-102" data-name="INDEX">
        <div className="rows">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/work/${cs.slug}`} className="row thumb">
              <span className="k">{cs.client}</span>
              <span className="fig thumbnail">
                <Image
                  src={cs.backgroundImage}
                  alt={cs.client}
                  fill
                  sizes="260px"
                />
              </span>
              <div>
                <h2 className="title">{cs.title}</h2>
                <p>{cs.indexOneLiner}</p>
              </div>
              <span className="btn secondary sm">
                Read the case study <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
