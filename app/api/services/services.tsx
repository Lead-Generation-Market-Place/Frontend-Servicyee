import { handleApiError } from "@/lib/errorHandler";
import { api } from "../axios"


export const GetProfessionalServicesAPI = async (token: string, id: string) => {
  try {
    const response = await api.get(`/services/services-management/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};