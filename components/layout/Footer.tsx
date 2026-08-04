import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background mt-auto">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
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
              <li>
                <Link href="/capabilities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Capabilities and institutional work
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="text-sm text-muted-foreground">
            <a
              href="mailto:hello@jasoncookdesign.com"
              className="hover:text-foreground transition-colors"
            >
              hello@jasoncookdesign.com
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-border/40 pt-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Accessibility Statement
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; Jason Cook Design LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
