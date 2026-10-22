"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BOOKING_PATH } from "@/lib/booking";
import JcdMark from "@/components/brand/JcdMark";
import LayerView from "@/components/layout/LayerView";


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
        <span className="wm-badge">
          <JcdMark className="wm-mark" morph />
        </span>
        <span className="wm-name">Jason Cook Design</span>
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

      <Link href={BOOKING_PATH} className="btn tertiary sm">
        Start a conversation
      </Link>

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
            <Link
              href={BOOKING_PATH}
              onClick={() => setOpen(false)}
              className="btn tertiary sm menu-cta"
            >
              Start a conversation
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
