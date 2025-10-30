import { api } from "../axios";

export const getServiceQuestion = async (service_id: string) => {
  const response = await api.get(`/questions/service/${service_id}`);
  return response.data;
};

export const generateLead = async (leadData: {
  serviceId: string;
  responses: Record<string, any>;
  professionalId?: string;
  userInfo: {
    email: string;
    phone: string;
    description?: string;
  };
  userLocation?: {
    city?: string;
    state?: string;
    postcode?: string;
  };
  sendOption: "top5" | "selected";
  selectedProfessionals?: string[];
}) => {
  const response = await api.post("/lead/generate", leadData);
  return response.data;
};