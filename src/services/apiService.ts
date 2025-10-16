import { apiClient } from "./apiClient";

export interface StartReviewPayload {
  githubUrl: string;
  login: string;
  topCommits: number;
  socketId: string;
}

export interface GetContributorsPayload {
  githubUrl: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export class ApiService {
  async loginUser(payload: LoginPayload) {
    try {
      const response = await apiClient.post(`/user/login`, payload);
      console.log(response.headers);
      return response.data;
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      const response = await apiClient.post(`/user/logout`);
      return response.data;
    } catch (error) {
      console.error("Error login user:", error);
      throw error;
    }
  }

  async getContributors(payload: GetContributorsPayload) {
    try {
      const response = await apiClient.post(`/review/getContributors`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching contributors:", error);
      throw error;
    }
  }

  async startReview(payload: StartReviewPayload) {
    try {
      const response = await apiClient.post(
        `/review/analysis`,
        payload
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to start review");
      }

      return response.data;
    } catch (error) {
      console.error("Error starting review:", error);
      throw new Error("Failed to start code review");
    }
  }
}

export const apiService = new ApiService();
