import { ERROR_CODES } from "@workshop/shared";
import type { CreateAppointmentInput } from "@workshop/shared";
import { AppError } from "../../lib/errors";
import { clientRepository } from "../clients/repository";
import { professionalRepository } from "../professionals/repository";
import { serviceRepository } from "../services/repository";
import { appointmentRepository } from "./repository";

export const appointmentService = {
  async list() {
    return appointmentRepository.findAll();
  },

  async getById(id: string) {
    const appointment = await appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Appointment not found");
    }
    return appointment;
  },

  async create(input: CreateAppointmentInput) {
    const startsAt = new Date(input.startsAt);

    if (Number.isNaN(startsAt.getTime())) {
      throw new AppError(400, ERROR_CODES.INVALID_BODY, "Invalid startsAt");
    }

    if (startsAt <= new Date()) {
      throw new AppError(
        400,
        ERROR_CODES.STARTS_AT_MUST_BE_FUTURE,
        "startsAt must be in the future",
      );
    }

    const client = await clientRepository.findById(input.clientId);
    if (!client) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Client not found");
    }

    const professional = await professionalRepository.findById(
      input.professionalId,
    );
    if (!professional) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Professional not found");
    }

    const service = await serviceRepository.findById(input.serviceId);
    if (!service) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Service not found");
    }

    return appointmentRepository.create({
      clientId: input.clientId,
      professionalId: input.professionalId,
      serviceId: input.serviceId,
      startsAt,
    });
  },
};
