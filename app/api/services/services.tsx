import { handleApiError } from "@/lib/errorHandler";
import { api } from "../axios"

// Get Professional Services or services of a professional
export const GetProfessionalServicesAPI = async (token: string) => {
  try {
    const response = await api.get(`/services/services-management`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};



// Update Service Status API
export const UpdateServiceStatusAPI = async (data: { service_id: string;  professional_id: string;  service_status: boolean;  token: string;}) => {
  const { service_id, professional_id, service_status, token } = data;

  try {
    const response = await api.put(`/services/service_status`,
      {
        service_id: service_id,
        professional_id: professional_id,
        service_status: service_status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};




// Get Services Hook
export const GetServicesAPI = async (token: string) => {
  try {
    const response = await api.get(`/services/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Services API Response:", response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
