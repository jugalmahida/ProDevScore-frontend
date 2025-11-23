"use server";

import {
  ForgetPasswordPayload,
  GithubCallBack,
  LoginPayload,
  RegisterPayload,
  User,
  VerifyCodePayload,
  VerifyTokenAndSetPasswordPayload,
} from "@/lib/types/auth";
import { createServerApiService } from "@/services/apiService";
import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  saveCookiesFromResponse,
  saveStateCookiesFromGithub,
} from "@/services/apiClient";
import { normalizeError } from "@/utils/httpError";

export async function loginAction(payload: LoginPayload) {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.loginUser(payload);
    // Save cookies from response
    await saveCookiesFromResponse(response.data.tokens);
    return response;
  } catch (e: unknown) {
    const error = normalizeError(e);
    // console.error("Error Login user: ", error);
    return error;
  }
}

export async function loginWithGithubAction() {
  try {
    const apiService = await createServerApiService();
    const res = await apiService.loginUserWithGithubUser();
    await saveStateCookiesFromGithub(res.data);
    return res;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error verify token and set password action:", error);
    return error;
  }
}

export async function loginWithGithubCallBackAction(payload: GithubCallBack) {
  try {
    const apiService = await createServerApiService();
    const res = await apiService.loginUserWithGithubCallBack(payload);
    // Save cookies from response
    await saveCookiesFromResponse(res?.data?.tokens);
    return res;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error verify token and set password action:", error);
    return error;
  }
}

export const getCurrentUserAction = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (!accessToken && !refreshToken) {
    // console.log(
    //   "No accessToken and refreshToken found, skipping getCurrentUser API call."
    // );
    return null;
  }

  // 1. Initial API service instance
  const apiService = await createServerApiService();

  try {
    const response = await apiService.getCurrentUser();
    return response.data;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error getting current user:", error);
    return null;
  }
});

export async function refreshTokenAction() {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.refreshTokens();
    if (
      !(response.success || response.count > 0 || response.data?.accessToken)
    ) {
      return {
        success: false,
        message: response.message || "Error in refreshing tokens",
      };
    }

    if (response.success && response.data?.tokens) {
      // Save cookies from response
      await saveCookiesFromResponse(response.data?.tokens);
      console.log("Tokens are refreshed");
    }
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error in refreshing token:", error);
    return error;
  }
}

export async function registerAction(payload: RegisterPayload) {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.registerUser(payload);
    return response;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error register user:", error);
    return error;
  }
}

export async function verifyCodeAction(payload: VerifyCodePayload) {
  try {
    const apiService = await createServerApiService();
    const response = await apiService.verifyCode(payload);
    // Save cookies from response
    await saveCookiesFromResponse(response.data?.tokens);
    return response;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error Verify code:", error);
    return error;
  }
}

export async function forgetPasswordAction(payload: ForgetPasswordPayload) {
  try {
    const apiService = await createServerApiService();
    const res = await apiService.forgetPassword(payload);
    if (!(res.status === 200)) {
      return false;
    }
    return true;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error forget password action:", error);
    return error;
  }
}

export async function verifyTokenAndSetPasswordAction(
  payload: VerifyTokenAndSetPasswordPayload
) {
  try {
    const apiService = await createServerApiService();
    const res = await apiService.verifyTokenAndSetPassword(payload);
    if (!(res.status === 200)) {
      return false;
    }
    return true;
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error verify token and set password action:", error);
    return error;
  }
}

export async function logoutAction() {
  try {
    const apiService = await createServerApiService();
    const res = await apiService.logoutUser();

    if (res.status === 204) {
      // Clear cookies
      const cookieStore = await cookies();
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
    }
  } catch (e: unknown) {
    const error = normalizeError(e);
    console.error("Error logout action:", error);
    return error;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUserAction();

  if (!user) {
    redirect("/login");
  }

  return user;
}
