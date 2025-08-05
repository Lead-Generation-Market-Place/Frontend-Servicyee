"use client";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Breadcrumbs from "@/components/home-services/Breadcrumbs";
import { ServiceCard } from "@/components/home-services/ServiceCard";

// Sample data structure
const categoriesWithServices = [
  {
    id: "cleaning",
    name: "Cleaning Services",
    services: [
      {
        id: 1,
        title: "House Cleaning",
        text: "Professional cleaning for your entire home",
        season: "all",
        imageUrl: "/assets/home-service/service (1).jpg"
      },
      {
        id: 2,
        title: "Carpet Cleaning",
        text: "Deep cleaning for carpets and rugs",
        season: "all",
        imageUrl: "/assets/home-service/service (2).jpg"
      },
      {
        id: 3,
        title: "Yard Cleaning",
        text: "Professional cleaning for your entire home",
        season: "all",
        imageUrl: "/assets/home-service/service (1).jpg"
      },
      {
        id: 4,
        title: "Roof Cleaning",
        text: "Deep cleaning for carpets and rugs",
        season: "all",
        imageUrl: "/assets/home-service/service (2).jpg"
      }
    ]
  },
  {
    id: "landscaping",
    name: "Landscaping",
    services: [
      {
        id: 5,
        title: "Lawn Trimming",
        text: "Professional lawn maintenance",
        season: "spring",
        imageUrl: "/assets/home-service/service (3).jpg"
      },
      {
        id: 6,
        title: "Lawn Care",
        text: "Professional lawn maintenance",
        season: "spring",
        imageUrl: "/assets/home-service/service (3).jpg"
      },
      {
        id: 7,
        title: "Garden Design",
        text: "Professional lawn maintenance",
        season: "spring",
        imageUrl: "/assets/home-service/service (3).jpg"
      },
    ]
  },
  {
    id: "painting",
    name: "Painting",
    services: [
      {
        id: 8,
        title: "Interior Painting",
        text: "High-quality interior painting services",
        season: "fall",
        imageUrl: "/assets/home-service/service (4).jpg"
      },
      {
        id: 9,
        title: "Interior Design",
        text: "High-quality interior painting services",
        season: "fall",
        imageUrl: "/assets/home-service/service (4).jpg"
      },
    ]
  }
];

export default function ExploreCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(categoriesWithServices[0].id);
  const servicesRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  // Store category refs
  useEffect(() => {
    categoriesWithServices.forEach(category => {
      categoryRefs.current[category.id] = document.getElementById(category.id) as HTMLDivElement;
    });
  }, []);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element && servicesRef.current) {
      const containerTop = servicesRef.current.getBoundingClientRect().top + window.scrollY;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementTop - containerTop + servicesRef.current.scrollTop - 20,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          paths={[
            { name: "Home", href: "/" },
            { name: "Home Services", href: "/home-services" },
            { name: "Explore Categories" }
          ]}
        />

        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-6">Professional Services</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Categories List - Left Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:w-1/4"
            >
              <div className="sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {categoriesWithServices.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {category.name}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({category.services.length})
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Services Display - Right Side */}
            <motion.div
              ref={servicesRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="lg:w-3/4"
            >
              <div className="space-y-12">
                {categoriesWithServices.map((category) => (
                  <div 
                    key={category.id} 
                    id={category.id} 
                    className="scroll-mt-20"
                    ref={(el: HTMLDivElement | null) => {
                    if (el) {
                        categoryRefs.current[category.id] = el;
                    }
                    }}
                  >
                    <motion.h2 
                      className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      {category.name}
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.services.map((service) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          viewport={{ once: true, margin: "-50px" }}
                        >
                          <ServiceCard 
                            id={service.id}
                            title={service.title}
                            text={service.text}
                            season={service.season}
                            imageUrl={service.imageUrl}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}