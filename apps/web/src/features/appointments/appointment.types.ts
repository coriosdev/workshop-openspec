import type { AppointmentStatus } from "@workshop/shared";

export type Client = {
  id: string;
  name: string;
  phone: string;
};

export type Professional = {
  id: string;
  name: string;
  specialty: string;
};

export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
};

export type AppointmentWithRelations = {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  startsAt: string;
  status: AppointmentStatus;
  client: Client;
  professional: Professional;
  service: Service;
};
