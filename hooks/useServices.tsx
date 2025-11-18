import {
  AddNewServiceAPI,
  DeleteServiceAPI,
  GetProfessionalServicesAPI,
  GetServicesAPI,
  SaveServiceLocationAPI,
  UpdateServiceStatusAPI,
  UseGetServicesQuestionAPI,
  UseServicePricingAPI,
  UseSubmitQuestionAnswerAPI
} from "@/app/api/services/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Common query configuration
const queryConfig = {
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
};

// Get Professional Services Hook
export function useGetServices(token: string | null) {
  return useQuery({
    queryKey: ["professionalServices"],
    queryFn: () => GetProfessionalServicesAPI(token!),
    enabled: !!token,
    ...queryConfig,
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
    onSuccess:  (response) => {
      toast.success(response?.message || "Service status updated successfully");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["services"] }),
        queryClient.invalidateQueries({ queryKey: ["professionalServices"] })
      ]);
      
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
    ...queryConfig,
  });
}

// Insert New Service Hook
export function useAddNewService(token: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["AddNewService"],
    mutationFn: (data: { service_name: string; service_id: string; professional_id: string }) =>
      AddNewServiceAPI(data, token),

    onSuccess: async (data, variables) => {
      // Invalidate relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["serviceData"] }),
        queryClient.invalidateQueries({ queryKey: ["professionalServices"] }),
        queryClient.invalidateQueries({ queryKey: ["services"] })
      ]);

      // Set current service data for the next steps
      queryClient.setQueryData(["currentService"], {
        service_id: variables.service_id,
        professional_id: variables.professional_id,
      });

      router.push(`/home-services/dashboard/services/pricing`);
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UseServicePricing"],
    mutationFn: (data: ServicePricingPayload) => UseServicePricingAPI(data, token),

    onSuccess: async (data, variables) => {
      // Invalidate service data queries
      await queryClient.invalidateQueries({ queryKey: ["serviceData"] });

      // Update current service data
      queryClient.setQueryData(["currentService"], {
        service_id: variables.service_id,
        professional_id: variables.professional_id,
      });

      router.push(`/home-services/dashboard/services/questions`);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to save service pricing"
      );
    },
  });
}

// Get Service Questions by Service ID Hook
export function useGetServicesQuestionByServiceId(token: string | null, serviceId: string | null) {
  return useQuery({
    queryKey: ["questions", serviceId],
    queryFn: () => UseGetServicesQuestionAPI(token!, serviceId!),
    enabled: !!token && !!serviceId,
    ...queryConfig,
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
    mutationFn: (data: AnswerPayload[]) => UseSubmitQuestionAnswerAPI(data, token),

    onSuccess: async (data, variables) => {
      if (variables.length > 0) {
        await queryClient.invalidateQueries({ queryKey: ["serviceData"] });
        queryClient.setQueryData(["currentService"], {
          service_id: variables[0].service_id,
          professional_id: variables[0].professional_id,
        });

        router.push(`/home-services/dashboard/services/serviceLocation`);
      }
    },

    onError: (error: ApiError) => {
      const errorMessage = error?.response?.data?.message
        || "Failed to save service answers";
      toast.error(errorMessage);
    },
  });
};

// Location of Service Hook
export interface LocationPayload {
  professional_id: string;
  service_id: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  zip: string;
  radiusMiles: number;
  isLoading: boolean;
}

export const useServiceLocation = (token: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["saveServiceLocation"],
    mutationFn: (data: LocationPayload) => SaveServiceLocationAPI(data, token),

    onSuccess: async () => {
      try {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["serviceData"] }),
          queryClient.invalidateQueries({ queryKey: ["professionalServices"] }),
          queryClient.invalidateQueries({ queryKey: ["services"] }),
          queryClient.invalidateQueries({ queryKey: ["questions"] })
        ]);

        toast.success("New Service Added successfully");
        router.push(`/home-services/dashboard/services`);

      } catch {
        toast.success("New Service Added successfully");
        router.push(`/home-services/dashboard/services`);
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message
        || "Failed to save service location";
      toast.error(errorMessage);
    },
  });
};




// Deleting the service
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteService"],
    mutationFn: ({ service_id, professional_id, token }: {
      service_id: string;
      professional_id: string;
      token: string
    }) => DeleteServiceAPI(service_id, professional_id, token),

    onSuccess: async () => {
      try {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["serviceData"] }),
          queryClient.invalidateQueries({ queryKey: ["professionalServices"] }),
          queryClient.invalidateQueries({ queryKey: ["services"] }),
          queryClient.invalidateQueries({ queryKey: ["questions"] })
        ]);
        toast.success("Service deleted successfully");

      } catch {
        toast.success("Service deleted successfully");
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message
        || "Failed to delete service";
      toast.error(errorMessage);
    },
  });
};


