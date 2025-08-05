"use client";

import { useState } from "react";
import Service from "@/components/common/Service";
import { Service as TypeService } from "@/types/services";
import { trendingOffers } from "@/data/dummy";


export default function Trending() {
  const [visibleCount, setVisibleCount] = useState(12);
  const itemsPerLoad = 12;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + itemsPerLoad, trendingOffers.length));
  };

  const hasMoreItems = visibleCount < trendingOffers.length;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-cols-2 items-stretch">
          {trendingOffers.slice(0, visibleCount).map((offer, idx) => (
            <Service key={idx} offer={offer as TypeService} />
          ))}
        </div>
        
        {hasMoreItems && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}