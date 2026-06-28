import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

export const dynamic = "force-dynamic";

export default async function ScheduleClassPage() {
  await trackEvent({
    eventName: analyticsEvents.classScheduleStarted,
    pagePath: "/classes/schedule",
  });

  return (
    <PageShell
      title="Schedule a Class"
      description="This placeholder keeps the route ready for the future scheduling flow."
    >
      <EmptyState
        description="The full flow will collect student, subject, topic, and timing details without making parents manually create a tuition."
        title="Class scheduling flow comes next"
      />
    </PageShell>
  );
}
