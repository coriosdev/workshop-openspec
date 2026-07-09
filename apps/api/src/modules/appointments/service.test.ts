import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ERROR_CODES } from "@workshop/shared";
import { AppError } from "../../lib/errors";

const {
  mockAppointmentCreate,
  mockClientFindById,
  mockProfessionalFindById,
  mockServiceFindById,
} = vi.hoisted(() => ({
  mockAppointmentCreate: vi.fn(),
  mockClientFindById: vi.fn(),
  mockProfessionalFindById: vi.fn(),
  mockServiceFindById: vi.fn(),
}));

vi.mock("../clients/repository", () => ({
  clientRepository: { findById: mockClientFindById },
}));

vi.mock("../professionals/repository", () => ({
  professionalRepository: { findById: mockProfessionalFindById },
}));

vi.mock("../services/repository", () => ({
  serviceRepository: { findById: mockServiceFindById },
}));

vi.mock("./repository", () => ({
  appointmentRepository: { create: mockAppointmentCreate },
}));

import { appointmentService } from "./service";

const FIXED_NOW = new Date("2026-07-09T12:00:00.000Z");

describe("appointmentService.create", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_NOW);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("rejects past startsAt with STARTS_AT_MUST_BE_FUTURE", async () => {
    const input = {
      clientId: "client-1",
      professionalId: "professional-1",
      serviceId: "service-1",
      startsAt: "2026-07-09T11:00:00.000Z",
    };

    await expect(appointmentService.create(input)).rejects.toMatchObject({
      statusCode: 400,
      code: ERROR_CODES.STARTS_AT_MUST_BE_FUTURE,
      message: "startsAt must be in the future",
    } satisfies Partial<AppError>);

    expect(mockClientFindById).not.toHaveBeenCalled();
    expect(mockAppointmentCreate).not.toHaveBeenCalled();
  });

  it("creates appointment when startsAt is in the future", async () => {
    const input = {
      clientId: "client-1",
      professionalId: "professional-1",
      serviceId: "service-1",
      startsAt: "2026-07-09T13:00:00.000Z",
    };

    mockClientFindById.mockResolvedValue({ id: "client-1", name: "Ana" });
    mockProfessionalFindById.mockResolvedValue({
      id: "professional-1",
      name: "Carlos",
    });
    mockServiceFindById.mockResolvedValue({ id: "service-1", name: "Corte" });

    const created = { id: "appointment-1", ...input };
    mockAppointmentCreate.mockResolvedValue(created);

    const result = await appointmentService.create(input);

    expect(mockClientFindById).toHaveBeenCalledWith("client-1");
    expect(mockProfessionalFindById).toHaveBeenCalledWith("professional-1");
    expect(mockServiceFindById).toHaveBeenCalledWith("service-1");
    expect(mockAppointmentCreate).toHaveBeenCalledWith({
      clientId: "client-1",
      professionalId: "professional-1",
      serviceId: "service-1",
      startsAt: new Date("2026-07-09T13:00:00.000Z"),
    });
    expect(result).toBe(created);
  });
});
