import type { NextConfig } from "next";

// Old jasoncookdesign.github.io URLs, so links and bookmarks survive the domain cutover.
// Listed explicitly rather than by pattern so only pages that really existed redirect.
const caseStudies = [
  "osisoft",
  "ford",
  "qu-pos",
  "banco-azteca",
  "millennium-meevo",
  "microsoft-surface",
  "leading-hotels",
  "dell",
];

const posts: Record<string, string> = {
  "the-quality-gate": "the-quality-gate",
  "why-this-blog-exists": "why-this-blog-exists",
  "your-ai-doesnt-have-to-go-rogue-to-break-your-rules": "your-ai-doesnt-have-to-go-rogue-to-break-your-rules",
  "youre-not-building-a-tool-youre-building-an-organization": "youre-not-building-a-tool-youre-building-an-organization",
  "you-re-not-building-a-tool-you-re-building-an-organization-treat-it-that-way":
    "youre-not-building-a-tool-youre-building-an-organization",
};

// Booking links are external and may change, so these redirect temporarily.
const CAL = "https://cal.com/jasoncookdesign";
const calendar: Record<string, string> = {
  "30min": `${CAL}/meeting`,
  "60min": `${CAL}/meeting`,
  breakfast: `${CAL}/breakfast`,
  coffee: `${CAL}/coffee`,
  lunch: `${CAL}/lunch`,
  dinner: `${CAL}/dinner`,
  studio: `${CAL}/studio`,
};

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...caseStudies.map((slug, i) => ({
        source: `/cs0${i + 1}.html`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/index.html", destination: "/writing", permanent: true },
      ...Object.entries(posts).map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/writing/${to}`,
        permanent: true,
      })),
      { source: "/calendar", destination: CAL, permanent: false },
      ...Object.entries(calendar).map(([from, to]) => ({
        source: `/calendar/${from}`,
        destination: to,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
