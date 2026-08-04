"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-01",
    question: "What do I get for $2,500?",
    answer: [
      "A diagnosis I lead personally, and a written recommendation at the end of it. It names the real problem, what to address first, and what addressing it takes.",
      "If the recommendation is that you shouldn't build, you get that in writing too.",
    ],
  },
  {
    id: "faq-02",
    question: "How long does it take?",
    answer: [
      "About a week from start to written recommendation.",
      "It ends when I have enough to give you a clear proceed-or-not answer, and that is not a fixed number of sessions.",
    ],
  },
  {
    id: "faq-03",
    question: "How many sessions is it?",
    answer: [
      "It runs as a guided conversation, and it can take more than one round: a session, follow-up questions, a document review.",
      "What I promise is a clear answer, proceed or don't, and however many rounds that takes.",
    ],
  },
  {
    id: "faq-04",
    question: "How much of my time will it take?",
    answer: [
      "Two to three hours of discussion, plus whatever time you need to pull together the details of the problem.",
      "The rounds can be synchronous or asynchronous: a working session, follow-up questions, a review of something you already have.",
    ],
  },
  {
    id: "faq-05",
    question: "What if you tell me not to build?",
    answer: [
      "Then that's the deliverable. You get a written advisory saying what kind of provider or work fits the problem, and where I start looking.",
      "That's a finding, not a failed engagement. It's one of the two ways the diagnosis is built to end.",
    ],
  },
  {
    id: "faq-06",
    question: "Do I actually need what the big companies use?",
    answer: [
      "No. The architecture an enterprise runs and the one your business needs have the same shape and very different amounts of it.",
      "Most of what makes the big version big is there to solve problems of scale you don't have.",
    ],
  },
  {
    id: "faq-07",
    question: "What will you tell me to skip?",
    answer: [
      "I don't know yet. That's what the diagnosis is for, and a list I could write in advance would be a list I sell to everyone.",
      "What I can tell you is that the recommendation names it explicitly: what to do first, what waits, and what you don't need at your size.",
    ],
  },
  {
    id: "faq-08",
    question: "Do you do the work yourself?",
    answer: [
      "Yes. I do the diagnosis, the architecture, the specification, and the build.",
      "When a job needs a specialist I don't have, a particular integration or a particular platform, I bring one in and I stay accountable for the result.",
    ],
  },
  {
    id: "faq-09",
    question: "What does everything after the diagnosis cost?",
    answer: [
      "It depends on what the diagnosis found, so it gets quoted.",
      "Each quote names one outcome, one fixed price, what's included, what's excluded, what I'm assuming, and what would change the number.",
    ],
  },
  {
    id: "faq-10",
    question: "Is this about my website?",
    answer: [
      "Often the website is where the problem became visible: the words stopped describing how the business works.",
      "The diagnosis looks at the offer, the operation, and the technology. What needs fixing is whatever it turns out to be.",
    ],
  },
  {
    id: "faq-11",
    question: "What do I keep when it's over?",
    answer: [
      "The architecture, design, technical specification, running system, and handoff package your team is trained on are yours to keep.",
      "The tools I use to produce them are mine.",
    ],
  },
  {
    id: "faq-12",
    question: "I already know what I want built. Is this for me?",
    answer: [
      "Probably not the diagnosis. If you can name the problem and the fix, the money is better spent building than diagnosing.",
      "Tell me on the call. If that's where you are, I'll say so.",
    ],
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/10">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
        <div className="mt-8">
          <Accordion multiple={false}>
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pb-4">
                    {faq.answer.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
