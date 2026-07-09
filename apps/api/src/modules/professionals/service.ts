import { ERROR_CODES } from "@workshop/shared";
import { AppError } from "../../lib/errors";
import type { CreateProfessionalInput, UpdateProfessionalInput } from "@workshop/shared";
import { professionalRepository } from "./repository";

export const professionalService = {
  async list() {
    return professionalRepository.findAll();
  },

  async getById(id: string) {
    const professional = await professionalRepository.findById(id);
    if (!professional) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Professional not found");
    }
    return professional;
  },

  async create(data: CreateProfessionalInput) {
    return professionalRepository.create(data);
  },

  async update(id: string, data: UpdateProfessionalInput) {
    await this.getById(id);
    return professionalRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);

    const appointmentCount = await professionalRepository.countAppointments(id);
    if (appointmentCount > 0) {
      throw new AppError(
        409,
        ERROR_CODES.HAS_APPOINTMENTS,
        "Professional has appointments",
      );
    }

    await professionalRepository.delete(id);
  },
};
