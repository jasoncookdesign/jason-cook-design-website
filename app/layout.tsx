import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SheetFrame from "@/components/layout/SheetFrame";
import RevealOnScroll from "@/components/layout/RevealOnScroll";
import PrivacyBanner from "@/components/layout/PrivacyBanner";
import { LAYER_BOOT_SCRIPT } from "@/lib/layer-view-boot";

const newsreader = Newsreader({
  // The serif carries the site's body and display roles; globals.css aliases font-sans to this variable.
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jason Cook Design",
  description:
    "Jason Cook Design assesses, designs, and builds the products and systems a business needs, and each phase leaves you something you can use.",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Jason Cook Design",
    description:
      "Jason Cook Design assesses, designs, and builds the products and systems a business needs, and each phase leaves you something you can use.",
  },
  twitter: {
    card: "summary",
    title: "Jason Cook Design",
    description:
      "Jason Cook Design assesses, designs, and builds the products and systems a business needs, and each phase leaves you something you can use.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${newsreader.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LAYER_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <RevealOnScroll />
        <SheetFrame>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SheetFrame>
        <PrivacyBanner />
      </body>
    </html>
  );
}
