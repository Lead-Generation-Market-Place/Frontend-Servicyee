"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfessionalList from "@/components/home-services/homepage/professional/ProfessionalList";

interface Professional {
  id: string;
  company: string; // Changed from name to company
  service: string;
  rating: number;
  services: string[];
  zipCodes: string[];
  distance?: number;
  guarantee: boolean;
  employee_count: number;
  total_hires: number;
  founded: number;
  background_check: boolean;
  status: string;
  description: string;
  imageUrl: string; // Added imageUrl
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedResults = sessionStorage.getItem("searchResults");
    if (savedResults) {
      const { professionals } = JSON.parse(savedResults);
      setProfessionals(professionals);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setError("No search results found. Please try a new search.");
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {professionals.length} Professionals for {searchParams.get("query")}
        in {searchParams.get("zip")}
      </h1>

      {professionals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No professionals found matching your criteria.
          </p>
        </div>
      ) : (
        <ProfessionalList professionals={professionals} />
      )}
    </div>
  );
}
