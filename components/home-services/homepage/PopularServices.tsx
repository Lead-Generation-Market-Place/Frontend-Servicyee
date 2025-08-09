import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Hammer,
  School,
  Construction,
  Home,
  Heater,
  DraftingCompass,
  DoorOpen,
  Trash2,
} from "lucide-react";

interface PopularSubCategory {
  id: number;
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconColor: string;
  hoverColor: string;
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
      Icon: Home,
      color: "bg-sky-100 dark:bg-sky-900/50",
      iconColor: "text-sky-600 dark:text-sky-400",
      hoverColor: "group-hover:bg-sky-600 dark:group-hover:bg-sky-700",
    },
    {
      id: 2,
      name: "General Contracting",
      Icon: Construction,
      color: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "group-hover:bg-purple-600 dark:group-hover:bg-purple-700",
    },
    {
      id: 3,
      name: "Interior Design",
      Icon: DraftingCompass,
      color: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      hoverColor: "group-hover:bg-amber-600 dark:group-hover:bg-amber-700",
    },
    {
      id: 4,
      name: "Construction Services",
      Icon: Hammer,
      color: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      hoverColor: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-700",
    },
    {
      id: 5,
      name: "Door Installation",
      Icon: DoorOpen,
      color: "bg-rose-100 dark:bg-rose-900/50",
      iconColor: "text-rose-600 dark:text-rose-400",
      hoverColor: "group-hover:bg-rose-600 dark:group-hover:bg-rose-700",
    },
    {
      id: 6,
      name: "Floor Repair",
      Icon: School,
      color: "bg-indigo-100 dark:bg-indigo-900/50",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      hoverColor: "group-hover:bg-indigo-600 dark:group-hover:bg-indigo-700",
    },
    {
      id: 7,
      name: "Junk Removal",
      Icon: Trash2,
      color: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-600 dark:text-orange-400",
      hoverColor: "group-hover:bg-orange-600 dark:group-hover:bg-orange-700",
    },
    {
      id: 8,
      name: "Kitchen Remodel",
      Icon: Heater,
      color: "bg-pink-100 dark:bg-pink-900/50",
      iconColor: "text-pink-600 dark:text-pink-400",
      hoverColor: "group-hover:bg-pink-600 dark:group-hover:bg-pink-700",
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
              Explore all categories
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3"
        >
          {subcategories.map(
            ({ id, name, Icon, color, iconColor, hoverColor }) => (
              <motion.div key={id} variants={item} className="col-span-1">
                <Link
                  href={`/home-services/professional-service/${id}`}
                  className="group block h-full"
                  aria-label={`Browse ${name} services`}
                >
                  <div className="h-full bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 p-4 rounded-lg flex flex-col items-center text-center hover:border-sky-300 dark:hover:border-sky-500 transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:shadow-gray-800/50">
                    {/* Icon with gradient background */}
                    <div
                      className={`mb-3 p-3 rounded-xl ${color} ${hoverColor} transition-all duration-300 shadow-inner dark:shadow-gray-900/30`}
                    >
                      <Icon
                        className={`w-5 h-5 ${iconColor} group-hover:text-white transition-colors`}
                      />
                    </div>

                    {/* Category name */}
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                      {name}
                    </h3>

                    {/* View more text (hidden on small screens) */}
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors hidden sm:block">
                      View professionals
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SubCategories;
