import Link from "next/link";

export const metadata = {
  title: "Contact | Jason Cook Design",
};

// Booking URL: cal.com/jasoncookdesign/engagement-consultation
export default function ContactPage() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-light tracking-tight text-neutral-900 mb-6">
          Contact
        </h1>
        <div className="mt-12">
          <Link
            href="https://cal.com/jasoncookdesign/engagement-consultation"
            className="inline-block text-lg font-light text-white bg-neutral-900 px-8 py-4 hover:bg-neutral-700 transition-colors"
          >
            Book your strategy call
          </Link>
          <p className="mt-4 text-base text-neutral-500">
            No commitment. 20 minutes. Find out what you need — and what you
            don&rsquo;t.
          </p>
        </div>
      </div>
    </section>
  );
}
