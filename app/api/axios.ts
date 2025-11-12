// app/api/axios.ts
import axios from 'axios';

// Create axios instance with secure defaults
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage using secure HTTP-only cookies approach
// For development, we'll use a hybrid approach that can be upgraded to httpOnly in production

class AuthTokenManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    // Set axios default header
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    // For production, you would set httpOnly cookies here
    if (typeof window !== 'undefined') {
      // Temporary session storage for development (replace with httpOnly cookies in production)
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
  }



  getAccessToken(): string | null {
    if (!this.accessToken && typeof window !== 'undefined') {
      // Try to recover from sessionStorage on page refresh
      this.accessToken = sessionStorage.getItem('accessToken');
      if (this.accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      }
    }
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    if (!this.refreshToken && typeof window !== 'undefined') {
      this.refreshToken = sessionStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    delete api.defaults.headers.common['Authorization'];
    
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const tokenManager = new AuthTokenManager();

// Export functions for external use
export const setAccessToken = (token: string) => {
  const refreshToken = tokenManager.getRefreshToken();
  if (refreshToken) {
    tokenManager.setTokens(token, refreshToken);
  }
};

export const clearAccessToken = () => {
  tokenManager.clearTokens();
};

export const getAccessToken = () => tokenManager.getAccessToken();

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with improved error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle authentication errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = tokenManager.getRefreshToken();
      
      if (refreshToken) {
        originalRequest._retry = true;
        
        try {
          // Attempt to refresh tokens
          const refreshResponse = await api.post('/auth/refresh', {
            refreshToken
          });
          
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data.tokens;
          
          if (newAccessToken && newRefreshToken) {
            tokenManager.setTokens(newAccessToken, newRefreshToken);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Refresh failed, clear tokens
          tokenManager.clearTokens();
        }
      } else {
        // No refresh token available, clear any existing tokens
        tokenManager.clearTokens();
      }
    }

    // For other errors, just reject the promise
    return Promise.reject(error);
  }
);

export { api };

 export const getStaticURL = () => {
  return "https://servicyee-backend.onrender.com/uploads/service";
 }

 export const getSubcategoryStaticURL = () => {
  return "https://servicyee-backend.onrender.com/uploads/SubCategory";
 }