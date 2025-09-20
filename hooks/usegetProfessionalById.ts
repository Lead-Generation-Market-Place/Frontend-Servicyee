import { getProfessionalById } from "@/app/api/services/professional";
import { useQuery } from "@tanstack/react-query";

export const useGetProfessional = () => {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: getProfessionalById,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
