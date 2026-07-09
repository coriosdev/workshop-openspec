import type { AppointmentStatus } from "@workshop/shared";
import { useAppointments } from "./appointment.hooks";

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 1) {
    return "Tomorrow";
  }

  if (diffDays === -1) {
    return "Yesterday";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function statusLabel(status: AppointmentStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function AppointmentList() {
  const { data: appointments, isLoading, error } = useAppointments();

  if (isLoading) {
    return <p className="appointments-loading">Loading appointments…</p>;
  }

  if (error) {
    return (
      <p className="appointments-error">
        {error instanceof Error ? error.message : "Failed to load appointments"}
      </p>
    );
  }

  if (!appointments?.length) {
    return <p className="appointments-empty">No appointments yet.</p>;
  }

  return (
    <ul className="appointment-list">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="appointment-item">
          <div className="appointment-item__title">
            {appointment.client.name} · {appointment.professional.name} ·{" "}
            {appointment.service.name}
          </div>
          <div className="appointment-item__meta">
            <span>{formatRelativeDate(appointment.startsAt)}</span>
            <span className={`badge badge--${appointment.status}`}>
              {statusLabel(appointment.status)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
