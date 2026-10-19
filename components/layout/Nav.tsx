"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import JcdMark from "@/components/brand/JcdMark";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/engagements", label: "Engagements" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

const DOCK_AFTER_PX = 120;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);

  // One sticky header that compacts after scrolling, so the nav and the primary action stay available.
  useEffect(() => {
    const onScroll = () => setDocked(window.scrollY > DOCK_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header data-docked={docked ? "true" : "false"} className="sticky top-0 z-20 border-b border-border bg-bg">
      <nav
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:gap-10 lg:px-10 transition-[padding] duration-200 ${docked ? "py-3" : "py-[22px]"}`}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex flex-shrink-0 items-center gap-3 whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:opacity-80"
        >
          <JcdMark className="h-5 w-auto" />
          <span className={docked ? "sr-only lg:not-sr-only" : ""}>Jason Cook Design</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex" role="list">
          <li>
            <Link href="/" className="font-sans text-sm text-ink hover:text-link transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/work" className="font-sans text-sm text-muted-foreground hover:text-ink transition-colors">
              Work
            </Link>
          </li>
          <li>
            <Link href="/engagements" className="font-sans text-sm text-muted-foreground hover:text-ink transition-colors">
              Engagements
            </Link>
          </li>
          <li>
            <Link href="/writing" className="font-sans text-sm text-muted-foreground hover:text-ink transition-colors">
              Writing
            </Link>
          </li>
          <li>
            <Link href="/about" className="font-sans text-sm text-muted-foreground hover:text-ink transition-colors">
              About
            </Link>
          </li>
        </ul>

        <div className="flex flex-shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center rounded-md p-1.5 text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-md bg-btn-bg px-[18px] py-[11px] font-sans text-sm font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover lg:inline-flex"
          >
            Start a conversation
          </a>
        </div>
      </nav>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="border-b border-border bg-bg md:hidden">
          <ul
            role="list"
            className="mx-auto flex max-w-[1200px] flex-col px-4 py-2 sm:px-6 lg:px-10"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-base text-ink transition-colors hover:text-link focus-visible:outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-[1200px] border-t border-border px-4 py-4 sm:px-6 lg:px-10">
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-md bg-btn-bg px-[18px] py-[11px] font-sans text-sm font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Start a conversation
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
