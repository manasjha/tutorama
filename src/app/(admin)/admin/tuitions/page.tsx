import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export default function AdminTuitionsPage() {
  return (
    <PageShell
      title="Tuitions"
      description="Founder view for subject-level managed learning relationships."
    >
      <EmptyState
        description="Tuition records will appear after classes begin creating or reusing subject relationships."
        title="No tuition records yet"
      />
    </PageShell>
  );
}
