"use client";
import {
  Star,
  BadgeCheck,
  PackageOpen,
  IdCardLanyard,
  MousePointerClick,
  OctagonAlert,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Professional {
  id: string;
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

interface ProfessionalListProps {
  professionals: Professional[];
}

export default function ProfessionalList({
  professionals,
}: ProfessionalListProps) {
  return (
    <div className="flex-2 w-full space-y-6">
      {professionals.map((professional) => (
        <motion.div
          key={professional.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.01 }}
          className={`overflow-hidden transition-colors duration-300 border-b border-gray-200 dark:border-gray-700 bg-white`}
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              {professional.imageUrl ? (
                <Image
                  src={professional.imageUrl}
                  width={400}
                  height={300}
                  alt={professional.company}
                  className="w-full h-48 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-48 md:h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            <div className="p-4 md:w-2/3">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">
                  {professional.company}
                </h2>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    professional.status === "Available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }`}
                >
                  {professional.status}
                </span>
              </div>

              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(Number(professional.rating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm">{professional.rating}</span>
              </div>

              <p className="mt-2 text-sm">{professional.description}</p>

              {/* Display services if they exist */}
              {professional.services && professional.services.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">
                    Services Offered:
                  </h4>
                  <ul className="space-y-1 flex flex-row gap-2 flex-wrap">
                    {professional.services.map((service, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className={`flex items-center`}>
                  {professional.guarantee ? (
                    <BadgeCheck className="w-4 h-4 text-green-500 dark:text-green-200 mr-1" />
                  ) : (
                    <OctagonAlert className="w-4 h-4 text-red-500 dark:text-red-200 mr-1" />
                  )}
                  <span
                    className={`${
                      professional.guarantee
                        ? "text-green-500 dark:text-green-200"
                        : "dark:text-red-200 text-red-500"
                    }`}
                  >
                    Guarantee
                  </span>
                </div>
                <div className="flex justify-start items-center flex-row text-gray-500 dark:text-gray-200">
                  <IdCardLanyard className="w-4 h-4 mr-1" />
                  <span className="font-medium">Employees: </span>
                  {professional.employee_count}
                </div>
                <div className="flex justify-start items-center flex-row text-gray-500 dark:text-gray-200">
                  <PackageOpen className="w-4 h-4 mr-1" />
                  <span className="font-medium">Founded: </span>
                  {professional.founded}
                </div>
                <div className="flex justify-start items-center flex-row text-gray-500 dark:text-gray-200">
                  <MousePointerClick className="w-4 h-4 mr-1" />
                  <span className="font-medium">Hires: </span>
                  {professional.total_hires}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  href={`/home-services/professional-profile/${professional.id}`}
                  className={`px-4 py-2 text-sm rounded transition-colors dark:bg-sky-600 dark:hover:bg-sky-700 bg-sky-500 hover:bg-sky-600 text-white`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
