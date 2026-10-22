"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades and lifts each block of a sheet into view once, as it scrolls in, and numbers the children of data-build
 * containers for the stagger. Blocks already on screen when the page
 * loads are left alone (the first screen never waits), and nothing is hidden without JavaScript, under reduced
 * motion, or while the layer view is on (the CSS gates on html.js, html.rm, html.layers). Re-runs on navigation.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const h = document.documentElement;
    // Number the children of each data-build container (capped, so a long list never makes the last item wait);
    // the stylesheet turns the number into a stagger delay.
    document.querySelectorAll<HTMLElement>("[data-build]").forEach((box) => {
      Array.from(box.children).forEach((kid, i) => (kid as HTMLElement).style.setProperty("--i", String(Math.min(i, 7))));
    });
    if (h.classList.contains("rm") || !("IntersectionObserver" in window)) return;
    // Blocks marked on an earlier run (strict mode, navigation) are observed again until they have faded in; a block
    // not yet marked joins only if it starts below the fold.
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("main > section > *")).filter((el) =>
      el.classList.contains("rv") ? !el.classList.contains("in") : el.getBoundingClientRect().top >= window.innerHeight
    );
    if (blocks.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    blocks.forEach((el) => {
      el.classList.add("rv");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
