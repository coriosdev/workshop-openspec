import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createServiceSchema, updateServiceSchema } from "@workshop/shared";
import { serviceService } from "./service";

const idParamsSchema = z.object({
  id: z.string().min(1),
});

export async function serviceRoutes(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>();

  routes.get("/services", async () => {
    return serviceService.list();
  });

  routes.get(
    "/services/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request) => {
      return serviceService.getById(request.params.id);
    },
  );

  routes.post(
    "/services",
    {
      schema: {
        body: createServiceSchema,
      },
    },
    async (request, reply) => {
      const service = await serviceService.create(request.body);
      return reply.status(201).send(service);
    },
  );

  routes.patch(
    "/services/:id",
    {
      schema: {
        params: idParamsSchema,
        body: updateServiceSchema,
      },
    },
    async (request) => {
      return serviceService.update(request.params.id, request.body);
    },
  );

  routes.delete(
    "/services/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request, reply) => {
      await serviceService.delete(request.params.id);
      return reply.status(204).send();
    },
  );
}
