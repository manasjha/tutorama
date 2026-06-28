import Image from "next/image";

import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { TrackedDetails } from "@/components/analytics/TrackedDetails";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/Card";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

const loginHref = "/login";

const serviceBadges = [
  "Live in HSR, Bengaluru",
  "Classes 6-10",
  "First class ₹199",
  "₹399 per 50-minute class",
];

const workSteps = [
  {
    title: "Tell us what your child needs",
    body: "Share the class, subject, topics, and the kind of learning support that would help at home.",
  },
  {
    title: "We help pair the right tutor",
    body: "Tutorama looks at subject fit, topic needs, learning style, and continuity before pairing.",
  },
  {
    title: "Classes happen offline at home",
    body: "The relationship stays structured, local, and supported by the Tutorama team.",
  },
];

const subjects = [
  "Maths",
  "Science",
  "SST",
  "Debate & Communication Skills",
];

const qualityChecks = [
  "Subject knowledge check",
  "Problem-solving check",
  "Concept-map building check",
  "Fit review before pairing",
];

const expectations = [
  "Tutor pairing support",
  "Continuity with flexibility",
  "Structured learning support",
  "Parent support by phone/WhatsApp",
  "Replacement support if fit is not right",
];

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
      "You will land in the Tutorama dashboard. The full student onboarding and booking journey will be handled in a future release.",
  },
  {
    question: "What if the tutor fit is not right?",
    answer:
      "Tell the Tutorama team. We support parents with fit review and replacement support while aiming for continuity where the tutor relationship is working.",
  },
  {
    question: "How can I contact Tutorama?",
    answer:
      "Phone/WhatsApp: +91 9650120598. Email: info@tutorama.in.",
  },
];

