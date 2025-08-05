"use client";
import { use, useState } from "react";
import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";
import ProfessionalFilters from "@/components/home-services/homepage/professional/ProfessionalFilters";
import SubCategoryServices from "@/components/home-services/sub-categories/SubCategegoryServices";
import AllCategories from "@/components/home-services/homepage/AllCategories";

interface ServicesInterface {
  id: string;
  title: string;
  text: string;
  season: string;
  imageUrl: string;
}

export default function SubCategoryServicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ id: string }>;
}) {
  const { name } = use(params);
  const { id } = use(searchParams);
  console.log(id);

  const [showFilters, setShowFilters] = useState(false); // For mobile filter toggle
  const decodedName = decodeURIComponent(name);

  const services: ServicesInterface[] = [
    {
      id: "1",
      title: "House cleaning",
      text: "Cleaning kitchen and rooms with yard and lawn",
      season: "summer",
      imageUrl: "/assets/home-service/service (1).jpg",
    },
    {
      id: "2",
      title: "Carpet cleaning",
      text: "Cleaning carpet with providing extra service on housing",
      season: "summer",
      imageUrl: "/assets/home-service/service (2).jpg",
    },
    {
      id: "3",
      title: "Lawn trimming & cleaning",
      text: "Maintaining lawn with trimming and beautification",
      season: "spring",
      imageUrl: "/assets/home-service/service (3).jpg",
    },
    {
      id: "4",
      title: "Interior painting",
      text: "Design with paint and color mixing according to your desire",
      season: "fall",
      imageUrl: "/assets/home-service/service (4).jpg",
    },
    {
      id: "5",
      title: "Roofing",
      text: "Maintain and install quality roof to keep you safe and warm",
      season: "winter",
      imageUrl: "/assets/home-service/service (5).jpg",
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <Breadcrumbs
          paths={[
            { name: "Home", href: "/" },
            { name: "Home Services", href: "/home-services" },
            { name: decodedName },
          ]}
        />

        <div className="mt-6 md:mt-10">
          <div className="space-y-2 mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold">
              {decodedName} Near you in Location
            </h1>
            <p className="py-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Need repair or technical support? Whether it&apos;s a quick fix or
              ongoing maintenance, keeping your devices and equipment running
              smoothly starts with expert help. Choose from trusted providers
              and get the support you need for less.
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
            <div className="flex-1 md:flex-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service) => (
                <SubCategoryServices key={service.id} service={service} />
              ))}
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <AllCategories />
          </div>
        </div>
      </div>
    </div>
  );
}
