"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LandPlot,
  MapPinPlus,
  ArrowDownWideNarrow,
} from "lucide-react";
import Link from "next/link";

export default function ProfessionalFilters() {
  const [expandedFilters, setExpandedFilters] = useState({
    distance: false,
    location: false,
  });
  const [distance, setDistance] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);

  const toggleFilter = (filterName: "distance" | "location") => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setLocations((prev) =>
      e.target.checked
        ? [...prev, location]
        : prev.filter((loc) => loc !== location)
    );
  };

  return (
    <div className="flex-1 w-full p-4 bg-white">
      <div className="mb-6 mt-4 flex flex-row items-center justify-start gap-2 font-bold text-lg border-b border-gray-100">
        <ArrowDownWideNarrow className="w-5 h-5" />
        <p>Filters</p>
      </div>

      {/* Distance Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleFilter("distance")}
        >
          <div className="flex flex-row items-center justify-start gap-2 text-md text-gray-500 font-medium">
            <LandPlot className="w-4 h-4" />
            <p>Distance</p>
          </div>
          {expandedFilters.distance ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {expandedFilters.distance && (
          <div className="space-y-2 mt-2 pl-6 text-gray-500 text-sm">
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                distance === "134" ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="mile"
                id="mile-134"
                className="mr-2"
                value="134"
                checked={distance === "134"}
                onChange={handleDistanceChange}
              />
              <label htmlFor="mile-134" className="cursor-pointer">
                Within 134 miles
              </label>
            </div>
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                distance === "1400" ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="mile"
                id="mile-1400"
                className="mr-2"
                value="1400"
                checked={distance === "1400"}
                onChange={handleDistanceChange}
              />
              <label htmlFor="mile-1400" className="cursor-pointer">
                Within 1400 miles
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleFilter("location")}
        >
          <div className="flex flex-row items-center justify-start gap-2 text-md text-gray-500 font-medium">
            <MapPinPlus className="w-4 h-4" />
            <p>Location</p>
          </div>
          {expandedFilters.location ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {expandedFilters.location && (
          <div className="space-y-2 mt-2 pl-6 text-gray-500 text-sm">
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                locations.includes("los-angeles")
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                id="los-angeles"
                className="mr-2"
                value="los-angeles"
                checked={locations.includes("los-angeles")}
                onChange={handleLocationChange}
              />
              <label htmlFor="los-angeles" className="cursor-pointer">
                Los Angeles
              </label>
            </div>
            <div
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                locations.includes("new-york")
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                id="new-york"
                className="mr-2"
                value="new-york"
                checked={locations.includes("new-york")}
                onChange={handleLocationChange}
              />
              <label htmlFor="new-york" className="cursor-pointer">
                New York
              </label>
            </div>

            <Link
              href="#"
              className="text-sm text-blue-500 hover:underline block mt-2"
            >
              See more
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
