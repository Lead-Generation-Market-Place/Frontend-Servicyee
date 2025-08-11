"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProfessionalList from "@/components/home-services/homepage/professional/ProfessionalList";
import SearchLoading from "@/components/home-services/homepage/elements/SearchLoader"; // Create this component
import ServiceQuestion from "@/components/home-services/question/ServiceQuestion";

interface Professional {
  id: number;
  company: string;
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
  imageUrl: string;
}

// This component needs to be wrapped in Suspense
function SearchResultsContent() {
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
    return <SearchLoading />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-xl font-bold mb-6">
          {professionals.length} Professionals for {searchParams.get("query")}
          &nbsp; in {searchParams.get("zip")}
        </h1>

        <div className="flex flex-row gap-2">
          <div className="flex-3">
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
          <div className="flex-1">
            <ServiceQuestion serviceId={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps the content in Suspense
export default function SearchResults() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResultsContent />
    </Suspense>
  );
}
