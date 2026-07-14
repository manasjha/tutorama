import { Card } from "@/components/ui/Card";

const pairingCards = [
  {
    title: "Understand the need",
    body: "Class, subject, topic needs, learning style, and preferred support are reviewed first.",
  },
  {
    title: "Review tutor fit",
    body: "Tutorama looks at subject fit and problem-solving readiness before suggesting the pairing.",
  },
  {
    title: "Pair with continuity",
    body: "We aim for a consistent tutor relationship once the fit is working for the child.",
  },
  {
    title: "Support if fit changes",
    body: "If the tutor fit is not right, Tutorama helps review and resolve it.",
  },
];

export function TutorPairingSection() {
  return (
    <section className="bg-[#1B2A4A] py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="font-heading text-sm font-semibold text-[#7ECBD9]">
            Tutor Pairing
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Managed tutor pairing, not tutor browsing
          </h2>
          <p className="mt-4 text-base leading-7 text-white/78">
            Tutorama does not ask parents to browse tutor profiles and guess. We
            understand the child’s class, subject, topic needs, learning style,
            and continuity needs, then help pair a suitable tutor.
          </p>
          <ConceptMapMotif />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pairingCards.map((card) => (
            <Card
              className="rounded-lg border-white/10 bg-white p-5 shadow-none"
              key={card.title}
            >
              <div className="mb-4 h-1.5 w-14 rounded-full bg-[#F5D76E]" />
              <h3 className="font-heading text-lg font-bold text-[#1B2A4A]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">
                {card.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptMapMotif() {
  return (
    <div
      aria-hidden="true"
      className="mt-8 hidden h-28 max-w-sm rounded-lg border border-white/10 bg-white/5 p-5 sm:block"
    >
      <div className="relative h-full">
        <span className="absolute left-2 top-8 h-4 w-4 rounded-full bg-[#7ECBD9]" />
        <span className="absolute left-[42%] top-3 h-4 w-4 rounded-full bg-[#F5D76E]" />
        <span className="absolute left-[42%] bottom-3 h-4 w-4 rounded-full bg-[#7BC67E]" />
        <span className="absolute right-4 top-8 h-4 w-4 rounded-full bg-[#F5C4A1]" />
        <span className="absolute left-6 top-[38px] h-px w-[36%] bg-white/30" />
        <span className="absolute left-[45%] top-6 h-px w-[35%] rotate-[12deg] bg-white/30" />
        <span className="absolute left-[45%] bottom-6 h-px w-[35%] -rotate-[12deg] bg-white/30" />
      </div>
    </div>
  );
}
