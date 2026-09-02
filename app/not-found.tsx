import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="max-w-[640px]">
        <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          404
        </p>
        <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
          Page not found
        </h1>
        <p className="mt-6 font-sans text-[17px] leading-relaxed text-body">
          The page you requested does not exist or has moved.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-[6px] bg-btn-bg px-[22px] py-4 font-sans text-[15px] font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
          >
            Return to Home
            <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
}
