export const AppointmentStatus = {
  scheduled: "scheduled",
  cancelled: "cancelled",
  completed: "completed",
} as const;

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];
