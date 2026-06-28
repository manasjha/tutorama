import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export default function AdminTutorsPage() {
  return (
    <PageShell
      title="Tutors"
      description="Founder-managed tutor records. Tutor login is intentionally out of scope."
    >
      <EmptyState
        description="Tutor records can be added in a later admin workflow without creating tutor self-service login."
        title="No tutor records yet"
      />
    </PageShell>
  );
}
