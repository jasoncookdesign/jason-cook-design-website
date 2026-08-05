"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-e1",
    question: "Can my own team do the build?",
    answer: [
      "Yes. The specification is written to be built from, and it's the same specification either way.",
      "What changes is who does the build phase. The two phases before it don't change at all.",
      "[GAP: whether guided adoption and handoff applies when the client's own team did the build.]",
    ],
  },
  {
    id: "faq-e2",
    question: "Do you need access to my systems?",
    answer: [
      "Not by default. I work from interviews, documents, demonstrations, and exports with the sensitive parts stripped out.",
      "I don't ask for production credentials, database access, repository access, or admin rights unless the work actually needs them.",
    ],
  },
  {
    id: "faq-e3",
    question: "What if we have to pause?",
    answer: [
      "For the first ninety days the engagement is suspended, not closed. There's no fee to restart it, and what you've paid for stays available.",
      "Past that, restarting begins with a reassessment: what's changed, what still holds, and what it costs to pick up.",
    ],
  },
  {
    id: "faq-e4",
    question: "How do we agree a phase is done?",
    answer: [
      "Each phase has a definition of done, agreed before it starts. Delivery opens a feedback window, and acceptance is a decision you make against those criteria.",
      "If the window closes and nobody has named a specific deficiency, the phase is accepted. That's in the contract, so a phase can't stay open indefinitely.",
    ],
  },
  {
    id: "faq-e5",
    question: "What if the specification prices the build past what I want to spend?",
    answer: [
      "Then you found that out before you bought the build. It's part of why specifying and building are separate phases.",
      "What's in the build gets settled in that quote: what's included, what's excluded, and what waits.",
    ],
  },
  {
    id: "faq-e6",
    question: "What's my time commitment, and how long do the phases take?",
    answer: [
      "Both depend on what you need and what resources you bring. There's no number that holds across the range.",
      "A client who needs a bespoke product and training on it commits limited time — some working sessions to make sure the right thing gets specified and built.",
      "A client whose engineering team wants to build alongside me commits substantially more.",
    ],
  },
];

export default function EngagementsFaq() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-28">
      <div className="grid gap-20 lg:grid-cols-[320px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Questions
          </p>
          <h2 className="text-3xl font-extralight tracking-[-0.03em] text-ink sm:text-[44px] sm:leading-[1.15]">
            Questions
          </h2>
        </div>
        <Accordion multiple={false}>
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer.map((para, i) => (
                  <p
                    key={i}
                    className={
                      para.startsWith("[GAP:") || para.startsWith("[HOLD")
                        ? "font-mono text-xs text-muted-foreground"
                        : "font-sans text-base leading-relaxed text-body"
                    }
                  >
                    {para}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
