import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { errorHandler } from "./lib/errors";
import { clientRoutes } from "./modules/clients/routes";
import { professionalRoutes } from "./modules/professionals/routes";
import { serviceRoutes } from "./modules/services/routes";
import { appointmentRoutes } from "./modules/appointments/routes";

export async function buildApp() {
  const app = Fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(errorHandler);

  app.get("/", async () => {
    return "Hello from API";
  });

  await app.register(clientRoutes);
  await app.register(professionalRoutes);
  await app.register(serviceRoutes);
  await app.register(appointmentRoutes);

  return app;
}
