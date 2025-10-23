import { api } from "../axios";

export const getServiceQuestion = async (service_id: string) => {
  const response = await api.get(`/questions/service/${service_id}`);
  return response.data;
}