"use client";
import { MapPin } from "lucide-react";
import { use, useState } from "react";
import { motion } from "framer-motion";
import ProfessionalList from "@/components/home-services/homepage/professional/ProfessionalList";
import QuotationForm from "@/components/home-services/homepage/professional/QuotationForm";
import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";
import ServiceQuestion from "@/components/home-services/question/ServiceQuestion";

function ProfessionalTypeFilter({
  selectedType,
  onTypeChange,
}: {
  selectedType: string;
  /*eslint-disable no-unused-vars */
  onTypeChange: (type: string) => void;
  /* eslint-enable no-unused-vars */
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedType === "All"
            ? "bg-sky-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
        }`}
        onClick={() => onTypeChange("All")}
      >
        All Professionals
      </button>
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedType === "Company"
            ? "bg-sky-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
        }`}
        onClick={() => onTypeChange("Company")}
      >
        Companies
      </button>
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
          selectedType === "Handyman"
            ? "bg-sky-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
        }`}
        onClick={() => onTypeChange("Handyman")}
      >
        Handymen
      </button>
    </div>
  );
}

export default function ProfessionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [selectedType, setSelectedType] = useState<string>("All");

  const MOCK_PROFESSIONALS = [
    {
      id: 1,
      company: "John's Plumbing",
      type: "Company",
      service: "Plumbing",
      rating: 4.8,
      services: ["Pipe Repair", "Leak Fixing", "Faucet Installation"],
      zipCodes: ["90001", "90002", "90003"],
      distance: 1.2,
      guarantee: true,
      employee_count: 24,
      total_hires: 15,
      founded: 2012,
      background_check: true,
      status: "Available",
      description: "Licensed plumbing services with 10 years of experience.",
      imageUrl: "/assets/home-service/service (1).jpg",
    },
    {
      id: 2,
      company: "Electric Solutions",
      type: "Company",
      service: "Electrical",
      rating: 4.5,
      services: ["Wiring", "Outlet Installation", "Circuit Breaker"],
      zipCodes: ["90001", "90005"],
      distance: 0.8,
      guarantee: true,
      employee_count: 18,
      total_hires: 22,
      founded: 2015,
      background_check: true,
      status: "Available",
      description: "Certified electricians providing safe solutions.",
      imageUrl: "/assets/home-service/service (2).jpg",
    },
    {
      id: 3,
      company: "Clean Home Services",
      type: "Company",
      service: "Cleaning",
      rating: 4.9,
      services: ["Deep Cleaning", "Carpet Cleaning", "Window Washing"],
      zipCodes: ["90002", "90004"],
      distance: 2.5,
      guarantee: true,
      employee_count: 42,
      total_hires: 35,
      founded: 2016,
      background_check: true,
      status: "Available",
      description: "Premium cleaning services with eco-friendly products.",
      imageUrl: "/assets/home-service/service (3).jpg",
    },
    {
      id: 4,
      company: "Mike's Handyman Services",
      type: "Handyman",
      service: "Handyman",
      rating: 4.3,
      services: ["Furniture Assembly", "Shelving", "Minor Repairs"],
      zipCodes: ["90001", "90003", "90005"],
      distance: 1.7,
      guarantee: false,
      employee_count: 1,
      total_hires: 12,
      founded: 2019,
      background_check: true,
      status: "Available",
      description: "Reliable handyman for home maintenance needs.",
      imageUrl: "/assets/home-service/service (4).jpg",
    },
    {
      id: 5,
      company: "Green Thumb Landscaping",
      type: "Company",
      service: "Landscaping",
      rating: 4.7,
      services: ["Lawn Care", "Tree Trimming", "Garden Design"],
      zipCodes: ["90002", "90004", "90006"],
      distance: 3.1,
      guarantee: true,
      employee_count: 15,
      total_hires: 28,
      founded: 2014,
      background_check: true,
      status: "Available",
      description: "Professional landscaping services.",
      imageUrl: "/assets/home-service/service (5).jpg",
    },
    {
      id: 6,
      company: "Tom's Handyman Solutions",
      type: "Handyman",
      service: "Handyman",
      rating: 4.6,
      services: ["Drywall Repair", "Painting", "Fixture Installation"],
      zipCodes: ["90002", "90004", "90006"],
      distance: 2.3,
      guarantee: true,
      employee_count: 1,
      total_hires: 8,
      founded: 2020,
      background_check: true,
      status: "Available",
      description: "Skilled handyman for various home repairs.",
      imageUrl: "/assets/home-service/service (3).jpg",
    },
  ];

  const filteredProfessionals = MOCK_PROFESSIONALS.filter((professional) => {
    if (selectedType === "All") return true;
    return professional.type === selectedType;
  });

  const displayService = slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 dark:text-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          paths={[
            { name: "Home", href: "/" },
            { name: "Home Services", href: "/home-services" },
            { name: displayService },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold">
            Top {displayService} Professionals in Your Area
          </h1>
          <div className="flex items-center mt-2 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Chicago, IL</span>
          </div>

          <ProfessionalTypeFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <ServiceQuestion serviceId={slug} />
          </div>

          <div className="lg:w-2/4 flex-1">
            <ProfessionalList
              professionals={filteredProfessionals}
              selectedType={selectedType}
            />
          </div>

          <div className="lg:w-1/4 self-start sticky top-4 h-fit">
            <QuotationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
