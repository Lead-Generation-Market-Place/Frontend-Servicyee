"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { SquareMousePointer } from "lucide-react";
import NoMatchDialog from "@/components/home-services/homepage/titleComponents/NoMatchDialog";
import LocationDialog from "@/components/home-services/homepage/titleComponents/LocationDialog";
import SearchBar from "@/components/home-services/homepage/titleComponents//SearchBar";

// Function to calculate similarity between two strings
const calculateSimilarity = (a: string, b: string): number => {
  const str1 = a.toLowerCase();
  const str2 = b.toLowerCase();

  if (str1.includes(str2)) return 1;
  if (str2.includes(str1)) return 1;

  const set1 = new Set(str1.split(" "));
  const set2 = new Set(str2.split(" "));
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
};
const MOCK_PROFESSIONALS = [
  {
    id: "1",
    company: "John's Plumbing", // Changed from name to company
    service: "Plumbing",
    rating: 4.8,
    services: ["Pipe Repair", "Leak Fixing", "Faucet Installation"],
    zipCodes: ["90001", "90002", "90003"],
    distance: 1.2,
    guarantee: true,
    employee_count: 24,
    total_hires: 15,
    founded: 2012,
    background_check: true,
    status: "Available",
    description:
      "Licensed plumbing services with 10 years of experience in residential and commercial properties.",
    imageUrl: "/assets/home-service/service (1).jpg", // Added imageUrl
  },
  {
    id: "2",
    company: "Electric Solutions", // Changed from name to company
    service: "Electrical",
    rating: 4.5,
    services: ["Wiring", "Outlet Installation", "Circuit Breaker"],
    zipCodes: ["90001", "90005"],
    distance: 0.8,
    guarantee: true,
    employee_count: 18,
    total_hires: 22,
    founded: 2015,
    background_check: true,
    status: "Available",
    description:
      "Certified electricians providing safe and efficient electrical solutions.",
    imageUrl: "/assets/home-service/service (2).jpg", // Added imageUrl
  },
  {
    id: "3",
    company: "Clean Home Services", // Changed from name to company
    service: "Cleaning",
    rating: 4.9,
    services: ["Deep Cleaning", "Carpet Cleaning", "Window Washing"],
    zipCodes: ["90002", "90004"],
    distance: 2.5,
    guarantee: true,
    employee_count: 42,
    total_hires: 35,
    founded: 2016,
    background_check: true,
    status: "Available",
    description:
      "Premium cleaning services using eco-friendly products and techniques.",
    imageUrl: "/assets/home-service/service (3).jpg", // Added imageUrl
  },
  {
    id: "4",
    company: "Quick Fix Handyman", // Changed from name to company
    service: "Handyman",
    rating: 4.3,
    services: ["Furniture Assembly", "Shelving", "Minor Repairs"],
    zipCodes: ["90001", "90003", "90005"],
    distance: 1.7,
    guarantee: false,
    employee_count: 8,
    total_hires: 12,
    founded: 2019,
    background_check: true,
    status: "Available",
    description:
      "Reliable handyman services for all your home maintenance needs.",
    imageUrl: "/assets/home-service/service (4).jpg", // Added imageUrl
  },
  {
    id: "5",
    company: "Green Thumb Landscaping", // Changed from name to company
    service: "Landscaping",
    rating: 4.7,
    services: ["Lawn Care", "Tree Trimming", "Garden Design"],
    zipCodes: ["90002", "90004", "90006"],
    distance: 3.1,
    guarantee: true,
    employee_count: 15,
    total_hires: 28,
    founded: 2014,
    background_check: true,
    status: "Available",
    description:
      "Professional landscaping services creating beautiful outdoor spaces.",
    imageUrl: "/assets/home-service/service (5).jpg", // Added imageUrl
  },
  {
    id: "6",
    company: "Green World", // Changed from name to company
    service: "Landscaping",
    rating: 4.7,
    services: ["Lawn Care", "Tree Trimming", "Garden Design"],
    zipCodes: ["90002", "90004", "90006"],
    distance: 3.1,
    guarantee: false,
    employee_count: 12,
    total_hires: 18,
    founded: 2017,
    background_check: true,
    status: "Available",
    description:
      "Sustainable landscaping solutions with native plants and eco-friendly practices.",
    imageUrl: "/assets/home-service/service (6).jpg", // Added imageUrl
  },
  {
    id: "7",
    company: "Green and Clean Globe", // Changed from name to company
    service: "Landscaping",
    rating: 4.7,
    services: ["Lawn Care", "Tree Trimming", "Garden Design"],
    zipCodes: ["90002", "90004", "90006"],
    distance: 3.1,
    guarantee: true,
    employee_count: 20,
    total_hires: 32,
    founded: 2013,
    background_check: true,
    status: "Available",
    description:
      "Full-service landscaping and garden maintenance with a focus on sustainability.",
    imageUrl: "/assets/home-service/service (7).jpg", // Added imageUrl
  },
  {
    id: "8",
    company: "Clark Construction", // Changed from name to company
    service: "Roofing",
    rating: 4.7,
    services: ["Roof installation", "Roof Repairing", "Roof Maintenance"],
    zipCodes: ["90002", "90004", "90006"],
    distance: 3.1,
    guarantee: true,
    employee_count: 20,
    total_hires: 32,
    founded: 2013,
    background_check: true,
    status: "Available",
    description:
      "Full-service landscaping and garden maintenance with a focus on sustainability.",
    imageUrl: "/assets/home-service/service (7).jpg", // Added imageUrl
  },
  {
    id: "9",
    company: "Brand Construction", // Changed from name to company
    service: "Roofing",
    rating: 4.7,
    services: ["Roof installation", "Roof Repairing", "Roof Maintenance"],
    zipCodes: ["90002", "90004", "90006"],
    distance: 3.1,
    guarantee: true,
    employee_count: 20,
    total_hires: 32,
    founded: 2013,
    background_check: true,
    status: "Available",
    description:
      "Full-service landscaping and garden maintenance with a focus on sustainability.",
    imageUrl: "/assets/home-service/service (7).jpg", // Added imageUrl
  },
];

