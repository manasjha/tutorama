import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getClassForParent } from "@/features/classes/class-service";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ClassDetailPageProps = {
  params: Promise<{ classId: string }>;
};

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { classId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const classSession = user ? await getClassForParent(user.id, classId) : null;

  await trackEvent({
    eventName: analyticsEvents.classDetailViewed,
    pagePath: `/classes/${classId}`,
    userId: user?.id,
  });

  if (!classSession) {
    return (
      <PageShell title="Class not found">
        <ErrorState message="This class could not be found for your account." />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={`${classSession.subject_snapshot} Class`}
      description="Class details preserve the subject and grade snapshot from scheduling."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Session details
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-text-muted">
            <p>Topic: {classSession.topic_text ?? "To be confirmed"}</p>
            <p>Time: {classSession.scheduled_start_at ?? "To be confirmed"}</p>
            <p>Tutor: {classSession.tutor_id ? "Assigned" : "Pending"}</p>
          </div>
        </Card>
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Status
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge status={classSession.status} />
            <StatusBadge status={classSession.payment_status} />
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
