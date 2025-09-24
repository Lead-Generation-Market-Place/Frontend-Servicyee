import { toast } from "sonner";
import apiClient from "../axios";
import { ProfessionalFormData } from "@/schemas/professional/professional";

export type Professional = {
  id: string;
  introduction: string;
};
export const getProfessionalById = async () => {
  try {
    const response = await apiClient.get("/professionals/pro");
    return response.data;
  } catch (error) {
    toast.error(`Error fetching professional data:", ${error}`);
    throw error;
  }
};

export const updateProfessional = async (
  id: string,
  data: ProfessionalFormData
): Promise<Professional> => {
  try {
    const response = await apiClient.put(`/professionals/${id}`, data);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || "Failed to update professional";
    toast.error(message);
    throw new Error(message);
  }
};

