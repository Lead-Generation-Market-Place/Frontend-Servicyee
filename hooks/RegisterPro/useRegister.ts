import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/auth/register";
import {
  registerUser,
  UpdateBusinessName,
} from "@/app/api/services/ProAccount";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterFormData) => {
    setIsPending(true);
    try {
      const response = await registerUser(data);
      localStorage.setItem(
        "professionalData",
        JSON.stringify(response.professional)
      );
      router.push("/home-services/dashboard/services/step-2");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { register, isPending };
}

export function useUpdateBusinessName() {
  const router = useRouter();
  return useMutation({
    mutationKey: ["UpdateBusinessName"],
    mutationFn: (data: { businessName: string; id: string }) =>
      UpdateBusinessName(data),
    onSuccess: () => {
      router.push(`/home-services/dashboard/services/step-4`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update Business Name"
      );
    },
  });
}
