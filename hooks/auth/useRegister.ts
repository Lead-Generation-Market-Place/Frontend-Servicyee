// hooks/useRegister.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types/auth/register";
import { registerUser } from "@/app/api/auth/register";

export function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterFormData) => {
    setIsPending(true);
    try {
      await registerUser(data);
      router.push("/home-services/dashboard/services/step-2");
    } catch (error: any) {
      console.error(error.message || error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return { register, isPending };
}
