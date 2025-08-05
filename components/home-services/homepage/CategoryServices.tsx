import React from 'react';

import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";
import { useRef, useState } from "react";
import { ServiceCard } from './ServiceCard';

const AllServices = () => {
  const carouselRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const Categories = {
    "Cleaning and Maintenance": [
      {
        id:1,
        title: "House cleaning",
        text: "Cleaning kitchen and rooms with yard and lawn",
        season: "summer",
        imageUrl: "/assets/home-service/service (1).jpg"
      },
      {
        id:2,
        title: "Carpet cleaning",
        text: "Cleaning carpet with providing extra service on housing",
        season: "summer",
        imageUrl: "/assets/home-service/service (2).jpg"
      },
      {
        id:3,
        title: "Lawn triming & cleaning",
        text: "Maintianing lawn with triming and beautification",
        season: "spring",
        imageUrl: "/assets/home-service/service (3).jpg"
      },
    ],
    "Remodel and Installation": [
      {
        id:4,
        title: "Interior painting",
        text: "Design with paint and color mixing according to your desire",
        season: "fall",
        imageUrl: "/assets/home-service/service (4).jpg"
      },
      {
        id:5,
        title: "Roofing",
        text: "Maintain and installing quality roof to keep you safe and warm",
        season: "winter",
        imageUrl: "/assets/home-service/service (5).jpg"
      }
    ]
  };

  // Animation variants
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

  // const item: Variants = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { 
  //     opacity: 1, 
  //     y: 0, 
  //     transition: { 
  //       type: "spring" as const,
  //       stiffness: 100,
  //       damping: 10
  //     } 
  //   }
  // };

  // Carousel controls for each category
  const handlePrev = (category: string) => {
    const carousel = carouselRefs.current[category];
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = (category: string) => {
    const carousel = carouselRefs.current[category];
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Dragging handlers
  const startDrag = (e: React.MouseEvent, category: string) => {
    setIsDragging(true);
    const carousel = carouselRefs.current[category];
    if (carousel) {
      setStartX(e.pageX - carousel.offsetLeft);
      setScrollLeft(carousel.scrollLeft);
    }
  };

  const duringDrag = (e: React.MouseEvent, category: string) => {
    if (!isDragging) return;
    const carousel = carouselRefs.current[category];
    if (carousel) {
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="mb-10 px-4">
      <div className="max-w-6xl mx-auto">
        

        {/* Categories with their services */}
        {Object.entries(Categories).map(([category, services]) => (
          <div key={category} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {category}
              </h3>
              <Link href="#" className="text-sm text-sky-600 hover:underline dark:text-sky-400 flex items-center gap-1">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              <button 
                onClick={() => handlePrev(category)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:block"
                aria-label={`Previous ${category} services`}
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <button 
                onClick={() => handleNext(category)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden md:block"
                aria-label={`Next ${category} services`}
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Carousel */}
              <motion.div 
                ref={(el) => {
                    if (el) {
                    carouselRefs.current[category] = el;
                    }
                }}
                variants={container}
                initial="hidden"
                animate="show"
                onMouseDown={(e) => startDrag(e, category)}
                onMouseMove={(e) => duringDrag(e, category)}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                className="flex justify-center items-center overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    {...service}
                    className="w-[calc(100%-2rem)] sm:w-64 snap-center"
                  />         
                ))}
              </motion.div>
            </div>
          </div>
        ))}

        
      </div>
    </div>
  );
};

export default AllServices;