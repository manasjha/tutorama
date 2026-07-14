import type { SVGProps } from "react";

import { Card } from "@/components/ui/Card";

import { LandingSectionHeading } from "./LandingSectionHeading";

const subjects = [
  {
    title: "Maths",
    body: "Concept clarity, step-by-step solving, and practice support.",
    accent: "#7ECBD9",
    icon: "maths",
  },
  {
    title: "Science",
    body: "Clear explanations, diagrams, examples, and application practice.",
    accent: "#7BC67E",
    icon: "science",
  },
  {
    title: "SST",
    body: "History, civics, geography, timelines, maps, and structured recall.",
    accent: "#F5D76E",
    icon: "sst",
  },
  {
    title: "Debate & Communication Skills",
    body: "Speaking confidence, argument structure, expression, and clarity.",
    accent: "#F5C4A1",
    icon: "debate",
  },
] as const;

export function SubjectsSection() {
  return (
    <section id="subjects" className="scroll-mt-24 bg-[#FDF8F0] py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="Classes 6-10, offline home tutoring in HSR, Bengaluru."
          title="Subjects"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Card
              className="overflow-hidden rounded-lg border-[#1B2A4A]/10 bg-white p-0"
              key={subject.title}
            >
              <div
                aria-hidden="true"
                className="h-1.5"
                style={{ backgroundColor: subject.accent }}
              />
              <div className="grid min-h-64 gap-4 p-6 text-center">
                <SubjectIcon
                  className="mx-auto h-12 w-12 text-[#1B2A4A]"
                  name={subject.icon}
                />
                <h3 className="font-heading text-xl font-bold leading-snug text-[#1B2A4A]">
                  {subject.title}
                </h3>
                <p className="text-sm leading-6 text-[#667085]">
                  {subject.body}
                </p>
                <div
                  aria-hidden="true"
                  className="mt-auto grid gap-2 border-t border-[#1B2A4A]/10 pt-4"
                >
                  <span className="h-px rounded-full bg-[#1B2A4A]/10" />
                  <span className="h-px rounded-full bg-[#1B2A4A]/10" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

type SubjectIconName = (typeof subjects)[number]["icon"];

function SubjectIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: SubjectIconName }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 48 48",
    ...props,
  };

  if (name === "maths") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <rect height="30" rx="5" width="30" x="9" y="9" />
        <path d="M17 17h14M17 24h14M17 31h6" />
        <path d="M29 29l5 5M34 29l-5 5" />
      </svg>
    );
  }

  if (name === "science") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M20 8h8M22 8v10L13 34a5 5 0 0 0 4.4 7h13.2A5 5 0 0 0 35 34l-9-16V8" />
        <path d="M18 32h12M20 26h8" />
        <path d="M34 15h.1M38 20h.1" />
      </svg>
    );
  }

  if (name === "sst") {
    return (
      <svg aria-hidden="true" {...commonProps}>
        <path d="M10 14l9-4 10 4 9-4v26l-9 4-10-4-9 4V14z" />
        <path d="M19 10v26M29 14v26" />
        <path d="M33 18c2 0 4 1.5 4 3.8 0 3-4 7.2-4 7.2s-4-4.2-4-7.2c0-2.3 2-3.8 4-3.8z" />
        <path d="M33 22h.1" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" {...commonProps}>
      <path d="M11 16a7 7 0 0 1 7-7h12a7 7 0 0 1 7 7v7a7 7 0 0 1-7 7h-8l-8 7v-7a7 7 0 0 1-3-1.4" />
      <path d="M18 18h12M18 24h8" />
    </svg>
  );
}
