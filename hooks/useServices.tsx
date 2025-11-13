import { AddNewServiceAPI, GetProfessionalServicesAPI, GetServicesAPI, UpdateServiceStatusAPI, UseGetServicesQuestionAPI, UseServicePricingAPI, UseSubmitQuestionAnswerAPI } from "@/app/api/services/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export function useGetServices(token: string | null) {
  return useQuery({
    queryKey: ["professionalServices"],
    queryFn: () => GetProfessionalServicesAPI(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}



// Update Service Status Hook
export function useUpdateServiceStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-service-status"],
    mutationFn: (data: {
      service_id: string;
      professional_id: string;
      service_status: boolean;
      token: string;
    }) => UpdateServiceStatusAPI(data),

    onSuccess: (response) => {
      toast.success(response?.message || "Service status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update Service Status"
      );
    },
    retry: false,
  });
}


// Get Services List Hook
export function useGetServicesList(token: string | null) {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => GetServicesAPI(token!),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}



// Insert New service Hook
export function useAddNewService(token: string) {
  const router = useRouter();
  return useMutation({
    mutationKey: ["AddNewService"],
    mutationFn: (data: { service_name: string; service_id: string; professional_id: string }) =>
      AddNewServiceAPI(data, token),
    onSuccess: (data, variables) => {
      router.push(`/home-services/dashboard/services/pricing?service_id=${variables.service_id}&professional_id=${variables.professional_id}`);
    },
  });
}

// Service Pricing Hook
export interface ServicePricingPayload {
  service_id: string;
  professional_id: string;
  pricing_type: string;
  minimum_price: string;
  maximum_price: string;
  completed_tasks: string;
  description: string;
}
export function useServicePricing(token: string) {
  const router = useRouter();
  return useMutation({
    mutationKey: ["UseServicePricing"],
    mutationFn: (data: ServicePricingPayload) => UseServicePricingAPI(data, token),
    onSuccess: (data, variables) => {
      router.push(`/home-services/dashboard/services/questions?service_id=${variables.service_id}&professional_id=${variables.professional_id}`);
    },
  });
}


// get Service Questions by Service ID Hook
export function useGetServicesQuestionByServiceId(token: string | null, serviceId: string | null) {
  return useQuery({
    queryKey: ["questions", serviceId],
    queryFn: () => UseGetServicesQuestionAPI(token!, serviceId!),
    enabled: !!token && !!serviceId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}



// Submit Service Questions Answers Hook
export interface AnswerPayload {
  professional_id: string;
  service_id: string;
  question_id: string;
  answer: string | string[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useSubmitQuestionAnswer = (token: string) => {
  const router = useRouter();
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationKey: ["submitServiceAnswers"],
    mutationFn: (data: AnswerPayload[]) => 
      UseSubmitQuestionAnswerAPI(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceData"] });
      router.push("/home-services/dashboard/services/step-9");
    },
    onError: (error: ApiError) => {
      const errorMessage = error?.response?.data?.message 
        || "Failed to save service answers";
      toast.error(errorMessage);
    },
  });
};

// end of service questions answers hook