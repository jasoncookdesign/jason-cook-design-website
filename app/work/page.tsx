import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/work";

export const metadata = {
  title: "Work | Jason Cook Design",
};

export default function WorkPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-5xl font-light tracking-tight text-neutral-900 mb-4">
          Work
        </h1>
        <p className="text-xl text-neutral-500 mb-16 max-w-2xl">
          Eight enterprise engagements — each starting with a diagnosis of the
          actual problem before any design work began.
        </p>

        <ul className="space-y-12">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <Link
                href={`/work/${cs.slug}`}
                className="group block relative overflow-hidden rounded-sm bg-neutral-900"
              >
                <div className="relative h-56 md:h-72">
                  <Image
                    src={cs.backgroundImage}
                    alt={cs.client}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-1">
                    {cs.client}
                  </p>
                  <h2 className="text-2xl font-light text-white mb-2">
                    {cs.title}
                  </h2>
                  <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                    {cs.indexOneLiner}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
