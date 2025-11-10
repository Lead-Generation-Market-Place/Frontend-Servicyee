import { GetProfessionalServicesAPI } from "@/app/api/services/services";
import { useQuery } from "@tanstack/react-query";


export function useGetServices(token: string, id: string) {
    return useQuery({
        queryKey: ["professionalServices", id],
        queryFn: async () => {
            if (!token || !id) throw new Error("Missing token or professional ID");
            return await GetProfessionalServicesAPI(token, id);
        },
        enabled: !!token && !!id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}