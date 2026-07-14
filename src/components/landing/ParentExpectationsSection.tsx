import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Card } from "@/components/ui/Card";
import { analyticsEvents } from "@/lib/analytics/events";

import { LandingSectionHeading } from "./LandingSectionHeading";

const expectations = [
  {
    title: "Tutor pairing support",
    body: "We help match your child with a suitable tutor instead of leaving you to browse alone.",
  },
  {
    title: "Continuity with flexibility",
    body: "We aim for consistent tutor relationships while supporting fit changes if needed.",
  },
  {
    title: "Structured learning support",
    body: "Classes focus on concept clarity, problem solving, and topic needs.",
  },
  {
    title: "Parent support",
    body: "Tutorama is reachable by phone or WhatsApp for help.",
  },
  {
    title: "Replacement support",
    body: "If the tutor fit is not right, Tutorama helps review and resolve it.",
  },
];

type ParentExpectationsSectionProps = {
  loginHref: string;
};

export function ParentExpectationsSection({
  loginHref,
}: ParentExpectationsSectionProps) {
  return (
    <section className="bg-[#FDF8F0] py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="Clear support expectations for parents, without unsupported promises."
          title="Parent Expectations"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {expectations.map((expectation) => (
            <Card
              className="rounded-lg border-[#1B2A4A]/10 bg-white p-5"
              key={expectation.title}
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7BC67E] text-lg font-bold text-white"
              >
                ✓
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-[#1B2A4A]">
                {expectation.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">
                {expectation.body}
              </p>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <TrackedLink
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1B2A4A] bg-white px-5 py-3 text-sm font-semibold text-[#1B2A4A] shadow-sm transition hover:bg-[#1B2A4A]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            eventName={analyticsEvents.landingSectionCtaClicked}
            href={loginHref}
            properties={{
              cta_location: "parent_expectations",
              cta_text: "Sign Up & Book Tuitions",
              section_name: "parent_expectations",
            }}
          >
            Sign Up & Book Tuitions
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
