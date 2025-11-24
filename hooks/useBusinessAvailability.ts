import { AvailabilityPayload, UseUpdateBusinessAvailabilityAPI } from "@/app/api/services/businessAvailability";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // or your toast library


export const useBusinessAvailability = (token: string) => {
  return useMutation({
    mutationKey: ["updateBusinessAvailability"],
    mutationFn: (data: AvailabilityPayload) =>
      UseUpdateBusinessAvailabilityAPI(data, token),
    onSuccess: async () => {
      toast.success("Business availability updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update business availability.");
    },
  });
};
