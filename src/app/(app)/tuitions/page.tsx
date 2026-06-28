import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getTuitionsForParent } from "@/features/tuitions/tuition-service";
import { appRoutes } from "@/lib/constants/routes";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TuitionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const tuitions = user ? await getTuitionsForParent(user.id) : [];

  return (
    <PageShell
      title="Tuitions"
      description="Tuitions are subject-level managed learning relationships for a student, such as Maths or Science."
    >
      {tuitions.length === 0 ? (
        <EmptyState
          actionHref={appRoutes.scheduleClass}
          actionLabel="Schedule a Class"
          description="Schedule the first class and Tutorama will later create or reuse the relevant tuition behind the scenes."
          title="No tuitions yet"
        />
      ) : (
        <div className="grid gap-4">
          {tuitions.map((tuition) => (
            <Link href={`/tuitions/${tuition.id}`} key={tuition.id}>
              <Card className="transition hover:border-trust-blue/40">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-text-primary">
                      {tuition.subject} Tuition
                    </h2>
                    <p className="mt-1 text-sm text-text-muted">
                      {tuition.grade_snapshot} in {tuition.service_area}
                    </p>
                  </div>
                  <StatusBadge status={tuition.status} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}
