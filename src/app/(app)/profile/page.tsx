import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getFirstStudentProfile } from "@/features/students/student-service";
import { launchAreaLabel } from "@/lib/constants/serviceArea";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const student = user ? await getFirstStudentProfile(user.id) : null;

  return (
    <PageShell
      title="Profile"
      description="Parent account settings and student setup details."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Parent account
          </h2>
          <p className="mt-2 text-sm text-text-muted">{user?.email}</p>
        </Card>
        {student ? (
          <Card>
            <h2 className="font-heading text-lg font-semibold text-text-primary">
              Student profile
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {student.student_name}, {student.grade}, {launchAreaLabel}
            </p>
          </Card>
        ) : (
          <EmptyState
            description="Add your child's learning profile details to help Tutorama understand their class, subjects, and tutoring requirement."
            title="Student profile setup"
          />
        )}
      </div>
    </PageShell>
  );
}
