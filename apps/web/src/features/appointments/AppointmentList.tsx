import type { AppointmentStatus } from "@workshop/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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

function statusBadgeVariant(
  status: AppointmentStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "scheduled":
      return "secondary";
    case "completed":
      return "outline";
    case "cancelled":
      return "destructive";
  }
}

function statusBadgeClassName(status: AppointmentStatus): string {
  if (status === "completed") {
    return "border-green-200 bg-green-50 text-green-700";
  }
  return "";
}

export function AppointmentList() {
  const { data: appointments, isLoading, error } = useAppointments();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading appointments…</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        {error instanceof Error ? error.message : "Failed to load appointments"}
      </p>
    );
  }

  if (!appointments?.length) {
    return <p className="text-muted-foreground">No appointments yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {appointments.map((appointment) => (
        <li key={appointment.id}>
          <Card>
            <CardContent className="p-4">
              <div className="font-medium">
                {appointment.client.name} · {appointment.professional.name} ·{" "}
                {appointment.service.name}
              </div>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{formatRelativeDate(appointment.startsAt)}</span>
                <Badge
                  variant={statusBadgeVariant(appointment.status)}
                  className={cn(statusBadgeClassName(appointment.status))}
                >
                  {statusLabel(appointment.status)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
