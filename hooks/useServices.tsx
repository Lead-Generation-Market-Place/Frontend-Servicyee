import {  GetProfessionalServicesAPI, GetServicesAPI, UpdateServiceStatusAPI } from "@/app/api/services/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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