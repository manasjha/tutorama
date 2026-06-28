import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export default function AdminClassesPage() {
  return (
    <PageShell
      title="Classes"
      description="Founder view for class requests, scheduling, tutor assignment, and completion status."
    >
      <EmptyState
        description="Class records will appear once the scheduling flow is implemented."
        title="No class records yet"
      />
    </PageShell>
  );
}
