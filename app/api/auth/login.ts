// app/api/auth.ts
import { api, tokenManager } from "@/app/api/axios";

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
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

class AuthService {
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
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

      tokenManager.setTokens(accessToken, refreshToken);

      return { user, tokens: { accessToken, refreshToken } };
    } catch (error: any) {
      if (error.response) {
        const serverError: ApiError = {
          message: error.response.data?.message || "Login failed",
          statusCode: error.response.status,
          error: error.response.data?.error,
        };

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
            serverError.message =
              "Too many login attempts. Please try again later.";
            break;
          case 500:
            serverError.message = "Server error. Please try again later.";
            break;
        }

        throw new Error(serverError.message);
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error(error.message || "Login failed. Please try again.");
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      tokenManager.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User> {
    console.warn("/auth/me endpoint not implemented, using fallback");
    throw new Error(
      "User profile endpoint not available. " +
        "Please implement /auth/me endpoint on backend, " +
        "or modify frontend to use user data from login response."
    );
  }

  isAuthenticated(): boolean {
    return tokenManager.isAuthenticated();
  }

  async refreshUser(): Promise<User> {
    const user = await this.getCurrentUser();
    return user;
  }
}

export const authAPI = new AuthService();
