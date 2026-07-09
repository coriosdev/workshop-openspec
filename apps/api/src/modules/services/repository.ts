import { prisma } from "../../lib/prisma";
import type { CreateServiceInput, UpdateServiceInput } from "@workshop/shared";

export const serviceRepository = {
  findAll() {
    return prisma.service.findMany({ orderBy: { name: "asc" } });
  },

  findById(id: string) {
    return prisma.service.findUnique({ where: { id } });
  },

  create(data: CreateServiceInput) {
    return prisma.service.create({ data });
  },

  update(id: string, data: UpdateServiceInput) {
    return prisma.service.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.service.delete({ where: { id } });
  },

  countAppointments(id: string) {
    return prisma.appointment.count({ where: { serviceId: id } });
  },
};
