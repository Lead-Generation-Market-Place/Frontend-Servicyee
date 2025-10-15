"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
// import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";
import ProfessionalFilters from "@/components/home-services/homepage/professional/ProfessionalFilters";
import SubCategoryServices from "@/components/home-services/sub-categories/SubCategegoryServices";
import AllCategories from "@/components/home-services/homepage/AllCategories";
import { getSubcategoryServicesBySlug } from "@/app/api/homepage/popularService";

import { getSubcategoryStaticURL } from "@/app/api/axios";

interface ServiceType {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_active: boolean;
  is_featured: boolean;
}

interface SubcategoryDataType {
  _id: string;
  name: string;
  slug: string;
  subcategory_image_url: string;
  services: ServiceType[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: SubcategoryDataType;
}

export default function SubCategoryServicesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  /* eslint-disable no-unused-vars */
  const [slug, setSlug] = useState<string>("");
  const [decodedSlug, setDecodedSlug] = useState<string>("");
  /* eslint-enable no-unused-vars */
  const [showFilters, setShowFilters] = useState(false);
  const [subcategoryData, setSubcategoryData] =
    useState<SubcategoryDataType | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = getSubcategoryStaticURL();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const currentSlug = resolvedParams.slug;

        console.log("Fetching data for slug:", currentSlug);

        // Update state
        setSlug(currentSlug);
        setDecodedSlug(decodeURIComponent(currentSlug));

        // Fetch API data
        const response: ApiResponse = await getSubcategoryServicesBySlug(
          currentSlug
        );

        if (response.success && response.data) {
          setSubcategoryData(response.data);
        } else {
          console.log("No data found for this subcategory");
        }
      } catch (error) {
        console.log("Error in fetchData:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>

            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subcategoryData) {
    return (
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Subcategory Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              The requested subcategory could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const heroImageUrl = subcategoryData.subcategory_image_url
    ? `${API_BASE_URL}/${subcategoryData.subcategory_image_url}`
    : "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80";

  console.log("Hero image URL:", heroImageUrl);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-60 md:h-76 lg:h-[400px] w-full overflow-hidden mb-4">
        {/* Background Image using Next.js Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt={subcategoryData.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80";
            }}
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {subcategoryData.name}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
            Professional {subcategoryData.name.toLowerCase()} services for your
            home
          </p>

          {/* Services Count Badge */}
          <div className="absolute bottom-8">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {subcategoryData.services.length} Services Available
            </span>
          </div>
        </div>
      </section>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-5">
            {/* <Breadcrumbs
            paths={[
              { name: "Home", href: "/" },
              { name: "Home Services", href: "/home-services" },
              { name: subcategoryData.name },
            ]}
          /> */}

            <div className="">
              <div className="space-y-2 mb-4 md:mb-6">
                <h1 className="text-xl md:text-2xl font-bold capitalize">
                  {subcategoryData.name} Services Near You
                </h1>
                <p className="py-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                  Need repair or technical support? Whether it&apos;s a quick
                  fix or ongoing maintenance, keeping your devices and equipment
                  running smoothly starts with expert help. Choose from trusted
                  providers and get the support you need for less.
                </p>
              </div>

              {/* Mobile filter toggle button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden mb-4 w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between"
              >
                <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Filters - hidden on mobile unless toggled */}
                <div
                  className={`${
                    showFilters ? "block" : "hidden"
                  } md:block md:flex-1`}
                >
                  <ProfessionalFilters />
                </div>

                {/* Services grid */}
                <div className="flex-1 md:flex-3">
                  {subcategoryData.services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {subcategoryData.services.map((service) => (
                        <SubCategoryServices
                          key={service._id}
                          service={{
                            id: service._id,
                            title: service.name,
                            slug: service.slug,
                            text: service.description,
                            season: "all",
                            imageUrl: service.image_url,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        No services available for this category yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 md:mt-12">
                <AllCategories />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
