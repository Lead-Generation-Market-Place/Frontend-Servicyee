import { RegisterFormData, RegisterResponse } from "@/types/auth/register";
import { api } from "../axios";
import { handleApiError } from "@/lib/errorHandler";

export const registerUserAPI = async (
  data: RegisterFormData
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "/professionals/register",
      data
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const UpdateBusinessName = async (data: {
  businessName: string;
  id: string;
}) => {
  try {
    const response = await api.put(
      `/professionals/update-business-name/${data.id}`,
      { business_name: data.businessName }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// API for Creating Account - Professional Business Info - Step 04
export interface BusinessInfoPayload {
  businessType: "company" | "handyman" | "Sub-Contractor";
  employees?: string | number | null;
  founded?: string | number | null;
  about?: string | null;
  profile?: File | null;
  id: string | null;
}

export const saveBusinessInfoAPI = async (
  data: BusinessInfoPayload,
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append("businessType", data.businessType);
    if (data.employees) formData.append("employees", String(data.employees));
    if (data.founded) formData.append("founded", String(data.founded));
    if (data.about) formData.append("about", data.about);
    if (data.profile) formData.append("profile", data.profile);
    if (data.id) formData.append("id", data.id);
    const response = await api.put(`/professionals/businessInfo/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
