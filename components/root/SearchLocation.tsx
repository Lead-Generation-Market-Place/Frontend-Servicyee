'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa';
import { useFetchCurrentLocation } from '../../hooks/mutations/useFetchCurrentLocation'; // مسیر را متناسب با پروژه خود تنظیم کنید

const Location = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [location, setLocation] = useState('Current Location');
  const [locations] = useState([
     'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ]);

  const locationRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
      setShowLocation(false);
    }
  };

  
  const {
  mutate: fetchCurrentLocation,
  data,
  error,
  isError,
  isPending,
} = useFetchCurrentLocation();
useEffect(() => {

  fetchCurrentLocation();
  document.addEventListener('mousedown', handleClickOutside);

  if (data?.location) {
    setLocation(data.location);
  }

  if (isError) {
    alert(`Error: ${error?.message}`);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [fetchCurrentLocation, data, isError, error]);



  return (
    <div className="relative flex-shrink-0 w-1/4 dark:border-gray-700" ref={locationRef}>
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-sm dark:text-gray-300 focus:outline-none"
        onClick={() => setShowLocation(!showLocation)}
        disabled={isPending}
      >
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-[#0077B6] dark:text-[#48CAE4]" />
          <span className="truncate">{isPending ? 'Detecting location...' : location}</span>
        </div>
        <FaChevronDown className="ml-2 text-xs" />
      </button>
{showLocation && (
  <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 rounded-[4px] shadow-lg border border-gray-200 dark:border-gray-700 py-1 max-h-96 overflow-y-auto">
    <div className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">Select Location</div>


    {locations.map((state) => (
      <button
        key={state}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => {
          if (state === 'Current Location') {
            fetchCurrentLocation();
          } else {
            setLocation(state);
          }
          setShowLocation(false);
        }}
      >
        {state}
      </button>
    ))}
  </div>
)}
    </div>
  );
};
export default Location;