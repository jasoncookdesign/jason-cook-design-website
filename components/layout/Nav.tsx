"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/engagements", label: "Engagements" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg">
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-[22px] sm:px-6 lg:gap-10 lg:px-10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex-shrink-0 whitespace-nowrap font-sans text-[15px] font-medium tracking-[-0.01em] text-ink"
        >
          Jason Cook Design
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
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-[6px] p-1.5 text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
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
            className="hidden items-center rounded-[6px] bg-btn-bg px-[18px] py-[11px] font-sans text-sm font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover lg:inline-flex"
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
                  className="block py-3 font-sans text-base text-ink transition-colors hover:text-link focus-visible:outline-none focus-visible:rounded-[6px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
              className="inline-flex items-center rounded-[6px] bg-btn-bg px-[18px] py-[11px] font-sans text-sm font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Start a conversation
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
