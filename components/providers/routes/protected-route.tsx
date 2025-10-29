// components/protected-route.tsx
"use client";
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import GlobalLoader from '@/components/ui/global-loader';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only redirect when loading is complete and user is not authenticated
        if (!isLoading && !isAuthenticated) {
            // Store the attempted URL for redirecting after login
            const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
            router.push(redirectUrl);
        }
    }, [isAuthenticated, isLoading, router, pathname]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <GlobalLoader></GlobalLoader>
        );
    }

    // If not authenticated, don't render anything (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    // If authenticated, render the protected content
    return <>{children}</>;
};