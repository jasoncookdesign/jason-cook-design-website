import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedPosts } from "@/lib/posts";
import { pageDescription, pageTitle, withSocial } from "@/lib/metadata";
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
}): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedPosts().find((p) => p.slug === slug);
  if (!post) return {};
  const title = pageTitle(post.shortTitle ?? post.title);
  const description = pageDescription(post.excerpt);
  return withSocial({ title, description, openGraph: { title, description, type: "article" } }, `/writing/blog/${post.slug}`);
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
