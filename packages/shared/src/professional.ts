import { z } from "zod";

export const createProfessionalSchema = z.object({
  name: z.string().min(1),
  specialty: z.string().min(1),
});

export const updateProfessionalSchema = createProfessionalSchema.partial();

export type CreateProfessionalInput = z.infer<typeof createProfessionalSchema>;
export type UpdateProfessionalInput = z.infer<typeof updateProfessionalSchema>;
