import apiClient from "../axios";

export const getProfessionalById = async () => {
  try {
        const response = await apiClient.get('/professionals/pro');
    return response.data;
  } catch (error) {
    console.error("Error fetching professional data:", error);
    throw error;
  }
};
