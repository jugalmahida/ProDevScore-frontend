import axios from "axios";
import AppConstants from "@/constants/appconstants";

export interface StartReviewPayload {
  githubUrl: string;
  login: string;
  topCommits: number;
  socketId: string;
}

export interface GetContributorsPayload {
  githubUrl: string;
}

export class ApiService {
  async getContributors(payload: GetContributorsPayload) {
    try {
      const response = await axios.post(
        `${AppConstants.apiUrl}/review/getContributors`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching contributors:", error);
      throw error;
    }
  }

  async startReview(payload: StartReviewPayload) {
    try {
      const response = await axios.post("/api/generate-report", payload);

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
