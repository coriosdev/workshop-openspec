import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1),
  durationMinutes: z.number().int().positive(),
  price: z.number().int().nonnegative(),
});

export const updateServiceSchema = createServiceSchema.partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
