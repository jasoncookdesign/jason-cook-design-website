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
        className="theme-toggle-btn px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors"
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        data-theme-btn="dark"
        className="theme-toggle-btn px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors"
      >
        Dark
      </button>
    </div>
  );
}
