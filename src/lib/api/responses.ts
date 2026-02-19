import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiErrorCode = "VALIDATION_ERROR" | "INVALID_JSON" | "INTERNAL_ERROR";

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, string[]>;
  };
};

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccessResponse<T>>({ success: true, data }, { status });
}

export function jsonError(
  code: ApiErrorCode,
  message: string,
  status: number,
  details?: Record<string, string[]>,
) {
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {}),
      },
    },
    { status },
  );
}

export function mapZodError(error: ZodError): Record<string, string[]> {
  return error.flatten().fieldErrors as Record<string, string[]>;
}
