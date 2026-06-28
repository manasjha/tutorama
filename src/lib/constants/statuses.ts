export const tuitionStatuses = [
  "setup_pending",
  "tutor_matching",
  "active",
  "paused",
  "completed",
  "cancelled",
] as const;

export const classStatuses = [
  "booking_initiated",
  "details_submitted",
  "payment_initiated",
  "payment_completed",
  "tutor_assignment_pending",
  "tutor_assigned",
  "class_scheduled",
  "class_in_progress",
  "class_completed",
  "class_rescheduled",
  "class_cancelled",
] as const;

export const paymentStatuses = [
  "not_started",
  "initiated",
  "completed",
  "failed",
  "refunded",
] as const;

export const tutorStatuses = [
  "active",
  "inactive",
  "pending_review",
] as const;

export type TuitionStatus = (typeof tuitionStatuses)[number];
export type ClassStatus = (typeof classStatuses)[number];
export type PaymentStatus = (typeof paymentStatuses)[number];
export type TutorStatus = (typeof tutorStatuses)[number];

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export const statusToneByValue: Record<string, StatusTone> = {
  active: "success",
  completed: "success",
  class_completed: "success",
  payment_completed: "success",
  tutor_assigned: "success",
  initiated: "info",
  payment_initiated: "info",
  class_scheduled: "info",
  class_in_progress: "info",
  setup_pending: "warning",
  tutor_matching: "warning",
  pending_review: "warning",
  booking_initiated: "warning",
  details_submitted: "warning",
  tutor_assignment_pending: "warning",
  not_started: "neutral",
  paused: "neutral",
  inactive: "neutral",
  failed: "danger",
  refunded: "danger",
  cancelled: "danger",
  class_cancelled: "danger",
};

export function formatStatusLabel(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
