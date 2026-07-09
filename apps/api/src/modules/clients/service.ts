import { ERROR_CODES } from "@workshop/shared";
import { AppError } from "../../lib/errors";
import type { CreateClientInput, UpdateClientInput } from "@workshop/shared";
import { clientRepository } from "./repository";

export const clientService = {
  async list() {
    return clientRepository.findAll();
  },

  async getById(id: string) {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new AppError(404, ERROR_CODES.NOT_FOUND, "Client not found");
    }
    return client;
  },

  async create(data: CreateClientInput) {
    return clientRepository.create(data);
  },

  async update(id: string, data: UpdateClientInput) {
    await this.getById(id);
    return clientRepository.update(id, data);
  },

  async delete(id: string) {
    await this.getById(id);

    const appointmentCount = await clientRepository.countAppointments(id);
    if (appointmentCount > 0) {
      throw new AppError(
        409,
        ERROR_CODES.HAS_APPOINTMENTS,
        "Client has appointments",
      );
    }

    await clientRepository.delete(id);
  },
};
