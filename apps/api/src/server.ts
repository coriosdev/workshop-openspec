import { WORKSHOP_NAME } from "@workshop/shared";
import { buildApp } from "./app";

const PORT = 3000;

const start = async () => {
  const app = await buildApp();

  console.log(`Starting ${WORKSHOP_NAME} API on port ${PORT}`);
  await app.listen({ port: PORT, host: "0.0.0.0" });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
