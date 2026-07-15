export const publicRoutes = {
  home: "/",
  login: "/login",
};

export const appRoutes = {
  dashboard: "/dashboard",
  onboarding: "/onboarding",
  profile: "/profile",
  tuitions: "/tuitions",
  classes: "/classes",
  scheduleClass: "/classes/schedule",
};

export const adminRoutes = {
  dashboard: "/admin",
  students: "/admin/students",
  tuitions: "/admin/tuitions",
  classes: "/admin/classes",
  tutors: "/admin/tutors",
  payments: "/admin/payments",
};

export const protectedRoutePrefixes = [
  "/dashboard",
  "/onboarding",
  "/profile",
  "/tuitions",
  "/classes",
  "/admin",
];
