"use client";
import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";
import PopularSearch from "@/components/home-services/homepage/PopularSearch";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import PopularLocation from "@/components/home-services/homepage/PopularLocation";
import { useEffect, useState } from "react";
import { getPopularServices } from "../api/homepage/popularService";
import { ServiceType } from "@/types/service/services";

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
    loading: () => <CategorySkeleton />,
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
  const [loading, setLoading] = useState(true);

  const fetchPopularServices = async () => {
    try {
      setLoading(true);
      const services = await getPopularServices();
      setPopularServices(services?.data || []);
    } catch (error) {
      console.log("Error fetching popular services: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularServices();
  }, []);

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-white dark:border-gray-900">
      <Breadcrumbs
        paths={[{ name: "Home", href: "/" }, { name: "Home Services" }]}
      />

      <TitlePage />

      {!loading && <PopularServices popularServices={popularServices} />}

      <FeaturedServices />
      <CategoryServices />
      <AllCategories />
      <PopularLocation />
      <PopularSearch />
    </div>
  );
};

export default HomeServicesPage;
