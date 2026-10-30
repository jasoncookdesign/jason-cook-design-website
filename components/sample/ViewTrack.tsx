"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/** Records one analytics event the first time its content scrolls into view. */
export default function ViewTrack({ event, className, children, ...rest }: { event: string; className?: string; children: React.ReactNode } & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let sent = false;
    const io = new IntersectionObserver((entries) => {
      if (sent) return;
      if (entries.some((e) => e.isIntersecting)) {
        sent = true;
        track(event);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [event]);
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
