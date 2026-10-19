"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import JcdMark from "@/components/brand/JcdMark";
import LayerView from "@/components/layout/LayerView";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/engagements", label: "Engagements" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

const DOCK_AFTER_PX = 120;

// The top bar of the sheet (concept: .bar). One sticky element that compacts after scrolling, so the
// lockup, the nav, and the primary action stay available. The lockup is the mark beside the mono wordmark.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [cue, setCue] = useState("");

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
    <header data-docked={docked ? "true" : "false"} data-sheet="G-001" data-name="TITLE BAR" data-flat className={`bar${docked ? " docked" : ""}`}>
      <Link href="/" className="wordmark">
        <JcdMark className="wm-mark" />
        <span className="wm-name">Jason Cook Design</span>
        <span className="idx" aria-hidden="true">DOC. 01</span>
      </Link>
      <span className="cue" aria-hidden="true">{cue}</span>

      <nav className="nav" aria-label="Main navigation">
        <ul role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="btn sm">
        Start a conversation
      </a>

      <LayerView cue={cue} onCue={setCue} />

      <div className="menu">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
          className="menu-btn cursor-pointer"
        >
          {open ? "Close" : "Menu"}
        </button>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn sm menu-cta"
            >
              Start a conversation
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
