import { Card } from "@/components/ui/Card";

import { LandingSectionHeading } from "./LandingSectionHeading";

const qualityChecks = [
  "Subject knowledge check",
  "Problem-solving check",
  "Concept-map building check",
  "Fit review before pairing",
];

export function TutorQualitySection() {
  return (
    <section className="bg-[#FDF8F0] py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="Process-based credibility. No claims of verified, top, or best tutors."
          title="How we review tutor fit"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {qualityChecks.map((check) => (
            <Card
              className="rounded-lg border-[#1B2A4A]/10 bg-white p-6"
              key={check}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7BC67E] text-2xl font-bold text-white">
                ✓
              </span>
              <h3 className="mt-6 font-heading text-lg font-bold leading-snug text-[#1B2A4A]">
                {check}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
