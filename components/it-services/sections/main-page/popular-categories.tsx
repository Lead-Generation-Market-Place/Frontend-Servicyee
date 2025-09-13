
"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Code, Globe, Video, FolderOpen, Search, Home, BookOpen } from "lucide-react";

interface ServiceCard {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  imageUrl: string;
  gradient: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    name: "Vibe Coding",
    icon: Code,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
    gradient: "from-purple-400 via-pink-500 to-red-500"
  },
  {
    id: 2,
    name: "Website Development",
    icon: Globe,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
    gradient: "from-green-400 to-blue-500"
  },
  {
    id: 3,
    name: "Video Editing",
    icon: Video,
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&crop=center",
    gradient: "from-pink-400 to-purple-500"
  },
  {
    id: 4,
    name: "Software Development",
    icon: FolderOpen,
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&crop=center",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: 5,
    name: "SEO",
    icon: Search,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 6,
    name: "Architecture & Interior Design",
    icon: Home,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 7,
    name: "Booking",
    icon: BookOpen,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
    gradient: "from-yellow-500 to-red-500"
  }
];

export default function PopularCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 240,
        behavior: 'smooth'
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -240,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Popular <span className="text-green-600">Services</span>
          </h2>
          <p className="text-gray-600">Discover our most requested services</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300 group z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-56 group cursor-pointer"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-64 flex flex-col">
                  {/* Dark Green Header */}
                  <div className="bg-green-800 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-sm">
                        {service.name}
                      </h3>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative flex-1 overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300 group z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}