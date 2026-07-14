import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Card } from "@/components/ui/Card";
import { analyticsEvents } from "@/lib/analytics/events";

import { LandingSectionHeading } from "./LandingSectionHeading";

const pricingCards = [
  {
    title: "First class",
    price: "₹199",
    body: "A first class to get started.",
  },
  {
    title: "Regular classes",
    price: "₹399",
    body: "per 50-minute class",
  },
  {
    title: "Currently available",
    price: null,
    body: "Offline home tutoring in HSR, Bengaluru.",
  },
];

type PricingSectionProps = {
  loginHref: string;
};

export function PricingSection({ loginHref }: PricingSectionProps) {
  return (
    <section id="pricing" className="scroll-mt-24 bg-[#FDF8F0] py-14 sm:py-20">
      <SectionViewTracker
        eventName={analyticsEvents.landingPricingViewed}
        properties={{ section_name: "pricing" }}
      />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6">
        <LandingSectionHeading
          align="center"
          body="Simple per-class pricing for HSR families, with a low-cost first class to get started."
          title="Pricing & Parent Expectations"
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {pricingCards.map((card) => (
            <Card
              className="rounded-lg border-[#1B2A4A]/10 bg-white p-6"
              key={card.title}
            >
              <h3 className="font-heading text-lg font-bold text-[#1B2A4A]">
                {card.title}
              </h3>
              {card.price ? (
                <p className="mt-6 font-heading text-5xl font-bold leading-none text-[#7ECBD9]">
                  {card.price}
                </p>
              ) : (
                <div
                  aria-hidden="true"
                  className="mt-6 h-12 w-12 rounded-lg bg-[#F5D76E]"
                />
              )}
              <p className="mt-4 text-sm leading-6 text-[#667085]">
                {card.body}
              </p>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <TrackedLink
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1B2A4A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26385F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
            eventName={analyticsEvents.landingSectionCtaClicked}
            href={loginHref}
            properties={{
              cta_location: "pricing",
              cta_text: "Sign Up & Book Tuitions",
              section_name: "pricing",
            }}
          >
            Sign Up & Book Tuitions
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
