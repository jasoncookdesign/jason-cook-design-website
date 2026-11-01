import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { HOME, WRITING } from "@/lib/breadcrumbs";
import { publishedPosts } from "@/lib/posts";

/** The post's crumb is rendered here, from the post itself, so it is right on every visit and never names a post before its date. */
export default async function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = publishedPosts().find((p) => p.slug === slug);
  return (
    <>
      {post && (
        <BreadcrumbNav
          trail={[HOME, WRITING, { label: post.shortTitle ?? post.title, href: `/writing/blog/${post.slug}` }]}
        />
      )}
      {children}
    </>
  );
}
