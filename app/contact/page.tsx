import Link from "next/link";

export const metadata = {
  title: "Contact | Jason Cook Design",
};

// Booking URL: cal.com/jasoncookdesign/engagement-consultation
export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-[100px] sm:px-10 sm:py-[140px]">
      <div className="max-w-[760px]">
        <p className="mb-10 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Contact
        </p>
        <h1 className="text-3xl font-extralight tracking-[-0.035em] text-ink sm:text-[62px] sm:leading-[1.1]">
          Contact
        </h1>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href="https://cal.com/jasoncookdesign/engagement-consultation"
            className="inline-flex items-center gap-3 rounded-[6px] bg-btn-bg px-[26px] py-4 font-sans text-base font-medium text-btn-ink transition-colors hover:bg-btn-bg-hover"
          >
            Book your strategy call
            <span className="block h-[7px] w-[7px] rotate-45 border-r border-t border-accent" />
          </Link>
        </div>
        <p className="mt-5 font-sans text-[15px] leading-relaxed text-muted-foreground">
          No commitment. 20 minutes. Find out what you need — and what you
          don&rsquo;t.
        </p>
      </div>
    </section>
  );
}
