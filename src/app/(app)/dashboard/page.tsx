import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getFirstStudentProfile } from "@/features/students/student-service";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { appRoutes } from "@/lib/constants/routes";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const student = user ? await getFirstStudentProfile(user.id) : null;

  await trackEvent({
    eventName: analyticsEvents.dashboardViewed,
    pagePath: appRoutes.dashboard,
    userId: user?.id,
  });

  if (!student) {
    return (
      <PageShell title="Welcome to Tutorama">
        <EmptyState
          actionHref={appRoutes.profile}
          actionLabel="Set Up Student Profile"
          description="Set up your child's profile to schedule the first class."
          title="No student profile yet"
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`${student.student_name}'s Tutorama`}
      description="Classes, notes, and progress updates managed in one place."
      actions={
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-trust-blue px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-trust-blue/90"
          href={appRoutes.scheduleClass}
        >
          Schedule a Class
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Student
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            {student.grade} in {student.service_area}
          </p>
        </Card>
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Tuitions
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Subject-level learning relationships will appear here.
          </p>
        </Card>
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Classes
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Upcoming and completed class summaries will appear here.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
