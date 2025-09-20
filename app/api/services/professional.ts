import apiClient from "../axios"


export const getProfessionalById= async()=>{
    const response = await apiClient.get('/professionals/pro');
    return response.data;
}