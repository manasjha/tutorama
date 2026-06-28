export const publicRoutes = {
  home: "/",
  login: "/login",
};

export const appRoutes = {
  dashboard: "/dashboard",
  profile: "/profile",
  tuitions: "/tuitions",
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
  "/profile",
  "/tuitions",
  "/classes",
  "/admin",
];
