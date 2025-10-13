import { RegisterFormData, RegisterResponse } from "@/types/auth/register";
import { api } from "../axios";
import { handleApiError } from "@/lib/errorHandler";

export const registerUser = async (
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
