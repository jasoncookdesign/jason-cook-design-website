"use client";

import Link from "next/link";
import { useRef } from "react";
import { track } from "@/lib/analytics";

/** A link that records one analytics event the first time it is clicked on a page view. Analytics itself waits for consent. */
export default function TrackedLink({
  href,
  event,
  className,
  download,
  children,
}: {
  href: string;
  event: string;
  className?: string;
  download?: boolean;
  children: React.ReactNode;
}) {
  const sent = useRef(false);
  const onClick = () => {
    if (sent.current) return;
    sent.current = true;
    track(event);
  };
  if (download) {
    return (
      <a href={href} download className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
