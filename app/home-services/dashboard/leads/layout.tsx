// app/layout.tsx (or your root layout file)
import { GoogleMapsProvider } from "@/components/home-services/dashboard/leads/GoogleMapProvider";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <GoogleMapsProvider>
                {children}
            </GoogleMapsProvider>
        </>
    );
}
