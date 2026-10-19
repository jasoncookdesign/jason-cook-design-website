// DRAFT — Jason to edit, and counsel to review the privacy and terms text before launch.
// Drafted only from what the site does today: the third parties it loads (Cal.com, and Google Tag Manager after
// consent), what it stores in the browser (the privacy choice, the layers-view preferences), and the one contact
// address. Verified against the analytics property on 2026-10-19: data retention is 14 months and Google signals
// is off. A fresh-context audit checked each claim against the code on 2026-10-19. Facts to confirm before the cutover: the hosting provider (written as Vercel, which the cutover plan
// names), and that email addresses are used only to reply.
export const CONTACT_EMAIL = "hello@jasoncookdesign.com";
const UPDATED = "Last updated: October 19, 2026.";

export type LegalEntry = { term: string; detail: string };
export type LegalSection = { id: string; heading: string; eyebrow: string; entries: LegalEntry[] };

export const legalSections: LegalSection[] = [
  {
    id: "privacy",
    heading: "Privacy Policy",
    eyebrow: "What this site collects and why",
    entries: [
      {
        term: "Summary",
        detail:
          "This page explains what happens to your information when you use jasoncookdesign.com. The site has no accounts, no forms, and no ads, and I don't sell anything about you.",
      },
      {
        term: "Booking",
        detail:
          "The booking calendar is an embedded Cal.com widget. It loads unless you decline the privacy notice, so it also loads while you haven't chosen yet. Loading it sends your IP address and browser details to Cal.com, which may set cookies or use other browser storage. If you book a call, Cal.com collects the name, email address, and notes you enter and passes them to me. Cal.com's own privacy policy covers what it does with that data. If you decline, the widget stays off, and the booking link still takes you to Cal.com's page, where the same applies.",
      },
      {
        term: "Analytics",
        detail:
          "If you accept the privacy notice, the site loads Google Tag Manager and Google Analytics. They record which pages you visit, roughly where you are, what device and browser you use, and whether you click the email link or finish a booking. Loading them sends your IP address to Google, which sets cookies for this. I haven't turned on Google's advertising features, such as Google signals. If you decline or ignore the notice, none of it loads.",
      },
      {
        term: "Retention",
        detail:
          "Google keeps analytics data for 14 months, then deletes it. Cal.com keeps booking details under its own retention rules.",
      },
      {
        term: "Email",
        detail: `If you write to ${CONTACT_EMAIL}, I receive your address and whatever you send. I use it to reply, and I don't add you to a mailing list unless you ask.`,
      },
      {
        term: "On your device",
        detail:
          "The site keeps your answer to the privacy notice in your browser's local storage, under the name jcd_privacy_consent, and keeps your display preferences for the layers view until you close the tab. Neither leaves your device.",
      },
      {
        term: "Other sites",
        detail: "Some pages link to other sites. Following a link takes you to that site's own privacy practices, which this policy doesn't cover.",
      },
      {
        term: "Hosting",
        detail:
          "The site is hosted on Vercel, which keeps standard server logs, including IP addresses, for security and operations.",
      },
      {
        term: "Your choices",
        detail: `To change your answer on analytics, clear this site's data in your browser and the notice returns. Analytics then stay off from your next page load until you choose again. To ask what I hold about you, or to have it deleted, write to ${CONTACT_EMAIL}.`,
      },
      { term: "Changes", detail: `If this policy changes, the date below changes with it. ${UPDATED}` },
    ],
  },
  {
    id: "accessibility",
    heading: "Accessibility Statement",
    eyebrow: "How this site works for every visitor",
    entries: [
      {
        term: "Goal",
        detail:
          "I want everyone to be able to use this site, including people who rely on screen readers, keyboards, or other assistive technology.",
      },
      {
        term: "Target",
        detail:
          "The target is the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. In practice, text and controls are designed to meet the contrast minimums, every control I built can be reached and used from a keyboard with a visible focus ring, pages have a logical heading structure, decorative graphics are hidden from assistive technology, informative graphics have a text alternative, and animation is turned off when your system asks for reduced motion.",
      },
      {
        term: "Limits",
        detail:
          "I haven't had the site audited by an outside party, so I can't claim full conformance. The booking calendar is built and run by Cal.com, and I don't control its accessibility.",
      },
      {
        term: "Feedback",
        detail: `If something doesn't work for you, write to ${CONTACT_EMAIL}. I'll fix it, or find another way to get you the same information. ${UPDATED}`,
      },
    ],
  },
  {
    id: "terms",
    heading: "Terms",
    eyebrow: "The ground rules for using this site",
    entries: [
      {
        term: "Who",
        detail:
          "These terms cover your use of jasoncookdesign.com, which Jason Cook Design LLC, a Texas limited liability company, operates. By using the site, you agree to them.",
      },
      {
        term: "What the site is",
        detail:
          "The site describes my services and doesn't form a contract by itself. Work begins after we agree on a written scope and price.",
      },
      {
        term: "Content",
        detail:
          "The text, design, and code on this site belong to Jason Cook Design LLC or are used with permission. You may link to any page and quote short passages with attribution. Please ask before copying more. Client names and marks belong to their owners and appear only to describe past work.",
      },
      {
        term: "No warranty",
        detail:
          "I work to keep everything accurate and current. The site is provided as is, without warranties of any kind, and my liability for any use of it is limited to the extent Texas law allows.",
      },
      {
        term: "Other sites",
        detail: "Links to other sites are there for convenience. I'm not responsible for what those sites say or do.",
      },
      {
        term: "Governing law",
        detail: `Texas law governs these terms. Questions go to ${CONTACT_EMAIL}. ${UPDATED}`,
      },
    ],
  },
];
