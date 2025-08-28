// global.d.ts
/// <reference types="@types/google.maps" />
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

export default function MyGoogleMap() {
  // Grab the API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in environment variables.');
  }

  // Load the Google Maps scripts, including the "places" library for autocomplete
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  // State for center position of the map and marker
  const [center, setCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  // Reference for the autocomplete search box
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Try to get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          setMarkerPosition(userLocation);
        },
        () => {
          console.warn('Geolocation permission denied or unavailable.');
        }
      );
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  // When a place is selected from the autocomplete search box
  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry?.location) {
          const newPos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setCenter(newPos);
          setMarkerPosition(newPos);
        }
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Autocomplete search box */}
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `40px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0,0,0,0.3)`,
            fontSize: `16px`,
            position: 'absolute',
            top: '10px',
            left: '50%',
            marginLeft: '-120px',
            zIndex: 10,
          }}
        />
      </StandaloneSearchBox>

      {/* The Google Map itself */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={(e) => {
          const clickedLocation = {
            lat: e.latLng?.lat() ?? center.lat,
            lng: e.latLng?.lng() ?? center.lng,
          };
          setMarkerPosition(clickedLocation);
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}
