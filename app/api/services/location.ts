import { handleApiError } from "@/lib/errorHandler";
import apiClient from "../axios";

export const getLocationByUserId = async (token: string) => {
  try {
    const response = await apiClient.get("/location/pro", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
