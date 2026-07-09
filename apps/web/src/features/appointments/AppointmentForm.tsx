import { useState } from "react";
import { createAppointmentSchema } from "@workshop/shared";
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
    <form className="appointment-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="clientId">Client</label>
        <select
          id="clientId"
          value={form.clientId}
          disabled={catalogsLoading}
          onChange={(event) => handleChange("clientId", event.target.value)}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {fieldErrors.clientId && (
          <span className="field-error">{fieldErrors.clientId}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="professionalId">Professional</label>
        <select
          id="professionalId"
          value={form.professionalId}
          disabled={catalogsLoading}
          onChange={(event) =>
            handleChange("professionalId", event.target.value)
          }
        >
          <option value="">Select a professional</option>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id}>
              {professional.name}
            </option>
          ))}
        </select>
        {fieldErrors.professionalId && (
          <span className="field-error">{fieldErrors.professionalId}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="serviceId">Service</label>
        <select
          id="serviceId"
          value={form.serviceId}
          disabled={catalogsLoading}
          onChange={(event) => handleChange("serviceId", event.target.value)}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {fieldErrors.serviceId && (
          <span className="field-error">{fieldErrors.serviceId}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={(event) => handleChange("date", event.target.value)}
        />
        {fieldErrors.date && (
          <span className="field-error">{fieldErrors.date}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="time">Time</label>
        <input
          id="time"
          type="time"
          value={form.time}
          onChange={(event) => handleChange("time", event.target.value)}
        />
        {fieldErrors.time && (
          <span className="field-error">{fieldErrors.time}</span>
        )}
      </div>

      {apiError && <p className="form-api-error">{apiError}</p>}

      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? "Creating…" : "Create appointment"}
      </button>
    </form>
  );
}
