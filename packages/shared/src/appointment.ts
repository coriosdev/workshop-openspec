import { z } from "zod";

export const createAppointmentSchema = z.object({
  clientId: z.string().min(1),
  professionalId: z.string().min(1),
  serviceId: z.string().min(1),
  startsAt: z.string().datetime(),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
