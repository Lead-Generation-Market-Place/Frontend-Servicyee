import { api } from "../axios";
export const getPopularServices = async () => {
    try {
        const response = await api.get('/popular-services');
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const getSubcategoriesServices = async () => {
    try {
        const response = await api.get('/subcategory-services');
        return response.data;
    } catch (error) {
        console.log("Error fetching subcategories' services", error);
    }
}

export const getFeaturedServices = async () => {
    try {
        const response = await api.get('/services/featured');
        return response.data;
    }catch(error) {
        console.log("Error getting featured services: ", error);
    }
}