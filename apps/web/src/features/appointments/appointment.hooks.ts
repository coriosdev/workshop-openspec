import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateAppointmentInput } from "@workshop/shared";
import * as api from "./appointment.api";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: api.listAppointments,
  });
}

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: api.listClients,
  });
}

export function useProfessionals() {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: api.listProfessionals,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: api.listServices,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentInput) => api.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
