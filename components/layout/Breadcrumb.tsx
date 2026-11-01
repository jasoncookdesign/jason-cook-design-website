"use client";
import { usePathname } from "next/navigation";
import { trailFor } from "@/lib/breadcrumbs";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

/** The first control on every page but the home page: where this page sits in the site. A blog post's own crumb comes from its layout. */
export default function Breadcrumb() {
  const trail = trailFor(usePathname());
  return trail ? <BreadcrumbNav trail={trail} /> : null;
}
