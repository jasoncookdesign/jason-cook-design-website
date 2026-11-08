import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/work";
import { pageDescription, pageTitle, withSocial } from "@/lib/metadata";
import WorkCaseStudyContent from "@/components/work/WorkCaseStudyContent";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  const title = pageTitle(cs.title);
  const description = pageDescription(cs.subtitle);
  return withSocial({ title, description, openGraph: { title, description } }, `/work/${cs.slug}`);
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
