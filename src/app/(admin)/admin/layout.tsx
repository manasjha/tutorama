import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { PageShell } from "@/components/layout/PageShell";
import { ErrorState } from "@/components/ui/ErrorState";
import { isAdminUser } from "@/features/admin/admin-service";
import { publicRoutes } from "@/lib/constants/routes";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type AdminRouteLayoutProps = {
  children: ReactNode;
};

export const dynamic = "force-dynamic";

export default async function AdminRouteLayout({
  children,
}: AdminRouteLayoutProps) {
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

  const isAdmin = await isAdminUser(user.id);

  if (!isAdmin) {
    return (
      <AdminLayout userEmail={user.email}>
        <PageShell
          title="Unauthorized"
          description="Founder admin tools are restricted to Tutorama admin accounts."
        >
          <ErrorState
            title="Admin access required"
            message="Your account is logged in, but it is not marked as an admin profile."
          />
        </PageShell>
      </AdminLayout>
    );
  }

  return <AdminLayout userEmail={user.email}>{children}</AdminLayout>;
}
