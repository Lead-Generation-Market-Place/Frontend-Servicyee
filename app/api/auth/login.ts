// app/api/auth.ts
import { api, tokenManager } from "@/app/api/axios";

export interface User {
  _id: string;
  email: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  user: {
    _id: string;
    email: string;
    username: string;
    createdAt?: string;
    updatedAt?: string;
  };
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
    try {
      const accessToken = tokenManager.getAccessToken();
      if (!accessToken)
        throw new Error("No access token found. Please log in again.");

      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data) {
        throw new Error("No user data returned from /auth/me endpoint.");
      }

      return response.data as User;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("Session expired, logging out...");
        await this.logout();
        throw new Error("Session expired. Please log in again.");
      }

      throw new Error(error.message || "Failed to fetch current user.");
    }
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
