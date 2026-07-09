import { useState } from "react";
import { createAppointmentSchema } from "@workshop/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "../../lib/api";
import {
  useClients,
  useCreateAppointment,
  useProfessionals,
  useServices,
} from "./appointment.hooks";

type FormState = {
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  time: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  clientId: "",
  professionalId: "",
  serviceId: "",
  date: "",
  time: "",
};

function combineDateTime(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString();
}

type AppointmentFormProps = {
  onSuccess: () => void;
};

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: professionals = [], isLoading: professionalsLoading } =
    useProfessionals();
  const { data: services = [], isLoading: servicesLoading } = useServices();
  const createMutation = useCreateAppointment();

  const catalogsLoading =
    clientsLoading || professionalsLoading || servicesLoading;

  function handleChange(field: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setFieldErrors((previous) => ({ ...previous, [field]: undefined }));
    setApiError(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setApiError(null);

    const nextFieldErrors: FieldErrors = {};
    if (!form.date) {
      nextFieldErrors.date = "Required";
    }
    if (!form.time) {
      nextFieldErrors.time = "Required";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    const payload = {
      clientId: form.clientId,
      professionalId: form.professionalId,
      serviceId: form.serviceId,
      startsAt: combineDateTime(form.date, form.time),
    };

    const result = createAppointmentSchema.safeParse(payload);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && key in emptyForm && !errors[key as keyof FormState]) {
          errors[key as keyof FormState] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    try {
      await createMutation.mutateAsync(result.data);
      setForm(emptyForm);
      setFieldErrors({});
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError("Something went wrong");
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New appointment</CardTitle>
        <CardDescription>
          Schedule a client with a professional and service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="clientId">Client</Label>
            <Select
              value={form.clientId || undefined}
              disabled={catalogsLoading}
              onValueChange={(value) => handleChange("clientId", value)}
            >
              <SelectTrigger id="clientId">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.clientId && (
              <span className="text-sm text-destructive">
                {fieldErrors.clientId}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="professionalId">Professional</Label>
            <Select
              value={form.professionalId || undefined}
              disabled={catalogsLoading}
              onValueChange={(value) => handleChange("professionalId", value)}
            >
              <SelectTrigger id="professionalId">
                <SelectValue placeholder="Select a professional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((professional) => (
                  <SelectItem key={professional.id} value={professional.id}>
                    {professional.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.professionalId && (
              <span className="text-sm text-destructive">
                {fieldErrors.professionalId}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="serviceId">Service</Label>
            <Select
              value={form.serviceId || undefined}
              disabled={catalogsLoading}
              onValueChange={(value) => handleChange("serviceId", value)}
            >
              <SelectTrigger id="serviceId">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.serviceId && (
              <span className="text-sm text-destructive">
                {fieldErrors.serviceId}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(event) => handleChange("date", event.target.value)}
            />
            {fieldErrors.date && (
              <span className="text-sm text-destructive">
                {fieldErrors.date}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={form.time}
              onChange={(event) => handleChange("time", event.target.value)}
            />
            {fieldErrors.time && (
              <span className="text-sm text-destructive">
                {fieldErrors.time}
              </span>
            )}
          </div>

          {apiError && (
            <p className="text-sm text-destructive">{apiError}</p>
          )}

          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating…" : "Create appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
