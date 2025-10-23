import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/auth/register";
import {
  AnswerPayload,
  BusinesAvailabilityAPI,
  BusinessAvailabilityPayload,
  BusinessInfoPayload,
  getProServicesQuestionsAPI,
  LocationData,
  registerUserAPI,
  saveBusinessInfoAPI,
  saveLocationAPI,
  submitServiceAnswersAPI,
  UpdateBusinessName,
} from "@/app/api/services/ProAccount";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/context/auth-context";
import {} from "@/components/home-services/onboarding/step-4";
// Create Account For Professional
export function useRegister() {
  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const registerUser = async (data: RegisterFormData) => {
    setIsPending(true);
    try {
      const response = await registerUserAPI(data);
      localStorage.setItem(
        "professionalData",
        JSON.stringify(response.professional)
      );
      try {
        await login(data.email, data.password);
        router.push("/home-services/dashboard/services/step-2");
      } catch {
        router.push("/auth/login");
      }

      router.push("/home-services/dashboard/services/step-2");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return { registerUser, isPending };
}

// Create Professional Account - Step 03
export function useUpdateBusinessName(token: string) {
  const router = useRouter();
  return useMutation({
    mutationKey: ["UpdateBusinessName"],
    mutationFn: (data: { businessName: string; id: string }) =>
      UpdateBusinessName(data, token),
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
// End of Create Professional Account - Step 03

// Craete Prof Account Business Info - Step 04
export function useBusinessInfo(token: string) {
  const router = useRouter();
  return useMutation({
    mutationKey: ["BusinessInfo"],
    mutationFn: (data: BusinessInfoPayload) => saveBusinessInfoAPI(data, token),
    onSuccess: (responseData, variables) => {
      const localData = localStorage.getItem("professionalData");

      if (localData) {
        const parsed = JSON.parse(localData);

        parsed.professional = {
          ...parsed.professional,
          businessType: variables.businessType,
          employees: variables.employees,
          founded: variables.founded,
          about: variables.about,
          profileUrl:
            responseData?.profileUrl || parsed.professional?.profileUrl || null,
        };

        localStorage.setItem("professionalData", JSON.stringify(parsed));
      }

      router.push("/home-services/dashboard/services/step-5");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to save Business Info"
      );
    },
  });
}

// Create Pro Account Business Availibilty Step 07
export function useBusinesAvailability(token: string) {
  const router = useRouter();
  return useMutation({
    mutationKey: ["BusinesAvailability"],
    mutationFn: (data: BusinessAvailabilityPayload) =>
      BusinesAvailabilityAPI(data, token),
    onSuccess: (responseData, variables) => {
      const localData = localStorage.getItem("professionalData");
      if (localData) {
        const parsed = JSON.parse(localData);
        parsed.professional = {
          ...parsed.professional,
          availability: variables.schedule || [],
        };
        localStorage.setItem("professionalData", JSON.stringify(parsed));
      }
      router.push("/home-services/dashboard/services/step-8");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to save Business Info"
      );
    },
  });
}

// Get Professional Services Question - Step 08
export function useProServicesQuestions(token: string) {
  return useQuery({
    queryKey: ["getProServicesQuestions", token],
    queryFn: () => getProServicesQuestionsAPI(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
}

// Create Professional Account 08
export const useSubmitServiceAnswers = (token: string) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["submitServiceAnswers"],
    mutationFn: (data: AnswerPayload[]) => submitServiceAnswersAPI(data, token),
    onSuccess: (responseData, variables) => {
      const localData = localStorage.getItem("professionalData");
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          parsed.professional = {
            ...parsed.professional,
            serviceAnswers: variables || [],
          };
          localStorage.setItem("professionalData", JSON.stringify(parsed));
        } catch (error) {
          console.error(
            "Failed to save service answers to localStorage:",
            error
          );
        }
      } else {
        const newData = {
          professional: {
            serviceAnswers: variables || [],
          },
        };
        localStorage.setItem("professionalData", JSON.stringify(newData));
      }
      router.push("/home-services/dashboard/services/step-9");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to save Business Info"
      );
    },
  });
};


// Create Professional Step 09
export function useSaveLocation(token: string) {
  const router = useRouter();
  return useMutation({
    mutationKey: ["ProfessionalLocation"],
    mutationFn: (data: LocationData) => saveLocationAPI(data, token),
    onSuccess: (responseData, variables) => {
      const localData = localStorage.getItem("professionalData");
      if (localData) {
        const parsed = JSON.parse(localData);
        parsed.professional = {
          ...parsed.professional,
          location: {
            lat: variables.lat,
            lng: variables.lng,
            city: variables.city,
            state: variables.state,
            zip: variables.zip,
            radiusMiles: variables.radiusMiles,
          },
        };
        localStorage.setItem("professionalData", JSON.stringify(parsed));
      }
      router.push("/home-services/dashboard/services/step-10");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to save location"
      );
    },
  });
}