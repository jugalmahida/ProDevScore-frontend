import { AxiosInstance } from "axios";
import { serverApiClient } from "./apiClient";

import {
  LoginPayload,
  RegisterPayload,
  VerifyCodePayload,
  ForgetPasswordPayload,
  VerifyTokenAndSetPasswordPayload,
  ChangePasswordPayload,
  GetContributorsPayload,
  StartReviewPayload,
  GithubCallBack,
} from "@/lib/types/auth";

export class ApiService {
  private apiClient: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.apiClient = client;
  }

  async loginUser(payload: LoginPayload) {
    const response = await this.apiClient.post(`/user/login`, payload);
    return response.data;
  }

  async loginUserWithGithubUser() {
    const response = await this.apiClient.get(`/user/github`);
    return response.data;
  }

  async loginUserWithGithubCallBack(payload: GithubCallBack) {
    const response = await this.apiClient.get(
      `/user/github/callback?code=${payload.code}&state=${payload.state}`
    );
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.apiClient.get(`/user/me`);
    return response.data;
  }

  async registerUser(payload: RegisterPayload) {
    const response = await this.apiClient.post(`/user/register`, payload);
    return response.data;
  }

  async verifyCode(payload: VerifyCodePayload) {
    const response = await this.apiClient.post(`/user/verifyCode`, payload);
    return response.data;
  }

  async refreshTokens() {
    const response = await this.apiClient.post(`/user/refresh-tokens`);
    return response.data;
  }

  async forgetPassword(payload: ForgetPasswordPayload) {
    const response = await this.apiClient.post(
      `/user/forget-password`,
      payload
    );
    return response;
  }

  async verifyTokenAndSetPassword(payload: VerifyTokenAndSetPasswordPayload) {
    const response = await this.apiClient.post(
      `/user/verifyToken/${encodeURIComponent(payload.token)}`,
      { newPassword: payload.newPassword }
    );
    return response;
  }

  async changePassword(payload: ChangePasswordPayload) {
    try {
      const response = await this.apiClient.patch(
        `/user/change-password`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error change password:", error);
      throw error;
    }
  }

  async getCurrentUserSubscription() {
    try {
      const response = await this.apiClient.get(`/user/subscription`);
      return response.data;
    } catch (error) {
      console.error("Error Current User Subscription:", error);
      throw error;
    }
  }

  async logoutUser() {
    const response = await this.apiClient.post(`/user/logout`);
    return response;
  }

  async getContributors(payload: GetContributorsPayload) {
    const response = await this.apiClient.post(
      `/review/getContributors`,
      payload
    );
    return response.data;
  }

  async startReview(payload: StartReviewPayload) {
    const response = await this.apiClient.post(`/review/analysis`, payload);

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to start review");
    }

    return response.data;
  }
}

export const createServerApiService = async () => {
  const client = await serverApiClient();
  return new ApiService(client);
};
