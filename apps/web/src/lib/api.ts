type ErrorEnvelope = {
  error: {
    code: string;
    message: string;
  };
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function isErrorEnvelope(value: unknown): value is ErrorEnvelope {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const envelope = value as ErrorEnvelope;
  return (
    typeof envelope.error?.code === "string" &&
    typeof envelope.error?.message === "string"
  );
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`/api${path}`, init);

  if (!response.ok) {
    try {
      const body: unknown = await response.json();
      if (isErrorEnvelope(body)) {
        throw new ApiError(
          response.status,
          body.error.code,
          body.error.message,
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
    }

    throw new ApiError(response.status, "UNKNOWN", response.statusText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
