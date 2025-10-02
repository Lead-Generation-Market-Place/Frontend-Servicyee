// lib/auth.ts
import apiClient from '@/app/api/axios';
import { 
  LoginCredentials, 
  AuthResponse, 
  ForgotPasswordData, 
  ForgotPasswordResponse 
} from '@/types/auth';

export const authAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Server responded with error status
        console.log(error.response);
        throw new Error(error.response.data?.message || 'Login failed');
      } else if (error.request) {
        // Request made but no response received
        throw new Error('Network error. Please check your connection.');
      } else {
        // Something else happened
        throw new Error('An unexpected error occurred');
      }
    }
  },

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || 'Failed to send reset password email');
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },

  async socialLogin(provider: 'apple' | 'google'): Promise<void> {
    // For social login, you might need to redirect to backend endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/${provider}`;
  }
};