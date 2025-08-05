"use client";
import React from "react";
import {
  ChevronDown,
  LandPlot,
  MapPinPlus,
  ArrowDownWideNarrow,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProfessionalFiltersProps {
  selectedMile: string | null;
  setSelectedMile: (mile: string | null) => void; // Fixed type
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  expandedFilter: string | null;
  setExpandedFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ProfessionalFilters({
  selectedMile,
  setSelectedMile,
  selectedLocations,
  setSelectedLocations,
  expandedFilter,
  setExpandedFilter,
}: ProfessionalFiltersProps) {
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const toggleFilter = (filter: string) => {
    setExpandedFilter((prev) => (prev === filter ? null : filter));
  };

  const handleMileSelect = (mile: string) => {
    setSelectedMile(selectedMile === mile ? null : mile); // Toggle selection
  };

  return (
    <div className="flex-1 w-full p-4 rounded-lg shadow-md transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-200 border">
      <div className="mb-6 mt-4 flex flex-row items-center justify-start gap-2 font-bold text-lg border-b border-gray-100 dark:border-gray-800">
        <ArrowDownWideNarrow className="w-5 h-5" />
        <p>Filters</p>
      </div>

      {/* Distance Filter */}
      <div
        className="mb-4 cursor-pointer"
        onClick={() => toggleFilter("distance")}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center justify-start gap-2 text-md text-gray-500 dark:text-gray-200 font-medium">
            <LandPlot className="w-4 h-4" />
            <p>Distance</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform text-gray-500 dark:text-gray-200 ${
              expandedFilter === "distance" ? "rotate-180" : ""
            }`}
          />
        </div>
        <AnimatePresence>
          {expandedFilter === "distance" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 mt-2 pl-2 text-gray-500 dark:text-gray-200 text-xs">
                {["134 miles", "1400 miles", "987 miles"].map((mile) => {
                  const inputId = `mile-${mile.replace(/\s+/g, "-")}`;
                  return (
                    <div
                      key={mile}
                      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                        selectedMile === mile
                          ? "dark:bg-blue-900 bg-blue-100"
                          : "dark:hover:bg-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMileSelect(mile);
                      }}
                    >
                      <input
                        type="radio"
                        name="mile"
                        id={inputId}
                        checked={selectedMile === mile}
                        className="mr-2"
                        readOnly
                      />
                      <label htmlFor={inputId} className="cursor-pointer">
                        Within {mile}
                      </label>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Location Filter */}
      <div
        className="mb-4 cursor-pointer"
        onClick={() => toggleFilter("location")}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center justify-start gap-2 text-md text-gray-500 dark:text-gray-200 font-medium">
            <MapPinPlus className="w-4 h-4" />
            <p>Location</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform text-gray-500 dark:text-gray-200 ${
              expandedFilter === "location" ? "rotate-180" : ""
            }`}
          />
        </div>
        <AnimatePresence>
          {expandedFilter === "location" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 mt-2 pl-2 text-gray-500 dark:text-gray-200 text-xs">
                {["Los Angeles", "Chicago", "New York", "Houston"].map(
                  (location) => (
                    <div
                      key={location}
                      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                        selectedLocations.includes(location)
                          ? "dark:bg-blue-900 bg-blue-100"
                          : "dark:hover:bg-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLocation(location);
                      }}
                    >
                      <input
                        type="checkbox"
                        id={location}
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                        className="mr-2"
                      />
                      <label htmlFor={location} className="cursor-pointer">
                        {location}
                      </label>
                    </div>
                  )
                )}
                <Link
                  href="#"
                  className="text-sm text-blue-500 hover:underline block mt-2"
                >
                  See more
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
