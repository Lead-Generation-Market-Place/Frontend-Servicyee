import React from "react";
import { motion, Variants } from "framer-motion";
import { useRef, useState } from "react";
import {
  Brush,
  Wrench,
  Hammer,
  PaintRoller,
  Construction,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface PopularSubCategory {
  id: number;
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  count: number;
  color: string;
  iconColor: string;
  hoverColor: string;
}

const SubCategories = () => {
  const { theme } = useTheme();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
      name: "Repair & Technical Support",
      Icon: Brush,
      count: 15,
      color: "bg-sky-100 dark:bg-sky-900/50",
      iconColor: "text-sky-600 dark:text-sky-400",
      hoverColor: "group-hover:bg-sky-600 dark:group-hover:bg-sky-700",
    },
    {
      id: 2,
      name: "Home & Property",
      Icon: PaintRoller,
      count: 13,
      color: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "group-hover:bg-purple-600 dark:group-hover:bg-purple-700",
    },
    {
      id: 3,
      name: "Business & Professional",
      Icon: Construction,
      count: 8,
      color: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      hoverColor: "group-hover:bg-amber-600 dark:group-hover:bg-amber-700",
    },
    {
      id: 4,
      name: "Handyman",
      Icon: Wrench,
      count: 10,
      color: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      hoverColor: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-700",
    },
    {
      id: 5,
      name: "Outdoor & Lawn Care",
      Icon: Hammer,
      count: 17,
      color: "bg-rose-100 dark:bg-rose-900/50",
      iconColor: "text-rose-600 dark:text-rose-400",
      hoverColor: "group-hover:bg-rose-600 dark:group-hover:bg-rose-700",
    },
  ];

  const handlePrev = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleNext = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const startDrag = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const duringDrag = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

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
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Popular{" "}
            <span className="text-sky-600 dark:text-sky-400">Categories</span>
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
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:block"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:block"
            aria-label="Next categories"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Carousel */}
          <motion.div
            ref={carouselRef}
            variants={container}
            initial="hidden"
            animate="show"
            onMouseDown={startDrag}
            onMouseMove={duringDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            aria-label="Service categories carousel"
          >
            {subcategories.map(
              ({ id, name, Icon, count, color, iconColor, hoverColor }) => (
                <motion.div
                  key={id}
                  variants={item}
                  className="flex-shrink-0 snap-center w-[calc(100%-2rem)] sm:w-64"
                >
                  <Link
                    href={`/home-services/sub-categories/${encodeURIComponent(
                      name.toLowerCase().replace(/\s+/g, "-")
                    )}?id=${id}`}
                    className="group block h-full"
                    aria-label={`Browse ${name} services`}
                  >
                    <div className="h-32.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-xl flex flex-col items-center text-center hover:border-sky-300 dark:hover:border-sky-500 transition-all duration-300 shadow-sm hover:shadow-md">
                      {/* Icon with gradient background */}
                      <div
                        className={`mb-2 p-2 rounded-xl ${color} ${hoverColor} transition-all duration-500 group-hover:scale-110`}
                      >
                        <Icon
                          className={`w-4 h-4 ${iconColor} group-hover:text-white transition-colors`}
                        />
                      </div>

                      {/* Category name */}
                      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                        {name}
                      </h3>

                      {/* Count badge */}
                      <div className="mt-auto px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/30 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {count} services
                      </div>

                      {/* Animated arrow (appears on hover) */}
                      <div className="mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ChevronRight
                          className="w-4 h-4"
                          stroke={theme === "dark" ? "#7dd3fc" : "#0284c7"}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubCategories;
