import axios from "axios";
import AppConstants from "@/constants/appconstants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { githubUrl } = body;

    // Validate that githubUrl is provided
    if (!githubUrl) {
      return Response.json(
        {
          success: false,
          message: "GitHub URL is required",
        },
        {
          status: 400,
        }
      );
    }

    const response = await axios.post(
      `${AppConstants.apiUrl}/review/getContributors`,
      {
        githubUrl: githubUrl,
      }
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error in fetching Contributors", error);
    return Response.json(
      {
        success: false,
        message: "Error in Fetching Contributors",
      },
      {
        status: 500,
      }
    );
  }
}
