"use client";
import { MapPin } from "lucide-react";
import { use } from "react";
import { motion } from "framer-motion";
import ProfessionalList from "@/components/home-services/homepage/professional/ProfessionalList";
import ProfessionalFilters from "@/components/home-services/homepage/professional/ProfessionalFilters";
import QuotationForm from "@/components/home-services/homepage/professional/QuotationForm";
import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";

export default function ProfessionalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const ProfessionalDetails = [
    {
      id: 1,
      imageUrl: "/assets/home-service/service (1).jpg",
      company: "Clean Globe",
      rating: "4.3",
      guarantee: true,
      employee_count: 34,
      total_hires: 12,
      founded: 2014,
      background_check: true,
      status: "Available",
      description:
        "Professional cleaning services with eco-friendly products and guaranteed satisfaction.",
    },
    {
      id: 2,
      imageUrl: "/assets/home-service/service (2).jpg",
      company: "Sun Shine",
      rating: "3.8",
      guarantee: false,
      employee_count: 43,
      total_hires: 9,
      founded: 2018,
      background_check: true,
      status: "Available",
      description:
        "Brightening your home with top-quality cleaning and maintenance services.",
    },
    {
      id: 3,
      imageUrl: "/assets/home-service/service (3).jpg",
      company: "World Structure",
      rating: "4.6",
      guarantee: true,
      employee_count: 54,
      total_hires: 19,
      founded: 2008,
      background_check: true,
      status: "Available",
      description:
        "Building maintenance and cleaning specialists with over a decade of experience.",
    },
    {
      id: 4,
      imageUrl: "/assets/home-service/service (4).jpg",
      company: "Green World",
      rating: "4.5",
      guarantee: false,
      employee_count: 100,
      total_hires: 22,
      founded: 2017,
      background_check: true,
      status: "Available",
      description:
        "Sustainable cleaning solutions for environmentally conscious homeowners.",
    },
  ];

  return (
    <div className="relative bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 dark:text-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          paths={[
            { name: "Home", href: "/" },
            { name: "Home Services", href: "/home-services" },
            { name: "Professionals" },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-4"
        >
          <h1 className="text-xl md:text-xl font-bold">
            Here are the top professionals we found in your area{id}
          </h1>
          <div className="flex items-center mt-2 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Chicago, IL</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Filters - takes necessary width, doesn't stretch */}
          <div className="lg:w-1/4">
            <ProfessionalFilters />
          </div>

          {/* Professional List - takes remaining space */}
          <div className="lg:w-2/4 flex-1">
            <ProfessionalList professionals={ProfessionalDetails} />
          </div>

          {/* Quotation Form - fixed width, height fits content */}
          <div className="lg:w-1/4 self-start sticky top-4 h-fit">
            <QuotationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
