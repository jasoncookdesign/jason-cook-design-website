"use client";

type Theme = "light" | "dark";

// The active/inactive look is driven entirely by CSS keyed off <html data-theme>
// (see globals.css) rather than component state — that keeps this correct on
// first paint (the pre-hydration init script in layout.tsx already set the
// attribute) with no client/server render mismatch to reconcile.
function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("jcd-theme", next);
  } catch {
    // localStorage unavailable (private mode, disabled storage) — theme
    // still applies for this page view, it just won't persist.
  }
}

// Minimal single-stroke sun: circle outline + 8 short hairline rays, matching
// the hamburger icon's strokeWidth/strokeLinecap/stroke="currentColor" register.
function SunIcon() {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      {/* Circle outline, no fill */}
      <circle
        cx="8"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* 8 rays: each is the same vertical segment rotated around the center */}
      {angles.map((angle) => (
        <line
          key={angle}
          x1="8"
          y1="1.5"
          x2="8"
          y2="3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={angle > 0 ? `rotate(${angle} 8 8)` : undefined}
        />
      ))}
    </svg>
  );
}

// Minimal single-stroke crescent moon: a circle outline masked by an offset
// circle so only the crescent portion of the stroke is visible.  No fill,
// no gradient — same stroke convention as the hamburger and sun icons.
// mask="url(#moon-mask)" keyed off fill="white/black" is independent of
// currentColor, so the stroke color from the active/inactive CSS state
// continues to work correctly.
function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <mask id="moon-mask">
          {/* White = show stroke; black = hide stroke */}
          <rect width="16" height="16" fill="white" />
          {/* Shadow circle offset to the left cuts a crescent on the right side */}
          <circle cx="5" cy="8" r="5" fill="black" />
        </mask>
      </defs>
      <circle
        cx="8"
        cy="8"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        mask="url(#moon-mask)"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  return (
    <div
      className="flex items-center overflow-hidden rounded-[6px] border border-border"
      role="group"
      aria-label="Color theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        data-theme-btn="light"
        aria-label="Light theme"
        className="theme-toggle-btn cursor-pointer p-2 text-muted-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <SunIcon />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        data-theme-btn="dark"
        aria-label="Dark theme"
        className="theme-toggle-btn cursor-pointer p-2 text-muted-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <MoonIcon />
      </button>
    </div>
  );
}
