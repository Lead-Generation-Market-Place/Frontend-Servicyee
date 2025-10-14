import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/auth/register";
import { registerUser } from "@/app/api/auth/register";
import toast from "react-hot-toast";

export function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();


  const register = async (data: RegisterFormData) => {
    console.log(data.website)
    setIsPending(true);
    try {
      await registerUser(data);
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
