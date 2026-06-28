export const analyticsEvents = {
  landingPageViewed: "landing_page_viewed",
  loginPageViewed: "login_page_viewed",
  signupStarted: "signup_started",
  signupCompleted: "signup_completed",
  loginCompleted: "login_completed",
  logoutClicked: "logout_clicked",
  dashboardViewed: "dashboard_viewed",
  studentProfileSetupStarted: "student_profile_setup_started",
  studentProfileCreated: "student_profile_created",
  classScheduleStarted: "class_schedule_started",
  classScheduleDetailsSubmitted: "class_schedule_details_submitted",
  paymentInitiated: "payment_initiated",
  paymentCompleted: "payment_completed",
  paymentFailed: "payment_failed",
  classDetailViewed: "class_detail_viewed",
  tuitionDetailViewed: "tuition_detail_viewed",
  adminDashboardViewed: "admin_dashboard_viewed",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];
