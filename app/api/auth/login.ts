// app/api/auth.ts
import { api, tokenManager } from "@/app/api/axios";

export interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export const authAPI = {
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken } = response.data.tokens; 
      const { user } = response.data;

      if (!accessToken) {
        throw new Error("No access token received from server");
      }

      if (!refreshToken) {
        throw new Error("No refresh token received from server");
      }

      // Store tokens using our token manager
      tokenManager.setTokens(accessToken, refreshToken);
      
      return { user, tokens: { accessToken, refreshToken } };
    } catch (error: any) {
      // Enhanced error handling
      if (error.response) {
        // Server responded with error status
        const serverError: ApiError = {
          message: error.response.data?.message || "Login failed",
          statusCode: error.response.status,
          error: error.response.data?.error
        };
        
        // Specific error messages based on status code
        switch (error.response.status) {
          case 400:
            serverError.message = "Invalid email or password format";
            break;
          case 401:
            serverError.message = "Invalid email or password";
            break;
          case 404:
            serverError.message = "Account not found";
            break;
          case 429:
            serverError.message = "Too many login attempts. Please try again later.";
            break;
          case 500:
            serverError.message = "Server error. Please try again later.";
            break;
        }
        
        throw new Error(serverError.message);
      } else if (error.request) {
        // Network error
        throw new Error("Network error. Please check your connection.");
      } else {
        // Other errors
        throw new Error(error.message || "Login failed. Please try again.");
      }
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint to invalidate tokens on server
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with client-side cleanup even if server call fails
    } finally {
      // Always clear tokens client-side
      tokenManager.clearTokens();
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return tokenManager.isAuthenticated();
  }
};