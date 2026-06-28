import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export default function AdminPaymentsPage() {
  return (
    <PageShell
      title="Payments"
      description="Founder view for payment records and statuses before gateway integration."
    >
      <EmptyState
        description="Payment rows will appear when the future payment flow creates real payment records."
        title="No payment records yet"
      />
    </PageShell>
  );
}
