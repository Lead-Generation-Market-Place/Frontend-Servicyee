import { getLocationByUserId } from "@/app/api/services/location";
import { useQuery } from "@tanstack/react-query";

export type Location = {
  address_line: string;
  zipcode: string;
  token:string
};

export const useLocationByUserId = (token:string) => {
  return useQuery({
    queryKey: ["locations", token],
    queryFn: ()=> getLocationByUserId(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
