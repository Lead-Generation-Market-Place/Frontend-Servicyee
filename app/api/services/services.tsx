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


export const GetServicesAPI = async (token: string) => {
  try {
    const response = await api.get(`/services/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};







// Get Services Hook
export const getProfessionalStepsAPI = async (token: string) => {
  try {
    const response = await api.get("/professionals/professional_steps", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};




export const AddNewServiceAPI = async (  data: { service_name: string; service_id: string, professional_id: string },
  token: string
) => {
  try {
    const response = await api.post(
      `/service/create_service`,
      { service_name: data.service_name, service_id: data.service_id, professional_id: data.professional_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};