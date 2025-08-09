"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, SquareMousePointer, Search, MapPin } from "lucide-react";

interface SearchBarProps {
  serviceQuery: string;
  /*eslint-disable no-unused-vars */
  setServiceQuery: (value: string) => void;
  setZipCode: (value: string) => void;
  /*eslint-enable no-unused-vars */
  zipCode: string;
  handleSearch: () => void;
  isLoading: boolean;
  isCompact?: boolean;
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
      delay: 0.5,
    },
  },
};

const SearchBar: React.FC<SearchBarProps> = ({
  serviceQuery,
  setServiceQuery,
  zipCode,
  setZipCode,
  handleSearch,
  isLoading,
  isCompact = false,
}) => {
  const sizeClasses = isCompact ? "h-12" : "h-14";
  const iconSize = isCompact ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 w-full ${
        !isCompact
          ? "bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-lg p-1"
          : ""
      }`}
    >
      <div className="relative flex-1 min-w-[200px]">
        <Input
          placeholder="What service do you need?"
          value={serviceQuery}
          onChange={(e) => setServiceQuery(e.target.value)}
          className={`w-full ${sizeClasses} pl-12 pr-4 ${
            isCompact
              ? "bg-white dark:bg-gray-900"
              : "bg-white dark:bg-gray-900"
          } focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-600 border border-gray-200 dark:border-gray-700`}
        />
        <Search
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${iconSize} text-gray-500 dark:text-gray-400`}
        />
      </div>
      <div className="relative w-full sm:w-[160px]">
        <Input
          placeholder="Zip code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className={`w-full ${sizeClasses} pl-10 pr-4 bg-white dark:bg-gray-900
          focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-600 border border-gray-200 dark:border-gray-700`}
        />
        <MapPin
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconSize} text-gray-500 dark:text-gray-400`}
        />
      </div>
      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className={`${sizeClasses} px-6 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 w-full sm:w-auto`}
      >
        {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Search"}
      </Button>
    </div>
  );
};
const TitlePage = () => {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    console.log(`Searching for ${serviceQuery} in ${zipCode || userLocation}`);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleZipCodeChange = async (zip: string) => {
    setZipCode(zip);
    setError("");

    if (zip.match(/^\d{5}$/)) {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (!response.ok) throw new Error("Location not found");

        const data = await response.json();
        const city = data.places[0]["place name"];
        const state = data.places[0]["state abbreviation"];
        setUserLocation(`${city}, ${state}`);
      } catch (err) {
        setError("Failed to find location for this zip code");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const setCurrentLocation = () => {
    setIsLoading(true);
    setError("");

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
            setError("Failed to determine your location");
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          setError("Please enable location permissions");
          console.log(error);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  };

  const userDefaultLocation = "Los Angeles, CA";

  return (
    <>
      {/* Persistent Search Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 py-3 px-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="max-w-6xl mx-auto">
              <SearchBar
                serviceQuery={serviceQuery}
                setServiceQuery={setServiceQuery}
                zipCode={zipCode}
                setZipCode={setZipCode}
                handleSearch={handleSearch}
                isLoading={isLoading}
                isCompact={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="w-full relative overflow-hidden min-h-[70vh] flex items-center justify-center pt-20">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-sky-800 to-sky-900 dark:from-sky-600 dark:via-sky-800 dark:to-sky-900"></div>

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8">
            {/* Title */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="show"
              className="text-white dark:text-gray-100"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                whileHover={{
                  x: 5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <div>
                  <span>Find the Best Home Service in </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="cursor-pointer focus-visible:outline-none border-b-2 border-dashed border-white dark:border-gray-300">
                        {userLocation ? (
                          <span>{userLocation}</span>
                        ) : (
                          <span className="flex flex-row gap-2 justify-center items-center">
                            <span>{userDefaultLocation}</span>
                            <SquareMousePointer className="w-6 h-6" />
                          </span>
                        )}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-md">
                      <DialogHeader>
                        <DialogTitle className="dark:text-white">
                          Set Your Location
                        </DialogTitle>
                        <DialogDescription className="dark:text-gray-400">
                          Enter your zip code or use your current location
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="zipcode"
                            className="block text-sm font-medium dark:text-gray-300"
                          >
                            US Zip Code
                          </label>
                          <div className="flex gap-2">
                            <Input
                              id="zipcode"
                              placeholder="Enter 5-digit zip code"
                              value={zipCode}
                              onChange={(e) =>
                                handleZipCodeChange(e.target.value)
                              }
                              className="flex-1 focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-600 dark:bg-gray-800 dark:border-gray-700"
                            />
                            {isLoading && (
                              <Loader2 className="animate-spin h-5 w-5" />
                            )}
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                              Or
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={setCurrentLocation}
                          disabled={isLoading}
                          className="w-full bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400"
                        >
                          {isLoading ? (
                            <Loader2 className="animate-spin mr-2" />
                          ) : (
                            <span>Use Current Location</span>
                          )}
                        </Button>
                        {error && (
                          <p className="text-sm text-red-500 dark:text-red-400">
                            {error}
                          </p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.h1>
            </motion.div>

            {/* Search Box - Hero Version */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-3xl"
            >
              <SearchBar
                serviceQuery={serviceQuery}
                setServiceQuery={setServiceQuery}
                zipCode={zipCode}
                setZipCode={(zip) => handleZipCodeChange(zip)}
                handleSearch={handleSearch}
                isLoading={isLoading}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TitlePage;
