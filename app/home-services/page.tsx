"use client";
import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";
import PopularSearch from "@/components/home-services/homepage/PopularSearch";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import PopularLocation from "@/components/home-services/homepage/PopularLocation";
import { useEffect, useState } from "react";
import {
  getFeaturedServices,
  getPopularServices,
  getSubcategoriesServices,
} from "../api/homepage/popularService";
import {
  ServiceType,
  SubcategoryWithServicesType,
} from "@/types/service/services";

// Skeleton components
const TitlePageSkeleton = () => (
  <div className="w-full h-60 md:h-72 lg:h-80 xl:h-96 bg-gray-200 dark:bg-gray-800 animate-pulse" />
);

const CategorySkeleton = () => (
  <div className="my-10 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-56">
            <Skeleton className="h-40 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeaturedServicesSkeleton = () => (
  <div className="mt-10 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32 mt-2 sm:mt-0" />
      </div>

      {/* Carousel skeleton */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] sm:w-[calc(25%-18px)] lg:w-[calc(25%-18px)] snap-center"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View all button skeleton */}
      <div className="flex justify-center items-center mt-5">
        <Skeleton className="w-56 h-10 rounded-full" />
      </div>
    </div>
  </div>
);

const TitlePage = dynamic(
  () => import("@/components/home-services/homepage/TitlePage"),
  {
    loading: () => <TitlePageSkeleton />,
  }
);

const PopularServices = dynamic(
  () => import("@/components/home-services/homepage/PopularServices"),
  {
    loading: () => <CategorySkeleton />,
    ssr: false,
  }
);

const FeaturedServices = dynamic(
  () => import("@/components/home-services/homepage/FeaturedServices"),
  {
    loading: () => <FeaturedServicesSkeleton />,
    ssr: false,
  }
);

const CategoryServices = dynamic(
  () => import("@/components/home-services/homepage/CategoryServices"),
  {
    loading: () => <CategorySkeleton />,
    ssr: false,
  }
);

const AllCategories = dynamic(
  () => import("@/components/home-services/homepage/AllCategories"),
  {
    loading: () => <CategorySkeleton />,
    ssr: false,
  }
);

const HomeServicesPage = () => {
  const [popularServices, setPopularServices] = useState<ServiceType[]>([]);
  const [subcategoryServices, setSubcategoryServices] = useState<
    SubcategoryWithServicesType[]
  >([]);
  const [featuredServices, setFeaturedServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState({
    popular: true,
    subcategories: true,
    featured: true,
    all: true,
  });

  const fetchPopularServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, popular: true }));
      const services = await getPopularServices();
      setPopularServices(services?.data || []);
    } catch (error) {
      console.log("Error fetching popular services: ", error);
      setPopularServices([]);
    } finally {
      setLoading((prev) => ({ ...prev, popular: false }));
    }
  };

  const fetchSubcategoryService = async () => {
    try {
      setLoading((prev) => ({ ...prev, subcategories: true }));
      const response = await getSubcategoriesServices();
      setSubcategoryServices(response || []);
    } catch (error) {
      console.log("Error getting Services: ", error);
      setSubcategoryServices([]);
    } finally {
      setLoading((prev) => ({ ...prev, subcategories: false }));
    }
  };

  const fetchFeaturedServices = async () => {
    try {
      setLoading((prev) => ({ ...prev, featured: true }));
      const response = await getFeaturedServices();
      setFeaturedServices(response?.data || []);
    } catch (error) {
      console.log("Error fetching featured services: ", error);
      setFeaturedServices([]);
    } finally {
      setLoading((prev) => ({ ...prev, featured: false }));
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading({
        popular: true,
        subcategories: true,
        featured: true,
        all: true,
      });

      try {
        await Promise.all([
          fetchPopularServices(),
          fetchSubcategoryService(),
          fetchFeaturedServices(),
        ]);
      } catch (error) {
        console.log("Error fetching all data: ", error);
      } finally {
        setLoading((prev) => ({ ...prev, all: false }));
      }
    };

    fetchAllData();
  }, []);

  // Check if any data is still loading
  /* eslint-disable no-unused-vars */
  const isLoading =
    loading.popular || loading.subcategories || loading.featured;
  /* eslint-enable no-unused-vars */

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-white dark:border-gray-900">
      <Breadcrumbs
        paths={[{ name: "Home", href: "/" }, { name: "Home Services" }]}
      />

      <TitlePage />

      {/* Show skeleton while loading or component when data is ready */}
      {loading.popular ? (
        <CategorySkeleton />
      ) : (
        <PopularServices popularServices={popularServices} />
      )}

      {/* Show skeleton while loading or component when data is ready */}
      {loading.featured ? (
        <FeaturedServicesSkeleton />
      ) : (
        <FeaturedServices featuredServices={featuredServices} />
      )}

      {/* Show skeleton while loading or component when data is ready */}
      {loading.subcategories ? (
        <CategorySkeleton />
      ) : (
        <CategoryServices subcategoryService={subcategoryServices} />
      )}

      {/* AllCategories and other components that don't depend on API data */}
      <AllCategories />
      <PopularLocation />
      <PopularSearch />
    </div>
  );
};

export default HomeServicesPage;
