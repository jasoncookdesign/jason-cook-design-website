import Link from "next/link";

const CTA_URL = "https://cal.com/jasoncookdesign/engagement-consultation";

export default function Nav() {
  return (
    <header className="border-b border-border/40 bg-background">
      <nav
        className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors"
        >
          Jason Cook Design
        </Link>

        <ul className="flex items-center gap-6" role="list">
          <li>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Work
            </Link>
          </li>
          <li>
            <Link href="/engagements" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Engagements
            </Link>
          </li>
          <li>
            <Link href="/writing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Writing
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </li>
        </ul>

        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
        >
          Start a conversation
        </a>
      </nav>
    </header>
  );
}
