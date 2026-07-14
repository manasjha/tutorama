import { TrackedDetails } from "@/components/analytics/TrackedDetails";

import { LandingSectionHeading } from "./LandingSectionHeading";

const faqs = [
  {
    question: "Where is Tutorama currently available?",
    answer:
      "Tutorama is currently live in HSR, Bengaluru. We are starting locally so tutor pairing and class support stay dependable.",
  },
  {
    question: "Is this online or offline tutoring?",
    answer:
      "Tutorama is offline home tutoring only. Classes happen at the student's home in the supported service area.",
  },
  {
    question: "Which classes do you support?",
    answer:
      "We currently support Classes 6-10 for parent-led home tutoring needs.",
  },
  {
    question: "Which subjects do you support?",
    answer:
      "We support Maths, Science, SST, and Debate & Communication Skills.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The first class is ₹199. Regular classes are ₹399 per 50-minute class.",
  },
  {
    question: "How does tutor pairing work?",
    answer:
      "We do not ask parents to browse tutor profiles and guess. Tutorama understands the child's class, subject, topic needs, learning style, and continuity needs before helping pair the right tutor.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "After signing up, you’ll enter your Tutorama dashboard. From there, we’ll help you set up your child’s details and start the tuition booking journey.",
  },
  {
    question: "What if the tutor fit is not right?",
    answer:
      "Tell the Tutorama team. We support parents with fit review and replacement support while aiming for continuity where the tutor relationship is working.",
  },
  {
    question: "How can I contact Tutorama?",
    answer: "Phone/WhatsApp: +91 9650120598. Email: info@tutorama.in.",
  },
];

export function LandingFaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-[#FDF8F0] py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-4xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="For anything else, contact Tutorama by phone, WhatsApp, or email."
          title="FAQ"
        />
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <TrackedDetails
              className="rounded-lg border border-[#1B2A4A]/10 bg-white p-5 shadow-sm open:border-[#7ECBD9]"
              key={faq.question}
              question={faq.question}
            >
              <summary className="cursor-pointer font-heading text-base font-bold text-[#1B2A4A] marker:text-[#7ECBD9]">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#667085]">
                {faq.answer}
              </p>
            </TrackedDetails>
          ))}
        </div>
      </div>
    </section>
  );
}