// Extract all unique services for suggestions
const ALL_SERVICES = Array.from(
  new Set(MOCK_PROFESSIONALS.flatMap((pro) => pro.services))
);

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

const TitlePage = () => {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNoMatchDialog, setShowNoMatchDialog] = useState(false);
  const [suggestedServices, setSuggestedServices] = useState<string[]>([]);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [noServiceInZipCode, setNoServiceInZipCode] = useState(false);

  // Filter services based on input
  const filteredServices = ALL_SERVICES.filter((service) =>
    service.toLowerCase().includes(serviceQuery.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (selectedService?: string) => {
    setIsLoading(true);
    setError("");
    setShowSuggestions(false);
    setNoServiceInZipCode(false);
    setSuggestedServices([]);

    const searchTerm = selectedService || serviceQuery;

    // Validate inputs
    if (!searchTerm.trim()) {
      setError("Please enter a service");
      setIsLoading(false);
      return;
    }

    if (!zipCode.trim()) {
      setError("Please enter a zip code");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // 1. First check zip code validity
      const validZipCode = MOCK_PROFESSIONALS.some((pro) =>
        pro.zipCodes.includes(zipCode)
      );

      if (!validZipCode) {
        setNoServiceInZipCode(true);
        setShowNoMatchDialog(true);
        setIsLoading(false);
        return;
      }

      // 2. Check for exact service matches in this zip code
      const exactMatches = MOCK_PROFESSIONALS.filter(
        (pro) =>
          pro.zipCodes.includes(zipCode) &&
          pro.services.some((s) => s.toLowerCase() === searchTerm.toLowerCase())
      );

      if (exactMatches.length > 0) {
        // Found exact matches - proceed to results
        sessionStorage.setItem(
          "searchResults",
          JSON.stringify({
            query: searchTerm,
            zipCode,
            professionals: exactMatches.slice(0, 5),
          })
        );
        router.push(
          `/home-services/search?query=${encodeURIComponent(
            searchTerm
          )}&zip=${encodeURIComponent(zipCode)}`
        );
        setIsLoading(false);
        return;
      }

      // 3. No exact matches - find similar services
      const similarServices = ALL_SERVICES.map((service) => ({
        service,
        similarity: calculateSimilarity(searchTerm, service),
      }))
        .filter((item) => item.similarity > 0.3)
        .sort((a, b) => b.similarity - a.similarity)
        .map((item) => item.service)
        .slice(0, 5);

      if (similarServices.length > 0) {
        setSuggestedServices(similarServices);
        setNoServiceInZipCode(false);
        setShowNoMatchDialog(true);
      } else {
        setError("No matching services found");
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleZipCodeChange = (zip: string) => {
    setZipCode(zip);
    setError("");
  };

  const setCurrentLocation = () => {
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setUserLocation("Los Angeles, CA");
      setZipCode("90001");
      setIsLoading(false);
      setIsLocationDialogOpen(false);
    }, 800);
  };

  const handleServiceSuggestion = (service: string) => {
    setServiceQuery(service);
    setShowNoMatchDialog(false);
    handleSearch(service);
  };

  const userDefaultLocation = "Los Angeles, CA";

  return (
    <>
      <NoMatchDialog
        open={showNoMatchDialog}
        onOpenChange={setShowNoMatchDialog}
        suggestedServices={suggestedServices}
        onServiceSelect={handleServiceSuggestion}
        noServiceInZipCode={noServiceInZipCode}
        zipCode={zipCode}
      />
      <LocationDialog
        open={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
        zipCode={zipCode}
        onZipCodeChange={handleZipCodeChange}
        onSetCurrentLocation={setCurrentLocation}
        isLoading={isLoading}
        error={error}
      />

      {/* Persistent Search Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
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
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                filteredServices={filteredServices}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="w-full relative min-h-[80vh] flex items-center justify-center pt-20">
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
                  <button
                    onClick={() => setIsLocationDialogOpen(true)}
                    className="cursor-pointer focus-visible:outline-none border-b-2 border-dashed border-white dark:border-gray-300"
                  >
                    {userLocation ? (
                      <span>{userLocation}</span>
                    ) : (
                      <span className="flex flex-row gap-2 justify-center items-center">
                        <span>{userDefaultLocation}</span>
                        <SquareMousePointer className="w-6 h-6" />
                      </span>
                    )}
                  </button>
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
                setZipCode={handleZipCodeChange}
                handleSearch={handleSearch}
                isLoading={isLoading}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                filteredServices={filteredServices}
              />
              {error && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                  {error}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitlePage;
