import { AppointmentStatus as PrismaAppointmentStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";

const appointmentInclude = {
  client: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },
  professional: {
    select: {
      id: true,
      name: true,
      specialty: true,
    },
  },
  service: {
    select: {
      id: true,
      name: true,
      durationMinutes: true,
      price: true,
    },
  },
} as const;

export const appointmentRepository = {
  findAll() {
    return prisma.appointment.findMany({
      include: appointmentInclude,
      orderBy: { startsAt: "asc" },
    });
  },

  findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: appointmentInclude,
    });
  },

  create(data: {
    clientId: string;
    professionalId: string;
    serviceId: string;
    startsAt: Date;
  }) {
    return prisma.appointment.create({
      data: {
        clientId: data.clientId,
        professionalId: data.professionalId,
        serviceId: data.serviceId,
        startsAt: data.startsAt,
        status: PrismaAppointmentStatus.scheduled,
      },
      include: appointmentInclude,
    });
  },
};

export { appointmentInclude };
