import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { ERROR_CODES } from "@workshop/shared";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

function formatError(code: string, message: string) {
  return { error: { code, message } };
}

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    return reply
      .status(error.statusCode)
      .send(formatError(error.code, error.message));
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send(formatError(ERROR_CODES.INVALID_BODY, "Invalid request body"));
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return reply
        .status(404)
        .send(formatError(ERROR_CODES.NOT_FOUND, "Resource not found"));
    }

    if (error.code === "P2003") {
      return reply
        .status(404)
        .send(formatError(ERROR_CODES.NOT_FOUND, "Related resource not found"));
    }
  }

  if (error.validation) {
    return reply
      .status(400)
      .send(formatError(ERROR_CODES.INVALID_BODY, "Invalid request body"));
  }

  console.error(error);

  return reply
    .status(500)
    .send(formatError(ERROR_CODES.INTERNAL_ERROR, "Internal server error"));
}
