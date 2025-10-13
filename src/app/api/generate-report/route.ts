import axios from "axios";
import AppConstants from "@/constants/appconstants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { githubUrl, login, topCommits, socketId } = body;

    // Validate that all required fields are provided
    if (!githubUrl || !login || !topCommits || !socketId) {
      return Response.json(
        {
          success: false,
          message:
            "All Fields are required (githubUrl, login, topCommits, socketId)",
        },
        {
          status: 400,
        }
      );
    }

    try {
      const response = await axios.post(
        `${AppConstants.apiUrl}/review/analysis`,
        {
          githubUrl: githubUrl,
          login: login,
          topCommits: topCommits,
          socketId: socketId,
        }
      );

      return Response.json({
        success: true,
        message: "Code review started successfully",
        data: response.data,
      });
    } catch (axiosError: any) {
      console.error(
        "Backend API Error:",
        axiosError.response?.data || axiosError.message
      );

      return Response.json(
        {
          success: false,
          message:
            axiosError.response?.data?.message || "Error starting code review",
          error: axiosError.message,
        },
        {
          status: axiosError.response?.status || 500,
        }
      );
    }
  } catch (error: any) {
    console.error("Route Error:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
