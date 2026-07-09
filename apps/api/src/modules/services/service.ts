import { ERROR_CODES } from "@workshop/shared";
import { AppError } from "../../lib/errors";
import type { CreateServiceInput, UpdateServiceInput } from "@workshop/shared";
import { serviceRepository } from "./repository";

export const serviceService = {
  async list() {
    return serviceRepository.findAll();
  },

  async getById(id: string) {
    const service = await serviceRepository.findById(id);
    if (!service) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Service not found");
    }
    return service;
  },

  async create(data: CreateServiceInput) {
    return serviceRepository.create(data);
  },

  async update(id: string, data: UpdateServiceInput) {
    await this.getById(id);
    return serviceRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);

    const appointmentCount = await serviceRepository.countAppointments(id);
    if (appointmentCount > 0) {
      throw new AppError(
        409,
        ERROR_CODES.HAS_APPOINTMENTS,
        "Service has appointments",
      );
    }

    await serviceRepository.delete(id);
  },
};
