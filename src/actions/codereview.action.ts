"use server";

import {
  GetContributorDataPayload,
  GetContributorsPayload,
  StartReviewPayload,
} from "@/lib/types/auth";
import { createServerApiService } from "@/services/apiService";
import { normalizeError } from "@/utils/httpError";

export async function getContributorsAction(payload: GetContributorsPayload) {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.getContributors(payload);

    if (!(response.success || response.count > 0)) {
      return {
        success: false,
        message: response.message,
      };
    }
    return response;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error get contributors :", error);
    return error;
  }
}

export async function getContributorDataAction(
  payload: GetContributorDataPayload
) {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.getContributorData(payload);
    return response;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error get contributor :", error);
    return error;
  }
}

export async function startReviewAction(payload: StartReviewPayload) {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.startReview(payload);

    if (!(response.success || response.count > 0)) {
      return {
        success: false,
        message: response.message,
      };
    }
    return {
      success: true,
      response: response.data,
    };
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error in start review: ", error);
    return error;
  }
}
