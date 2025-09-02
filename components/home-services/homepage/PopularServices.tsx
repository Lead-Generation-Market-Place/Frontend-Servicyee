import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

interface PopularSubCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const SubCategories = () => {
  // Variants definitions
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5,
        restDelta: 0.0001,
      },
    },
  };

  const subcategories: PopularSubCategory[] = [
    {
      id: 1,
      name: "Roof Repair or Maintenance",
      slug: "roof_repair",
      image:
        "https://images.pexels.com/photos/7641361/pexels-photo-7641361.jpeg",
    },
    {
      id: 2,
      name: "General Contracting",
      slug: "general_contracting",
      image:
        "https://images.pexels.com/photos/8470031/pexels-photo-8470031.jpeg",
    },
    {
      id: 3,
      name: "Interior Design",
      slug: "interior_design",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    },
    {
      id: 4,
      name: "Construction Services",
      slug: "construction_services",
      image:
        "https://images.pexels.com/photos/30592258/pexels-photo-30592258.jpeg",
    },
    {
      id: 5,
      name: "Door Installation",
      slug: "door_installation",
      image:
        "https://images.pexels.com/photos/9051071/pexels-photo-9051071.jpeg",
    },
    {
      id: 6,
      name: "Floor Repair",
      slug: "floor_repair",
      image:
        "https://images.pexels.com/photos/7491192/pexels-photo-7491192.jpeg",
    },
    {
      id: 7,
      name: "Junk Removal",
      slug: "junk_removal",
      image:
        "https://images.pexels.com/photos/4498090/pexels-photo-4498090.jpeg",
    },
    {
      id: 8,
      name: "Kitchen Remodel",
      slug: "kitchen_remodel",
      image:
        "https://images.pexels.com/photos/33257996/pexels-photo-33257996.jpeg",
    },
  ];

  return (
    <section className="my-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Popular{" "}
            <span className="text-sky-600 dark:text-sky-400">Services</span>
          </h2>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="/home-services/explore-categories"
              className="text-sm text-sky-600 hover:underline dark:text-sky-400 mt-2 sm:mt-0 flex items-center gap-1"
              aria-label="Explore all categories"
            >
              Explore all services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4"
        >
          {subcategories.map(({ id, name, slug, image }) => (
            <motion.div key={id} variants={item} className="col-span-1">
              <Link
                href={`/home-services/professional-service/${slug}`}
                className="group block h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                aria-label={`Browse ${name} services`}
              >
                {/* Card with background image */}
                <div
                  className="h-40 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  {/* Gradient overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  {/* Service name positioned at bottom left */}
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {name}
                    </h3>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View professionals →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubCategories;
