import apiClient from "../axios";
export const getPopularServices = async () => {
    try {
        const response = await apiClient.get('/popular-services');
        return response.data;
    } catch (error) {
        console.log("Error: ", error);
    }
}