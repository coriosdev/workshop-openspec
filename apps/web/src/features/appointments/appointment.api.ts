import type { CreateAppointmentInput } from "@workshop/shared";
import { fetchJson } from "../../lib/api";
import type {
  AppointmentWithRelations,
  Client,
  Professional,
  Service,
} from "./appointment.types";

export function listAppointments() {
  return fetchJson<AppointmentWithRelations[]>("/appointments");
}

export function createAppointment(data: CreateAppointmentInput) {
  return fetchJson<AppointmentWithRelations>("/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function listClients() {
  return fetchJson<Client[]>("/clients");
}

export function listProfessionals() {
  return fetchJson<Professional[]>("/professionals");
}

export function listServices() {
  return fetchJson<Service[]>("/services");
}
