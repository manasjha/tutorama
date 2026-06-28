import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export default function AdminStudentsPage() {
  return (
    <PageShell
      title="Students"
      description="Founder view for student profiles and parent relationships."
    >
      <EmptyState
        description="Student records will appear here after onboarding is implemented."
        title="No student records yet"
      />
    </PageShell>
  );
}
