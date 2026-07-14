import { Card } from "@/components/ui/Card";

import { LandingSectionHeading } from "./LandingSectionHeading";

const workSteps = [
  {
    title: "Sign up",
    body: "Create your Tutorama account to begin.",
  },
  {
    title: "Add child details",
    body: "Share class, subject, and basic learning needs.",
  },
  {
    title: "Share class requirement",
    body: "Tell us the topic, goal, schedule, and preferred support style.",
  },
  {
    title: "Tutorama pairs a tutor",
    body: "We review the requirement and help pair a suitable tutor.",
  },
  {
    title: "Start classes with support",
    body: "Begin classes with follow-up, continuity, and replacement help if the fit is not right.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#FDF8F0] py-14 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="5 steps from sign-up to supported learning"
          title="How Tutorama Works"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {workSteps.map((step, index) => (
            <Card
              className="relative min-h-48 rounded-lg border-[#1B2A4A]/10 bg-white p-5"
              key={step.title}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7ECBD9] font-heading text-xl font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-[#1B2A4A]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">
                {step.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
