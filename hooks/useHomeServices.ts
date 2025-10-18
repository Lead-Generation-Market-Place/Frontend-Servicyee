import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserLocationById,
  getFeaturedServices,
  getPopularServices,
  getSubcategoriesServices,
  getSubcategoryServicesBySlug,
  getUserLocation,
} from "@/app/api/homepage/popularService";


export const usePopularServices = () => {
    return useQuery({
        queryKey: ["popularServices"],
        queryFn: getPopularServices,
        staleTime:5*60*1000,
    });
}

export const useSubcategoryServices = () => {
    return useQuery({
        queryKey: ["subcategoryServices"],
        queryFn: getSubcategoriesServices,
        staleTime: 5*60*1000,
    });
}

export const useFeaturedServices = () => {
    return useQuery({
        queryKey: ["featuredServices"],
        queryFn: getFeaturedServices,
        staleTime: 5*60*1000,
    });
}

// export const useSubcategories = () => {
//   return useQuery({
//     queryKey: ["subcategories"],
//     queryFn: getSubcategoriesServices,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

export const useSubcategoryServicesBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["subcategory", slug],
    queryFn: () => getSubcategoryServicesBySlug(slug),
    enabled: !!slug, // Only fetch when slug is available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
// user locaiton

// export const useUserLocation = (id:string) => {
//     return useQuery({
//         queryKey: ["userLocation", id],
//         queryFn: getUserLocatioin,
//         staleTime: 5*60*1000,
//     });
// }

export const useUserLocation = (userId: string | undefined, token: string | undefined) => {
  return useQuery({
    queryKey: ['userLocation', userId],
    queryFn: () => {
      if (!userId || !token) throw new Error('User not authenticated');
      return getUserLocation(userId, token);
    },
    enabled: !!userId && !!token, // Only run if user is authenticated
    retry: false,
  });
};

export const useCreateUserLocation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userLocationData, userId, token }: { 
      userLocationData: any; 
      userId: string; 
      token: string; 
    }) => createUserLocationById(userLocationData, userId, token),
    onSuccess: () => {
      // Invalidate and refetch user location after successful creation
      queryClient.invalidateQueries({ queryKey: ['userLocation'] });
    },
  });
};