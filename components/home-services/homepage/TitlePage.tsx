'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, SquareMousePointer } from 'lucide-react';


const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 10,
      delay: 0.5
    }
  }
};

const TitlePage = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLocationFromZip = async () => {
    if (!zipCode.match(/^\d{5}$/)) {
      setError('Please enter a valid 5-digit US zip code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (!response.ok) throw new Error('Location not found');
      
      const data = await response.json();
      const city = data.places[0]['place name'];
      const state = data.places[0]['state abbreviation'];
      setUserLocation(`${city}, ${state}`);
    } catch (err) {
      setError('Failed to find location for this zip code');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrentLocation = () => {
    setIsLoading(true);
    setError('');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town;
            const state = data.address.state;
            setUserLocation(`${city}, ${state}`);
          } catch (err) {
            setError('Failed to determine your location');
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          setError('Please enable location permissions');
          console.log(error);
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  };
  const userDefaultLocation = "Los Angeles, CA"
  return (
    <div className="w-full bg-[url('/assets/home-service/home-service-title-image.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Gradient overlay and background elements... */}

      <div className="relative w-full h-60 md:h-72 lg:h-80 xl:h-66 py-10 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
          {/* Title */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="show"
            className="text-white"
          >
            <motion.h1 
              className="text-xl sm:text-4xl md:text-xl lg:text-2xl font-bold leading-tight max-w-4xl"
              whileHover={{ 
                x: 5,
                transition: { type: "spring" as const, stiffness: 300 }
              }}
            >
              <div className="">
                <span>Find the Best Home Service in </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="cursor-pointer focus-visible:outline-none border-b-2 border-dashed border-white">
                      {userLocation ? (
                        <span >{userLocation}</span>
                      ) : (
                        <span className="flex flex-row gap-2 justify-start items-center">
                          <span>{userDefaultLocation}</span>
                          <SquareMousePointer className='w-6 h-6'/>
                        </span>
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-md">
                    <DialogHeader>
                      <DialogTitle>Set Your Location</DialogTitle>
                      <DialogDescription>
                        Enter your zip code or use your current location
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="zipcode" className="block text-sm font-medium">
                          US Zip Code
                        </label>
                        <div className="flex gap-2">
                          <Input
                            id="zipcode"
                            placeholder="Enter 5-digit zip code"
                            value={zipCode}
                            onChange={(e) => {
                              setZipCode(e.target.value);
                              setError('');
                            }}
                            className="flex-1 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-sky-600 dark:focus-visible:ring-offset-gray-900"
                          />
                          <Button 
                            onClick={fetchLocationFromZip}
                            disabled={isLoading}
                            className='bg-sky-500 hover:bg-sky-600 text-white cursor-pointer'
                          >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Search'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                            Or
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={setCurrentLocation}
                        disabled={isLoading}
                        className="w-full bg-green-100 text-green-500"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin mr-2" />
                        ) : (
                          <span>Use Current Location</span>
                        )}
                      </Button>
                      
                      {error && (
                        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.h1>
            
            {/* Animated underline... */}
          </motion.div>
          
          {/* Floating decorative elements... */}
        </div>
      </div>
    </div>
  );
};
export default TitlePage;