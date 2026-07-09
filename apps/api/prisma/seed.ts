import { AppointmentStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function atTime(date: Date, hours: number, minutes = 0): Date {
  const copy = new Date(date);
  copy.setHours(hours, minutes, 0, 0);
  return copy;
}

function nextMonday(from: Date): Date {
  const date = startOfDay(from);
  const day = date.getDay();
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  return addDays(date, daysUntilMonday);
}

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.professional.deleteMany();
  await prisma.client.deleteMany();

  const now = new Date();
  const tomorrow = addDays(startOfDay(now), 1);
  const yesterday = addDays(startOfDay(now), -1);
  const threeDaysAgo = addDays(startOfDay(now), -3);
  const monday = nextMonday(now);

  const [ana, luis, maria] = await Promise.all([
    prisma.client.create({
      data: { name: "Ana García", phone: "+34 600 111 001" },
    }),
    prisma.client.create({
      data: { name: "Luis Pérez", phone: "+34 600 111 002" },
    }),
    prisma.client.create({
      data: { name: "María López", phone: "+34 600 111 003" },
    }),
  ]);

  const [carlos, draVega] = await Promise.all([
    prisma.professional.create({
      data: { name: "Carlos", specialty: "Barbero" },
    }),
    prisma.professional.create({
      data: { name: "Dra. Vega", specialty: "General" },
    }),
  ]);

  const [corte, consulta, barba] = await Promise.all([
    prisma.service.create({
      data: { name: "Corte", durationMinutes: 30, price: 1500 },
    }),
    prisma.service.create({
      data: { name: "Consulta", durationMinutes: 45, price: 5000 },
    }),
    prisma.service.create({
      data: { name: "Barba", durationMinutes: 20, price: 1000 },
    }),
  ]);

  await prisma.appointment.createMany({
    data: [
      {
        clientId: ana.id,
        professionalId: carlos.id,
        serviceId: corte.id,
        startsAt: atTime(tomorrow, 10, 0),
        status: AppointmentStatus.scheduled,
      },
      {
        clientId: luis.id,
        professionalId: draVega.id,
        serviceId: consulta.id,
        startsAt: atTime(tomorrow, 14, 0),
        status: AppointmentStatus.scheduled,
      },
      {
        clientId: maria.id,
        professionalId: carlos.id,
        serviceId: corte.id,
        startsAt: atTime(yesterday, 9, 0),
        status: AppointmentStatus.completed,
      },
      {
        clientId: ana.id,
        professionalId: draVega.id,
        serviceId: consulta.id,
        startsAt: atTime(monday, 11, 0),
        status: AppointmentStatus.scheduled,
      },
      {
        clientId: luis.id,
        professionalId: carlos.id,
        serviceId: barba.id,
        startsAt: atTime(threeDaysAgo, 16, 0),
        status: AppointmentStatus.cancelled,
      },
    ],
  });

  console.log("Seed complete: 3 clients, 2 professionals, 3 services, 5 appointments");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
