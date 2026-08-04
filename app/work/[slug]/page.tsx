import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/work";
import WorkCaseStudyContent from "@/components/work/WorkCaseStudyContent";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: `${cs.title} | Jason Cook Design` };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();
  return <WorkCaseStudyContent cs={cs} />;
}
