// lib/api-client.ts
import AppConstants from "@/constants/appconstants";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { refreshTokenAction } from "@/actions/auth.action";
import { Tokens } from "@/lib/types/auth";

export const serverApiClient = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Build cookie header string
  const cookieHeader = [
    accessToken && `accessToken=${accessToken}`,
    refreshToken && `refreshToken=${refreshToken}`,
  ]
    .filter(Boolean)
    .join("; ");

  const serverClient = axios.create({
    baseURL: AppConstants.apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Send cookies to backend
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
  });

  serverClient.interceptors.response.use(
    (response) => {
      // Any status code that lies within the range of 2xx cause this function to trigger
      // Do nothing, just return the response
      return response;
    },
    async (error: AxiosError) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      const originalRequest = error.config as RetryConfig;

      // Check if it's a 401 error and not a retry request
      // We check for `_retry` to prevent infinite loops
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // Mark this request as retried

        try {
          // Call the server action to refresh the token.
          // This action should internally handle getting the new tokens
          // and saving them to the cookies.
          await refreshTokenAction();

          // After the action, cookies are updated. We need to re-read them.
          const newCookieStore = await cookies();
          const newAccessToken = newCookieStore.get("accessToken")?.value;
          const newRefreshToken = newCookieStore.get("refreshToken")?.value;

          const newCookieHeader = [
            newAccessToken && `accessToken=${newAccessToken}`,
            newRefreshToken && `refreshToken=${newRefreshToken}`,
          ]
            .filter(Boolean)
            .join("; ");

          // Update the headers of the original request
          if (originalRequest.headers && newCookieHeader) {
            originalRequest.headers["Cookie"] = newCookieHeader;
          }

          // Retry the original request with the new token
          return serverClient(originalRequest);
        } catch (refreshError) {
          // Refresh token failed (e.g., it expired)
          // Log the user out by deleting cookies
          await deleteCookies();

          // Reject with the refresh error
          return Promise.reject(refreshError);
        }
      }

      // For any other error, just reject it
      return Promise.reject(error);
    }
  );

  return serverClient;
};

export const saveCookiesFromResponse = async (response: Tokens) => {
  if (!response) return;
  const cookieStore = await cookies();

  if (response.accessToken) {
    cookieStore.set("accessToken", response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60, // 15 minutes in seconds
      path: "/",
    });
  }

  if (response.refreshToken) {
    cookieStore.set("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });
  }
};

export const deleteCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// For client side calling api from browser
// export const apiClient = axios.create({
//   baseURL: AppConstants.localApiUrl,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });
