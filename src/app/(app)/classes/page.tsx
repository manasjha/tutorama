import { redirect } from "next/navigation";

import { appRoutes } from "@/lib/constants/routes";

export default function ClassesPage() {
  redirect(appRoutes.scheduleClass);
}
