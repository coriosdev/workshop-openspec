import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createProfessionalSchema, updateProfessionalSchema } from "@workshop/shared";
import { professionalService } from "./service";

const idParamsSchema = z.object({
  id: z.string().min(1),
});

export async function professionalRoutes(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>();

  routes.get("/professionals", async () => {
    return professionalService.list();
  });

  routes.get(
    "/professionals/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request) => {
      return professionalService.getById(request.params.id);
    },
  );

  routes.post(
    "/professionals",
    {
      schema: {
        body: createProfessionalSchema,
      },
    },
    async (request, reply) => {
      const professional = await professionalService.create(request.body);
      return reply.status(201).send(professional);
    },
  );

  routes.patch(
    "/professionals/:id",
    {
      schema: {
        params: idParamsSchema,
        body: updateProfessionalSchema,
      },
    },
    async (request) => {
      return professionalService.update(request.params.id, request.body);
    },
  );

  routes.delete(
    "/professionals/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request, reply) => {
      await professionalService.delete(request.params.id);
      return reply.status(204).send();
    },
  );
}
