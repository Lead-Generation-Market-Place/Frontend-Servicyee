import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/auth/register";
import {
  registerUser,
  UpdateBusinessName,
} from "@/app/api/services/ProAccount";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/context/auth-context";

export function useRegister() {
  const { login } = useAuth();
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
      await login(data.email, data.password);

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
    onSuccess: (updatedProfessional) => {

      const storedData = localStorage.getItem("professionalData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (parsedData.professional) {
          parsedData.professional.business_name =
            updatedProfessional.professional.business_name;
        }
        localStorage.setItem("professionalData", JSON.stringify(parsedData));
      }

      router.push(`/home-services/dashboard/services/step-4`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update Business Name"
      );
    },
  });
}
