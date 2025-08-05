import React from 'react';
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
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from "next-themes";

const AllCategories = () => {
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
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        mass: 0.5,
        restDelta: 0.0001
      } 
    }
  };

  const subcategories = [
    {
      id:1,
      name: "Rapair & Technical Support",
      Icon: Brush,
      count: 15,
      color: "bg-sky-100 dark:bg-sky-900/50",
      iconColor: "text-sky-600 dark:text-sky-400",
      hoverColor: "group-hover:bg-sky-600 dark:group-hover:bg-sky-700"
    },
    {
      id:2,
      name: "Home & Property",
      Icon: PaintRoller,
      count: 13,
      color: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "group-hover:bg-purple-600 dark:group-hover:bg-purple-700"
    },
    {
      id:3,
      name: "Business & Professional",
      Icon: Construction,
      count: 8,
      color: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
      hoverColor: "group-hover:bg-amber-600 dark:group-hover:bg-amber-700"
    },
    {
      id:4,
      name: "Handyman",
      Icon: Wrench,
      count: 10,
      color: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      hoverColor: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-700"
    },
    {
      id:5,
      name: "Outdoor & Lawn Care",
      Icon: Hammer,
      count: 17,
      color: "bg-rose-100 dark:bg-rose-900/50",
      iconColor: "text-rose-600 dark:text-rose-400",
      hoverColor: "group-hover:bg-rose-600 dark:group-hover:bg-rose-700"
    },
  ];

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
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
    <div className="my-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            All <span className="text-sky-600 dark:text-sky-400">Categories</span>
          </h2>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            
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
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {subcategories.map(({ id, name, Icon, count, color, iconColor, hoverColor }) => (
              <motion.div 
                key={id}
                variants={item}
                className="flex-shrink-0 snap-center w-[calc(100%-2rem)] sm:w-56" // Smaller width
              >
                <Link
                  href={`/home-services/sub-categories/${name}?id=${id}`}
                  className="group block h-full"
                >
                  <div className="h-30 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl flex flex-col items-center text-center hover:border-sky-300 dark:hover:border-sky-500 transition-all duration-300 shadow-sm hover:shadow-md">
                    {/* Icon with gradient background */}
                    <div className={`mb-1 p-2 rounded-lg ${color} ${hoverColor} transition-all duration-500 group-hover:scale-110`}> {/* Smaller rounded-lg */}
                      <Icon className={`w-4 h-4 ${iconColor} group-hover:text-white transition-colors`} />
                    </div>
                    
                    {/* Category name */}
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-2"> {/* Smaller text */}
                      {name}
                    </h3>
                    
                    {/* Count badge */}
                    <div className="mt-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/30 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {count} services
                    </div>
                    
                    {/* Animated arrow (appears on hover) */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke={theme === 'dark' ? '#7dd3fc' : '#0284c7'} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;