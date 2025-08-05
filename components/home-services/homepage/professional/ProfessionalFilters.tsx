"use client";
import React from "react";
import {
  ChevronDown,
  LandPlot,
  MapPinPlus,
  ArrowDownWideNarrow,
} from "lucide-react";
import Link from "next/link";

export default function ProfessionalFilters() {
  return (
    <div className="flex-1 w-full p-4 rounded-lg shadow-md bg-white border border-gray-200">
      <div className="mb-6 mt-4 flex flex-row items-center justify-start gap-2 font-bold text-lg border-b border-gray-100">
        <ArrowDownWideNarrow className="w-5 h-5" />
        <p>Filters</p>
      </div>

      {/* Distance Filter */}
      <div className="mb-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center justify-start gap-2 text-md text-gray-500 font-medium">
            <LandPlot className="w-4 h-4" />
            <p>Distance</p>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center justify-start gap-2 text-md text-gray-500 font-medium">
            <MapPinPlus className="w-4 h-4" />
            <p>Location</p>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Sample Filter Options (Visible by default for demo) */}
      <div className="space-y-2 mt-2 pl-2 text-gray-500 text-xs">
        <div className="flex items-center p-2 rounded-md cursor-pointer bg-blue-100">
          <input type="radio" name="mile" id="mile-134" className="mr-2" />
          <label htmlFor="mile-134" className="cursor-pointer">
            Within 134 miles
          </label>
        </div>
        <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100">
          <input type="radio" name="mile" id="mile-1400" className="mr-2" />
          <label htmlFor="mile-1400" className="cursor-pointer">
            Within 1400 miles
          </label>
        </div>

        <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100">
          <input type="checkbox" id="los-angeles" className="mr-2" />
          <label htmlFor="los-angeles" className="cursor-pointer">
            Los Angeles
          </label>
        </div>
        <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100">
          <input type="checkbox" id="new-york" className="mr-2" />
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
    </div>
  );
}
