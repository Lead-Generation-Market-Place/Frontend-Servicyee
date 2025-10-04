import {
  getProfessionalById,
} from "@/app/api/services/professional";
import {  useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateProfessional } from "@/app/api/services/professional";
import { ProfessionalFormData } from "@/schemas/professional/professional";
import { toast } from "sonner";
import apiClient from "@/app/api/axios";
import { handleApiError } from "@/lib/errorHandler";


interface UpdateProfessionalPayload {
  id: string;
  data: ProfessionalFormData;
  token: string
}

export type Professional = {
  id: string;
  introduction: string;
};
interface UseUpdateProfessionalOptions {
  onSuccessRedirect?: string;
  showAdvancedError?: boolean;
  enableOptimisticUpdate?: boolean;
}
// Get Professional By User_Id
export const useGetProfessionalbyUserId = (token:string) => {
  return useQuery({
    queryKey: ["professionals", token],
    queryFn: () => getProfessionalById(token),
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfessionalbyUserId = (options: UseUpdateProfessionalOptions = {}
) => {
  const {
    onSuccessRedirect,
    showAdvancedError = true,
    enableOptimisticUpdate = true,
  } = options;
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<Professional, Error, UpdateProfessionalPayload>({
    mutationFn: async (payload) => {
      return await updateProfessional(payload.id, payload.data, payload.token);
    },
    onMutate: async (payload) => {
      if (!enableOptimisticUpdate) return;
      await queryClient.cancelQueries({
        queryKey: ["professional", payload.id],
      });
      const previousProfessional = queryClient.getQueryData<Professional>([
        "professional",
        payload.id,
      ]);
      if (previousProfessional) {
        queryClient.setQueryData<Professional>(["professional", payload.id], {
          ...previousProfessional,
          ...payload.data,
        });
      }
      return { previousProfessional };
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["professional"] });
      queryClient.invalidateQueries({
        queryKey: ["professional", variables.id],
      });
      toast.success("Professional updated successfully!", {
        duration: 3000,
        position: "top-center",
      });

      if (onSuccessRedirect) {
        router.push(onSuccessRedirect);
      } else {
        router.back();
      }
    },

    onError: (error, variables) => {
      if (showAdvancedError) {
        toast.error("Advanced Professional Update Failed", {
          description: `Error: ${error.message}`,
          duration: 5000,
          position: "top-center",
          action: {
            label: "Retry",
            onClick: () => mutation.mutate(variables),
          },
        });
      } else {
        toast.error(`Failed to update professional: ${error.message}`);
      }
    },
    retry: (failureCount, error) => {
      if (error.message.includes("Network")) {
        return failureCount < 3;
      }
      return false;
    },

    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  return {
    ...mutation,
    updateProfessional: mutation.mutate,
    updateProfessionalAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    errorMessage: mutation.error?.message,
    reset: () => {
      mutation.reset();
      toast.info("Professional update form reset");
    },
  };
};
export const useProfessionalErrorHandler = () => {
  const handleProfessionalError = (error: Error, context?: string) => {
    toast.error(
      `Professional Error${context ? ` in ${context}` : ""}: ${error}`,
      
    );

    toast.error("Professional Operation Failed", {
      description: `Context: ${context || "General"}\nError: ${error.message}`,
      position: "top-center",
      duration: 6000,
    });

    return {
      severity: error.message.includes("Network") ? "high" : "medium",
      timestamp: new Date().toISOString(),
      context,
    };
  };

  return { handleProfessionalError };
};
export const useProfessionalCache = () => {
  const queryClient = useQueryClient();
  const updateProfessionalCache = (
    professionalId: string,
    updates: Partial<Professional>
  ) => {
    queryClient.setQueryData<Professional>(
      ["professional", professionalId],
      (old) => {
        if (!old) return undefined;
        return { ...old, ...updates };
      }
    );
  };

  const getProfessionalFromCache = (
    professionalId: string
  ): Professional | undefined => {
    return queryClient.getQueryData<Professional>([
      "professional",
      professionalId,
    ]);
  };

  const prefetchProfessional = async (professionalId: string) => {
    await queryClient.prefetchQuery({
      queryKey: ["professional", professionalId],
      queryFn: () =>
        queryClient.getQueryData(["professional", professionalId]) ||
        Promise.reject("No cache available"),
    });
  };

  return {
    updateProfessionalCache,
    getProfessionalFromCache,
    prefetchProfessional,
    invalidateProfessional: (professionalId?: string) => {
      if (professionalId) {
        queryClient.invalidateQueries({
          queryKey: ["professional", professionalId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ["professional"] });
    },
  };
};


//Update Professional Details - Account Setting
export const useUpdateProfessional = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProfessional"],
    mutationFn: async ({ id, data }: { id: string; data: FormData | Record<string, any> }) => {
      if (!id) throw new Error("Missing professional ID");

      const config = data instanceof FormData ? {} : { 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        } 
      };

      try {
        const response = await apiClient.put(`/professionals/${id}/introduction`, data, config);
        return response.data;
      } catch (error: any) {
        throw handleApiError(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional"] });
      queryClient.invalidateQueries({ queryKey: ["location"] });
    },
  });
};
