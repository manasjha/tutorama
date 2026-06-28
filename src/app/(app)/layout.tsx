import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";
import { getFirstStudentProfile } from "@/features/students/student-service";
import { publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type LoggedInLayoutProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";

export default async function LoggedInLayout({ children }: LoggedInLayoutProps) {
  if (!isSupabaseConfigured()) {
    redirect(`${publicRoutes.login}?error=supabase_not_configured`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(publicRoutes.login);
  }

  const student = await getFirstStudentProfile(user.id);

  return (
    <AppLayout studentName={student?.student_name} userEmail={user.email}>
      {children}
    </AppLayout>
  );
}
