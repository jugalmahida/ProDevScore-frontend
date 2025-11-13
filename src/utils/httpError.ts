// src/utils/httpError.ts
import axios, { AxiosError } from "axios";

export type ApiErrorData = {
  success: false;
  message: string;
  errors?: unknown;
};

export function normalizeError(e: unknown): ApiErrorData {
  if (axios.isAxiosError(e)) {
    const ax = e as AxiosError<Partial<ApiErrorData>>;
    const msg = ax.response?.data?.message ?? ax.message;
    return { success: false, message: msg, errors: ax.response?.data?.errors };
  }
  if (e instanceof Error) {
    return { success: false, message: e.message };
  }
  return { success: false, message: "Unknown error" };
}
