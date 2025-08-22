"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { ServiceCard } from "./ServiceCard";

const ServiceList = () => {
  const [locationFilter, setLocationFilter] = useState<string>("all");

  const featured_services = [
    {
      id: 1,
      title: "House cleaning",
      slug: "house_cleaning",
      text: "Cleaning kitchen and rooms with yard and lawn",
      season: "summer",
      imageUrl: "/assets/home-service/service (1).jpg",
      location: "urban",
    },
    {
      id: 2,
      title: "Carpet cleaning",
      slug: "carpet_cleaning",
      text: "Cleaning carpet with providing extra service on housing",
      season: "summer",
      imageUrl: "/assets/home-service/service (2).jpg",
      location: "urban",
    },
    {
      id: 3,
      title: "Lawn trimming & cleaning",
      slug: "lawn_triming",
      text: "Maintaining lawn with trimming and beautification",
      season: "spring",
      imageUrl: "/assets/home-service/service (3).jpg",
      location: "suburban",
    },
    {
      id: 4,
      title: "Interior painting",
      slug: "inteior_painting",
      text: "Design with paint and color mixing according to your desire",
      season: "fall",
      imageUrl: "/assets/home-service/service (4).jpg",
      location: "urban",
    },
    {
      id: 5,
      title: "Roofing",
      slug: "roofing",
      text: "Maintain and installing quality roof to keep you safe and warm",
      season: "winter",
      imageUrl: "/assets/home-service/service (5).jpg",
      location: "rural",
    },
  ];

  // Filter services by location
  const filteredServices = featured_services.filter(
    (service) => locationFilter === "all" || service.location === locationFilter
  );

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header and Filter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            All Services
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredServices.length} services available
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Filter by:
          </span>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Locations</option>
            <option value="urban">Urban</option>
            <option value="suburban">Suburban</option>
            <option value="rural">Rural</option>
          </select>
        </div>
      </motion.div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <ServiceCard
                id={service.id}
                title={service.title}
                slug={service.slug}
                text={service.text}
                season={service.season}
                imageUrl={service.imageUrl}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No services found for this location filter.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceList;
