import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createAppointmentSchema } from "@workshop/shared";
import { appointmentService } from "./service";

const idParamsSchema = z.object({
  id: z.string().min(1),
});

export async function appointmentRoutes(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>();

  routes.get("/appointments", async () => {
    return appointmentService.list();
  });

  routes.get(
    "/appointments/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request) => {
      return appointmentService.getById(request.params.id);
    },
  );

  routes.post(
    "/appointments",
    {
      schema: {
        body: createAppointmentSchema,
      },
    },
    async (request, reply) => {
      const appointment = await appointmentService.create(request.body);
      return reply.status(201).send(appointment);
    },
  );
}
