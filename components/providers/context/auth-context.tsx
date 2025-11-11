// contexts/auth-context.tsx
"use client";
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '@/app/api/auth/login';
import { User } from '@/app/api/auth/login';
import { tokenManager } from '@/app/api/axios'; // Import token manager
import { useQueryClient } from '@tanstack/react-query';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'AUTH_START' }
    | { type: 'AUTH_SUCCESS'; payload: User }
    | { type: 'AUTH_FAILURE'; payload: string }
    | { type: 'AUTH_LOGOUT' }
    | { type: 'CLEAR_ERROR' }
    | { type: 'SET_LOADING'; payload: boolean };

interface AuthContextType extends AuthState {
    // eslint-disable-next-line no-unused-vars
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    checkAuth: () => Promise<void>;
    getAccessToken: () => string | null; // 🆕 Add getAccessToken method
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'AUTH_FAILURE':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };
        case 'AUTH_LOGOUT':
            return {
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const queryClient = useQueryClient();


    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async (): Promise<void> => {
        try {
            if (!authAPI.isAuthenticated()) {
                dispatch({ type: 'AUTH_LOGOUT' });
                queryClient.clear();
                return;
            }

            const user = await authAPI.getCurrentUser();
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } catch (error) {
            console.error('Auth check failed:', error);
            dispatch({ type: 'AUTH_LOGOUT' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        dispatch({ type: 'AUTH_START' });

        try {
            const response = await authAPI.login({ email, password });
            dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
            queryClient.invalidateQueries();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
            throw error;
        }
    };

const logout = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
        // Clear stored tokens
        tokenManager.clearTokens(); // implement this to remove access & refresh tokens
        dispatch({ type: 'AUTH_LOGOUT' });
        queryClient.clear();

    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
    }
};


    const clearError = (): void => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // 🆕 Add getAccessToken method
    const getAccessToken = (): string | null => {
        return tokenManager.getAccessToken();
    };

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        clearError,
        checkAuth,
        getAccessToken, // 🆕 Include in context value
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};