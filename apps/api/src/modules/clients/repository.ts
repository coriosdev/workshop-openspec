import { prisma } from "../../lib/prisma";
import type { CreateClientInput, UpdateClientInput } from "@workshop/shared";

export const clientRepository = {
  findAll() {
    return prisma.client.findMany({ orderBy: { name: "asc" } });
  },

  findById(id: string) {
    return prisma.client.findUnique({ where: { id } });
  },

  create(data: CreateClientInput) {
    return prisma.client.create({ data });
  },

  update(id: string, data: UpdateClientInput) {
    return prisma.client.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.client.delete({ where: { id } });
  },

  countAppointments(id: string) {
    return prisma.appointment.count({ where: { clientId: id } });
  },
};
