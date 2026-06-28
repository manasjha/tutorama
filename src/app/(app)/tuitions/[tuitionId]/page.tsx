import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTuitionForParent } from "@/features/tuitions/tuition-service";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type TuitionDetailPageProps = {
  params: Promise<{ tuitionId: string }>;
};

export default async function TuitionDetailPage({
  params,
}: TuitionDetailPageProps) {
  const { tuitionId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const tuition = user ? await getTuitionForParent(user.id, tuitionId) : null;

  await trackEvent({
    eventName: analyticsEvents.tuitionDetailViewed,
    pagePath: `/tuitions/${tuitionId}`,
    userId: user?.id,
  });

  if (!tuition) {
    return (
      <PageShell title="Tuition not found">
        <ErrorState message="This tuition could not be found for your account." />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`${tuition.subject} Tuition`}
      description="Subject-level continuity for tutor assignment, classes, progress, and payment status."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Tuition structure
          </h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Subject</dt>
              <dd className="font-medium text-text-primary">{tuition.subject}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Grade</dt>
              <dd className="font-medium text-text-primary">
                {tuition.grade_snapshot}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Status</dt>
              <dd>
                <StatusBadge status={tuition.status} />
              </dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Future sections
          </h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Upcoming classes, completed classes, tutor assignment, progress
            summary, and payment status will be added in later PRDs.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
