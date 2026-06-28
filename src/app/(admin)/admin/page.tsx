import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { analyticsEvents } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await trackEvent({
    eventName: analyticsEvents.adminDashboardViewed,
    pagePath: "/admin",
  });

  return (
    <PageShell
      title="Admin Overview"
      description="Founder-only operational foundation for Tutorama."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Students
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Student operations will appear here.
          </p>
        </Card>
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Classes
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Scheduling and class status views will appear here.
          </p>
        </Card>
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Payments
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Payment tracking foundation is ready for a later gateway PRD.
          </p>
        </Card>
      </div>
      <EmptyState
        description="Operational lists will be added as student onboarding, scheduling, tutor assignment, and payments are implemented."
        title="Admin tools are ready for future workflows"
      />
    </PageShell>
  );
}
