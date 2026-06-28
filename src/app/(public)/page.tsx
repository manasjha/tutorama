import Link from "next/link";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/Card";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { launchAreaLabel } from "@/lib/constants/serviceArea";

export default async function Home() {
  await trackEvent({
    eventName: analyticsEvents.landingPageViewed,
    pagePath: "/",
  });

  return (
    <PublicLayout>
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="grid gap-6">
          <p className="text-sm font-semibold uppercase text-progress-green">
            Starting in {launchAreaLabel}
          </p>
          <div className="grid gap-4">
            <h1 className="font-heading text-4xl font-semibold leading-tight text-text-primary sm:text-5xl">
              Tutorama
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-muted">
              Managed tutoring for families who want structure, continuity, and
              clear class support without searching through a tutor marketplace.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-trust-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90"
              href="/login?mode=signup"
            >
              Create Your Tutorama Account
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-trust-blue bg-white px-4 py-2 text-sm font-semibold text-trust-blue transition hover:bg-trust-blue/5"
              href="/login"
            >
              Log In
            </Link>
          </div>
        </div>

        <Card className="grid gap-5">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text-primary">
              Parent account, student-first experience
            </h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              The foundation is built around a parent account, student profile,
              subject-level tuition, and individual classes.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-text-primary">
            <div className="rounded-xl border border-border-soft bg-background p-4">
              Parent account
            </div>
            <div className="rounded-xl border border-border-soft bg-background p-4">
              Student profile
            </div>
            <div className="rounded-xl border border-border-soft bg-background p-4">
              Tuition
            </div>
            <div className="rounded-xl border border-border-soft bg-background p-4">
              Class
            </div>
          </div>
        </Card>
      </section>
    </PublicLayout>
  );
}