export default async function Home() {
  await trackEvent({
    eventName: analyticsEvents.landingPageViewed,
    pagePath: "/",
  });

  return (
    <PublicLayout>
      <div className="grid gap-16 sm:gap-20">
        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="grid gap-6">
            <div className="flex flex-wrap gap-2">
              {serviceBadges.map((badge) => (
                <span
                  className="rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-semibold text-text-primary shadow-sm"
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="grid gap-4">
              <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight text-text-primary sm:text-5xl">
                Offline home tutoring in HSR, managed end-to-end for your child.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
                Tutorama helps parents find the right tutor fit for Classes
                6-10 across Maths, Science, SST, and Debate & Communication
                Skills, with tutor pairing, class continuity, and support
                managed by us.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-trust-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90"
                eventName={analyticsEvents.landingPrimaryCtaClicked}
                href={loginHref}
                properties={{ placement: "hero_primary" }}
              >
                Sign Up & Book Tuitions
              </TrackedLink>
              <TrackedLink
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-trust-blue bg-white px-5 py-3 text-sm font-semibold text-trust-blue transition hover:bg-trust-blue/5"
                eventName={analyticsEvents.landingLoginClicked}
                href={loginHref}
                properties={{ placement: "hero_secondary" }}
              >
                Log In
              </TrackedLink>
            </div>
            <p className="text-sm leading-6 text-text-muted">
              Offline home tutoring only. No tutor marketplace browsing, no
              online classes, and no booking flow in this release.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border-soft bg-white shadow-sm">
            <Image
              alt="A parent watching as a home tutor helps a child study at a table"
              className="h-full min-h-72 w-full object-cover"
              height={1100}
              priority
              src="/tutorama-home-tutoring.png"
              width={1800}
            />
          </div>
        </section>

        <section id="how-it-works" className="grid scroll-mt-24 gap-6">
          <SectionHeading
            eyebrow="How Tutorama Works"
            title="A managed path from parent need to tutor continuity."
            body="Tutorama keeps the process simple for parents while preserving the human fit that home tutoring depends on."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {workSteps.map((step, index) => (
              <Card className="rounded-lg" key={step.title}>
                <p className="text-sm font-semibold text-progress-green">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {step.body}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section id="subjects" className="grid scroll-mt-24 gap-6">
          <SectionHeading
            eyebrow="Classes and Subjects"
            title="Focused support for Classes 6-10."
            body="Tutorama is starting with the subjects parents most often need structured offline help with at home."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject) => (
              <Card className="rounded-lg p-5" key={subject}>
                <h3 className="font-heading text-lg font-semibold text-text-primary">
                  {subject}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Offline home tutoring in HSR for Classes 6-10.
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Tutor Pairing Philosophy"
            title="No profile browsing guesswork for parents."
            body="Tutorama understands the child's class, subject, topic needs, learning style, and continuity needs before helping pair the right tutor."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Continuity supports relationship-building and confidence.",
              "Topic-level excellence matters when a child is stuck on a concept.",
              "Concept clarity and problem-solving ability are reviewed before pairing.",
              "Debate & Communication Skills support is considered where relevant.",
              "Replacement support is available if the tutor fit is not right.",
              "The goal is managed pairing plus continuity, not constant switching.",
            ].map((item) => (
              <Card className="rounded-lg p-5" key={item}>
                <p className="text-sm leading-6 text-text-primary">{item}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6">
          <SectionHeading
            eyebrow="Tutor Quality Process"
            title="A practical review before pairing."
            body="We focus on the checks that matter for subject fit, explanation quality, and topic readiness."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {qualityChecks.map((check) => (
              <Card className="rounded-lg p-5" key={check}>
                <p className="text-sm font-semibold text-text-primary">{check}</p>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="grid scroll-mt-24 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
        >
          <SectionViewTracker
            eventName={analyticsEvents.landingPricingViewed}
            properties={{ section: "pricing" }}
          />
          <SectionHeading
            eyebrow="Pricing"
            title="Simple per-class pricing for HSR families."
            body="No subscriptions, coupons, packages, or payment collection are part of PRD 1."
          />
          <Card className="rounded-lg">
            <div className="grid gap-5">
              <div>
                <p className="text-sm font-semibold text-text-muted">
                  First class
                </p>
                <p className="mt-1 font-heading text-4xl font-semibold text-text-primary">
                  ₹199
                </p>
              </div>
              <div className="border-t border-border-soft pt-5">
                <p className="text-sm font-semibold text-text-muted">
                  Regular classes
                </p>
                <p className="mt-1 font-heading text-3xl font-semibold text-text-primary">
                  ₹399
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  per 50-minute class
                </p>
              </div>
              <p className="rounded-lg bg-background p-4 text-sm leading-6 text-text-primary">
                Offline home tutoring in HSR, Bengaluru.
              </p>
              <TrackedLink
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-trust-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90"
                eventName={analyticsEvents.landingSectionCtaClicked}
                href={loginHref}
                properties={{ placement: "pricing" }}
              >
                Sign Up & Book Tuitions
              </TrackedLink>
            </div>
          </Card>
        </section>

        <section className="grid gap-6">
          <SectionHeading
            eyebrow="What Parents Can Expect"
            title="Warm support without unsupported promises."
            body="Tutorama is built around parent confidence, class continuity, and thoughtful tutor fit."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {expectations.map((item) => (
              <Card className="rounded-lg p-5" key={item}>
                <p className="text-sm font-semibold leading-6 text-text-primary">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="grid scroll-mt-24 gap-6">
          <SectionHeading
            eyebrow="FAQ"
            title="Clear answers for parents."
            body="For anything else, contact Tutorama by phone, WhatsApp, or email."
          />
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <TrackedDetails
                className="rounded-lg border border-border-soft bg-white p-5 shadow-sm"
                key={faq.question}
                question={faq.question}
              >
                <summary className="cursor-pointer font-heading text-base font-semibold text-text-primary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-text-muted">
                  {faq.answer}
                </p>
              </TrackedDetails>
            ))}
          </div>
        </section>

        <footer className="grid gap-5 border-t border-border-soft pt-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="font-heading text-xl font-semibold text-trust-blue">
              Tutorama
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-text-muted">
              Managed offline home tutoring for Classes 6-10 families in HSR,
              Bengaluru.
            </p>
            <p className="mt-3 text-sm font-semibold text-text-primary">
              Live in HSR, Bengaluru
            </p>
          </div>
          <div className="grid gap-2 text-sm text-text-muted">
            <a className="hover:text-trust-blue" href="tel:+919650120598">
              Phone/WhatsApp: +91 9650120598
            </a>
            <a className="hover:text-trust-blue" href="mailto:info@tutorama.in">
              Email: info@tutorama.in
            </a>
            <TrackedLink
              className="font-semibold text-trust-blue hover:text-trust-blue/80"
              eventName={analyticsEvents.landingLoginClicked}
              href={loginHref}
              properties={{ placement: "footer" }}
            >
              Log In
            </TrackedLink>
          </div>
        </footer>
      </div>
    </PublicLayout>
  );
}

function SectionHeading({
  body,
  eyebrow,
  title,
}: {
  body: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase text-progress-green">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-heading text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base sm:leading-7">
        {body}
      </p>
    </div>
  );
}
