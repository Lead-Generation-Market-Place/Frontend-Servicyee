"use client";
import { MapPin } from "lucide-react";
import { use } from "react";
import { motion } from "framer-motion";
import ProfessionalList from "@/components/home-services/homepage/professional/ProfessionalList";
import ProfessionalFilters from "@/components/home-services/homepage/professional/ProfessionalFilters";
import QuotationForm from "@/components/home-services/homepage/professional/QuotationForm";
import Breadcrumbs from "@/components/home-services/homepage/Breadcrumbs";

// interface Professional {
//   id: string;
//   name: string;
//   service: string;
//   rating: number;
//   services: string[];
//   zipCodes: string[];
//   distance?: number;
//   guarantee: boolean;
//   employee_count: number;
//   total_hires: number;
//   founded: number;
//   background_check: boolean;
//   status: string;
//   description: string;
// }
export default function ProfessionalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const MOCK_PROFESSIONALS = [
    {
      id: "1",
      company: "John's Plumbing", // Changed from name to company
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
      description:
        "Licensed plumbing services with 10 years of experience in residential and commercial properties.",
      imageUrl: "/assets/home-service/service (1).jpg", // Added imageUrl
    },
    {
      id: "2",
      company: "Electric Solutions", // Changed from name to company
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
      description:
        "Certified electricians providing safe and efficient electrical solutions.",
      imageUrl: "/assets/home-service/service (2).jpg", // Added imageUrl
    },
    {
      id: "3",
      company: "Clean Home Services", // Changed from name to company
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
      description:
        "Premium cleaning services using eco-friendly products and techniques.",
      imageUrl: "/assets/home-service/service (3).jpg", // Added imageUrl
    },
    {
      id: "4",
      company: "Quick Fix Handyman", // Changed from name to company
      service: "Handyman",
      rating: 4.3,
      services: ["Furniture Assembly", "Shelving", "Minor Repairs"],
      zipCodes: ["90001", "90003", "90005"],
      distance: 1.7,
      guarantee: false,
      employee_count: 8,
      total_hires: 12,
      founded: 2019,
      background_check: true,
      status: "Available",
      description:
        "Reliable handyman services for all your home maintenance needs.",
      imageUrl: "/assets/home-service/service (4).jpg", // Added imageUrl
    },
    {
      id: "5",
      company: "Green Thumb Landscaping", // Changed from name to company
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
      description:
        "Professional landscaping services creating beautiful outdoor spaces.",
      imageUrl: "/assets/home-service/service (5).jpg", // Added imageUrl
    },
    {
      id: "6",
      company: "Green World", // Changed from name to company
      service: "Landscaping",
      rating: 4.7,
      services: ["Lawn Care", "Tree Trimming", "Garden Design"],
      zipCodes: ["90002", "90004", "90006"],
      distance: 3.1,
      guarantee: false,
      employee_count: 12,
      total_hires: 18,
      founded: 2017,
      background_check: true,
      status: "Available",
      description:
        "Sustainable landscaping solutions with native plants and eco-friendly practices.",
      imageUrl: "/assets/home-service/service (6).jpg", // Added imageUrl
    },
    {
      id: "7",
      company: "Green and Clean Globe", // Changed from name to company
      service: "Landscaping",
      rating: 4.7,
      services: ["Lawn Care", "Tree Trimming", "Garden Design"],
      zipCodes: ["90002", "90004", "90006"],
      distance: 3.1,
      guarantee: true,
      employee_count: 20,
      total_hires: 32,
      founded: 2013,
      background_check: true,
      status: "Available",
      description:
        "Full-service landscaping and garden maintenance with a focus on sustainability.",
      imageUrl: "/assets/home-service/service (7).jpg", // Added imageUrl
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
            <ProfessionalList professionals={MOCK_PROFESSIONALS} />
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
