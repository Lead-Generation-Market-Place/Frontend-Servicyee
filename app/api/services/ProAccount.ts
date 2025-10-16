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


export const UpdateBusinessName = async (data: {businessName: string; id: string})=>{
  try {
     const response = await api.put(`/professionals/update-business-name/${data.id}`, {business_name: data.businessName});
     return response.data;    
  } catch (error) {
    throw handleApiError(error);
  }

}