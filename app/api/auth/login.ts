
import apiClient from '@/app/api/axios';
import { 
  LoginCredentials, 
  AuthResponse, 
} from '@/types/auth';


export const authAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Log the response for debugging
      console.log('Login API Response:', response.data);
      
      return response.data;
    } catch (error: any) {
      console.error('API Error details:', error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           `Login failed (${error.response.status})`;
        
        throw new Error(errorMessage);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your connection and try again.');
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },

};