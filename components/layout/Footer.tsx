import Link from "next/link";
import JcdMark from "@/components/brand/JcdMark";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink bg-bg text-ink">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 pb-10 pt-20">
        <div className="grid divide-y divide-border border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col gap-5 p-6">
            <JcdMark variant="scanline" className="h-12 w-auto self-start text-ink" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-band-ink">
              Jason Cook Design
            </p>
          </div>

          <nav aria-label="Footer navigation" className="p-6">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-band-muted">
              Site
            </p>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <Link href="/work" className="font-sans text-[15px] text-band-body hover:text-band-ink transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/engagements" className="font-sans text-[15px] text-band-body hover:text-band-ink transition-colors">
                  Engagements
                </Link>
              </li>
              <li>
                <Link href="/writing" className="font-sans text-[15px] text-band-body hover:text-band-ink transition-colors">
                  Writing
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-sans text-[15px] text-band-body hover:text-band-ink transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="font-sans text-[15px] text-band-body hover:text-band-ink transition-colors">
                  Capabilities and institutional work
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-6">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-band-muted">
              Contact
            </p>
            <a
              href="mailto:hello@jasoncookdesign.com"
              className="font-sans text-[22px] font-light leading-[1.4] text-band-ink hover:text-accent transition-colors"
            >
              hello@jasoncookdesign.com
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/legal#privacy" className="font-sans text-[13px] text-band-muted hover:text-band-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal#accessibility" className="font-sans text-[13px] text-band-muted hover:text-band-ink transition-colors">
              Accessibility Statement
            </Link>
            <Link href="/legal#terms" className="font-sans text-[13px] text-band-muted hover:text-band-ink transition-colors">
              Terms
            </Link>
          </div>
          <p className="font-sans text-[13px] text-band-muted">
            &copy; Jason Cook Design LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
