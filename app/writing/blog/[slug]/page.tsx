import { notFound } from "next/navigation";
import { posts } from "@/lib/writing";
import { pageTitle } from "@/lib/metadata";
import WritingPostContent from "@/components/writing/WritingPostContent";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: pageTitle(post.shortTitle ?? post.title) };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <WritingPostContent post={post} />;
}
