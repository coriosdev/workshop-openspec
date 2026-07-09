import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { createClientSchema, updateClientSchema } from "@workshop/shared";
import { clientService } from "./service";

const idParamsSchema = z.object({
  id: z.string().min(1),
});

export async function clientRoutes(app: FastifyInstance) {
  const routes = app.withTypeProvider<ZodTypeProvider>();

  routes.get("/clients", async () => {
    return clientService.list();
  });

  routes.get(
    "/clients/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request) => {
      return clientService.getById(request.params.id);
    },
  );

  routes.post(
    "/clients",
    {
      schema: {
        body: createClientSchema,
      },
    },
    async (request, reply) => {
      const client = await clientService.create(request.body);
      return reply.status(201).send(client);
    },
  );

  routes.patch(
    "/clients/:id",
    {
      schema: {
        params: idParamsSchema,
        body: updateClientSchema,
      },
    },
    async (request) => {
      return clientService.update(request.params.id, request.body);
    },
  );

  routes.delete(
    "/clients/:id",
    {
      schema: {
        params: idParamsSchema,
      },
    },
    async (request, reply) => {
      await clientService.delete(request.params.id);
      return reply.status(204).send();
    },
  );
}
