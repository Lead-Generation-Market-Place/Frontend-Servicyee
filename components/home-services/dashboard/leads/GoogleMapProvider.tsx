// components/GoogleMapsProvider.tsx
"use client";

import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

// ✅ Use all libraries you might need across the app
const libraries = ["drawing", "places"] as (
  | "drawing"
  | "places"
)[];

interface GoogleMapsContextValue {
  isLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextValue | null>(null);

export const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
    id: "google-maps-script-loader", // ✅ make sure all use the same ID
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error("useGoogleMaps must be used within a GoogleMapsProvider");
  }
  return context;
};
