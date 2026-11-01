import { notFound } from "next/navigation";
import { publishedPosts } from "@/lib/posts";
import { pageTitle } from "@/lib/metadata";
import WritingPostContent from "@/components/writing/WritingPostContent";

// A post is served from its date onward. Posts not yet public are not pre-built; a page that is first
// requested after its date is built on demand, and every page is regenerated hourly.
export const revalidate = 3600;

export async function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = publishedPosts().find((p) => p.slug === slug);
  if (!post) return {};
  return { title: pageTitle(post.shortTitle ?? post.title) };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = publishedPosts().find((p) => p.slug === slug);
  if (!post) notFound();
  return <WritingPostContent post={post} />;
}
