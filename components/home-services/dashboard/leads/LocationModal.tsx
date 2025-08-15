/// <reference types="@types/google.maps" />
/* global google */

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Circle,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

interface LocationModalProps {
  onClose: () => void;
  onContinue: () => void;
  zip: string;
  milesRadius: number;
  center: { lat: number; lng: number };
}

const LocationModal: React.FC<LocationModalProps> = ({
  onClose,
  onContinue,
  zip,
  milesRadius,
  center: initialCenter,
}) => {
  const [radius, setRadius] = useState(milesRadius);
  const [postalCode, setPostalCode] = useState(zip);
  const [center, setCenter] = useState(initialCenter);
  const url = usePathname();
  const ViewMap = url.includes("home-services/dashboard/leads/leadSetting")
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: postalCode }, (results, status) => {
      if (
        status === "OK" &&
        results &&
        results.length > 0 &&
        results[0]?.geometry?.location
      ) {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
      }
    });
  }, [postalCode, isLoaded]);
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
  throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set!");
} else {
  console.log("Google Maps API key is present for build.");
}

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
        setPostalCode(place.formatted_address || "");
      }
    }
  };

  if (!isLoaded) return null;
  

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 sm:px-4 md:px-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-[4px] shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-xl max-h-[90vh] text-[12px] text-gray-700 dark:text-gray-200 overflow-y-auto"
      >
        {/* Header */}
        <div className="relative bg-[#0077B6] text-white p-5 rounded-t-[4px]">
          <h2 className="text-[13px] font-semibold leading-tight">Select a location</h2>
          <p className="text-[11px] opacity-90">Set your preferred area to find new customers</p>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-gray-300 focus:outline-none focus:ring-white rounded"
            aria-label="Close modal"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {ViewMap && (

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Postcode / City */}
              <div>
                <label className="block text-[11px] font-medium mb-1">
                  Postcode / City
                </label>
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autoCompleteRef.current = autocomplete;
                  }}
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter a postcode or city"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-sm px-3 py-2 text-[12px] focus:ring-[#0077B6] focus:border-[#0077B6]"
                  />
                </Autocomplete>
              </div>

              {/* Distance */}
              <div>
                <label className="block text-[11px] font-medium mb-2">
                  Distance: <span className="font-semibold">{radius} miles</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={300}
                  step={5}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full accent-[#0077B6]"
                />
              </div>
            </div>
          )}
          {/* Map Preview */}
          <div className="h-48 sm:h-56 w-full rounded-sm overflow-hidden border border-gray-300 dark:border-gray-700">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={center}
              zoom={radius > 100 ? 5 : radius > 100 ? 6 : 7}
              options={{
                disableDefaultUI: true,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }}
            >
              <Circle
                center={center}
                radius={radius * 1609.34}
                options={{
                  strokeColor: "#0077B6",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#0077B6",
                  fillOpacity: 0.2,
                  clickable: false,
                }}
              />
            </GoogleMap>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-b-sm border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 text-sm text-white bg-[#0077B6] hover:bg-[#005f8e] rounded-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
