// components/public-route.tsx
"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import GlobalLoader from '@/components/ui/global-loader';

interface PublicRouteProps {
    children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
    children,
}) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/home-services/dashboard/profile';

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push(redirect);
        }
    }, [isAuthenticated, isLoading, router, redirect]);

    if (isLoading) {
        return <GlobalLoader />;

    }

    if (isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
};