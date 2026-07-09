import { prisma } from "../../lib/prisma";
import type { CreateProfessionalInput, UpdateProfessionalInput } from "@workshop/shared";

export const professionalRepository = {
  findAll() {
    return prisma.professional.findMany({ orderBy: { name: "asc" } });
  },

  findById(id: string) {
    return prisma.professional.findUnique({ where: { id } });
  },

  create(data: CreateProfessionalInput) {
    return prisma.professional.create({ data });
  },

  update(id: string, data: UpdateProfessionalInput) {
    return prisma.professional.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.professional.delete({ where: { id } });
  },

  countAppointments(id: string) {
    return prisma.appointment.count({ where: { professionalId: id } });
  },
};
