import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { Card } from "@/components/ui/Card";
import { analyticsEvents } from "@/lib/analytics/events";

import { LandingSectionHeading } from "./LandingSectionHeading";

const artifactCards = [
  {
    title: "Concept Map",
    label: "Example topic: Fractions",
    accent: "#7ECBD9",
    bullets: [
      "Equivalent fractions",
      "Comparing & ordering",
      "Addition & subtraction",
      "Word problems",
    ],
  },
  {
    title: "Class Plan",
    label: "Session focus",
    accent: "#7BC67E",
    bullets: [
      "Recap last topic & clear doubts",
      "Concept clarity with examples",
      "Guided practice on weak spots",
      "Homework checkpoint",
    ],
  },
] as const;

export function LearningArtifactsSection() {
  return (
    <section className="relative bg-[#FDF8F0] py-14 sm:py-20">
      <SectionViewTracker
        eventName={analyticsEvents.landingLearningArtifactsViewed}
        properties={{ section_name: "learning_artifacts" }}
      />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="Tutorama keeps learning structured with concept maps, class plans, and parent updates after every class."
          title="How Tutorama structures learning"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {artifactCards.map((card) => (
            <Card
              className="overflow-hidden rounded-lg border-[#1B2A4A]/10 bg-white p-0"
              key={card.title}
            >
              <div
                aria-hidden="true"
                className="h-1.5"
                style={{ backgroundColor: card.accent }}
              />
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-[#1B2A4A]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm font-semibold text-[#7A8698]">
                  {card.label}
                </p>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#667085]">
                  {card.bullets.map((bullet) => (
                    <li className="flex gap-3" key={bullet}>
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1B2A4A]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
          <Card className="overflow-hidden rounded-lg border-[#1B2A4A]/10 bg-white p-0">
            <div aria-hidden="true" className="h-1.5 bg-[#F5C4A1]" />
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-[#1B2A4A]">
                Parent Update
              </h3>
              <p className="mt-4 text-sm font-semibold text-[#7A8698]">
                After every class
              </p>
              <p className="mt-6 text-sm leading-6 text-[#667085]">
                After every class, parents receive a clear update on what was
                covered, where the child needs practice, and what the next class
                should focus on.
              </p>
            </div>
          </Card>
        </div>
        <p className="mx-auto max-w-3xl rounded-lg border border-[#1B2A4A]/10 bg-white px-5 py-4 text-center text-sm leading-6 text-[#526070] shadow-sm">
          In addition to after-class updates, Tutorama may share regular
          progress updates as classes continue.
        </p>
      </div>
    </section>
  );
}
