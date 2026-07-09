export const WORKSHOP_NAME = "appointment-booking";

export { ERROR_CODES, type ErrorCode } from "./error-codes";
export { AppointmentStatus } from "./appointment-status";
export {
  createClientSchema,
  updateClientSchema,
  type CreateClientInput,
  type UpdateClientInput,
} from "./client";
export {
  createProfessionalSchema,
  updateProfessionalSchema,
  type CreateProfessionalInput,
  type UpdateProfessionalInput,
} from "./professional";
export {
  createServiceSchema,
  updateServiceSchema,
  type CreateServiceInput,
  type UpdateServiceInput,
} from "./service";
export {
  createAppointmentSchema,
  updateAppointmentSchema,
  type CreateAppointmentInput,
  type UpdateAppointmentInput,
} from "./appointment";
