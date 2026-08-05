import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg">
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-10 px-10 py-[22px]"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-sans text-[15px] font-medium tracking-[-0.01em] text-ink"
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

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-[6px] bg-btn-bg px-[18px] py-[11px] font-sans text-sm font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
          >
            Start a conversation
          </a>
        </div>
      </nav>
    </header>
  );
}
