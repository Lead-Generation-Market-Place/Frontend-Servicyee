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
        if (!isLoading && !isAuthenticated) {
            const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
            router.push(redirectUrl);
        }
    }, [isAuthenticated, isLoading, router, pathname]);

    if (isLoading) {
        return (
            <GlobalLoader></GlobalLoader>
        );
    }
    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
};