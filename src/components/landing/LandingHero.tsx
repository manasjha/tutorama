import { TrackedLink } from "@/components/analytics/TrackedLink";
import { analyticsEvents } from "@/lib/analytics/events";

const serviceBadges = [
  "Live in HSR, Bengaluru",
  "Classes 6-10",
  "First class ₹199",
  "₹399 per 50-minute class",
];

type LandingHeroProps = {
  loginHref: string;
};

export function LandingHero({ loginHref }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FDF8F0]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 border-y border-[#1B2A4A]/5 bg-[repeating-linear-gradient(0deg,rgba(27,42,74,0.04)_0px,rgba(27,42,74,0.04)_1px,transparent_1px,transparent_16px)]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="grid gap-6">
          <div className="flex flex-wrap gap-2">
            {serviceBadges.map((badge) => (
              <span
                className="rounded-full border border-[#1B2A4A]/10 bg-white px-3 py-1 text-xs font-semibold text-[#1B2A4A] shadow-sm"
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="grid gap-4">
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-[#1B2A4A] sm:text-5xl lg:text-6xl">
              Offline home tutoring in HSR, managed end-to-end for your child.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[#526070] sm:text-lg sm:leading-8">
              Tutorama helps parents find the right tutor fit for Classes 6-10
              across Maths, Science, SST, and Debate & Communication Skills —
              with tutor pairing, class continuity, and support managed by us.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1B2A4A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26385F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              eventName={analyticsEvents.landingPrimaryCtaClicked}
              href={loginHref}
              properties={{
                cta_location: "hero",
                cta_text: "Sign Up & Book Tuitions",
              }}
            >
              Sign Up & Book Tuitions
            </TrackedLink>
            <TrackedLink
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#1B2A4A] bg-white px-5 py-3 text-sm font-semibold text-[#1B2A4A] transition hover:bg-[#1B2A4A]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A4A]"
              eventName={analyticsEvents.landingLoginClicked}
              href={loginHref}
              properties={{
                cta_location: "hero",
                cta_text: "Log In",
              }}
            >
              Log In
            </TrackedLink>
          </div>
        </div>
        <StudyDeskVisual />
      </div>
    </section>
  );
}

function StudyDeskVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:justify-self-end">
      <div
        aria-hidden="true"
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1B2A4A] p-6 shadow-[0_18px_50px_rgba(27,42,74,0.22)]"
      >
        <div className="absolute left-10 top-8 h-3 w-20 rounded-full bg-[#7ECBD9]" />
        <div className="absolute left-32 top-8 h-3 w-16 rounded-full bg-[#F5D76E]" />
        <div className="absolute left-56 top-8 h-3 w-14 rounded-full bg-[#7BC67E]" />

        <div className="absolute bottom-10 left-1/2 top-16 w-[72%] -translate-x-1/2 rounded-lg border border-[#1B2A4A]/10 bg-[#FFFDF7] shadow-[0_16px_22px_rgba(0,0,0,0.2)]">
          <div className="absolute bottom-4 left-1/2 top-4 w-px bg-[#E7DEC9]" />
          <div className="absolute inset-x-8 top-8 grid gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                className="h-px rounded-full bg-[#D9D1BF]"
                key={`left-line-${index}`}
              />
            ))}
          </div>
          <div className="absolute inset-x-8 top-8 grid translate-x-[53%] gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                className="h-px w-[42%] rounded-full bg-[#D9D1BF]"
                key={`right-line-${index}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute left-7 top-14 w-36 -rotate-6 rounded-lg border border-[#1B2A4A]/10 bg-white p-4 shadow-lg">
          <div className="mb-3 h-2 w-16 rounded-full bg-[#7ECBD9]" />
          <p className="font-heading text-lg font-bold text-[#1B2A4A]">
            Class Plan
          </p>
          <div className="mt-3 grid gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                className="flex items-center gap-2"
                key={`plan-line-${index}`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#7ECBD9]" />
                <span className="h-px flex-1 bg-[#D9D1BF]" />
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-14 right-12 h-48 w-4 rounded-full bg-[#F5D76E] shadow-lg">
          <div className="h-5 rounded-t-full bg-[#F5C4A1]" />
          <div className="absolute bottom-0 h-5 w-full rounded-b-full bg-[#2B2D35]" />
        </div>

        <Sparkle className="right-24 top-20" />
        <Sparkle className="bottom-20 left-16 scale-75" />
      </div>
    </div>
  );
}

function Sparkle({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-9 w-9 text-white ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-current" />
      <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-current" />
    </span>
  );
}
