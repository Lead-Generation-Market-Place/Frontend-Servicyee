"use client"

import { useState, useMemo } from "react"
import { PopularCategoriesMenu } from "@/components/it-services/services/popular-categories-menu"
import { CategoryHero } from "@/components/it-services/services/category-hero"
import { SearchFilters } from "@/components/it-services/services/search-filters"
import { ServiceGrid } from "@/components/it-services/services/service-grid"
import { Pagination } from "@/components/it-services/services/pagination"
import { TrendingServicesSection } from "@/components/it-services/services/trending-services-section"

export default function SearchPage() {
  const [activeCategory, setActiveCategory] = useState("Graphics & Design")

  const heroContent = useMemo(() => {
    const map: Record<string, { title: string; description: string; illustration: string; gradient: string }> = {
      "All Categories": {
        title: "All Services",
        description: "Explore a wide range of professional services tailored to your needs.",
        illustration: "https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1091.jpg",
        gradient: "from-gray-50 to-gray-100",
      },
      "Graphics & Design": {
        title: "Graphics & Design",
        description: "Bring your ideas to life with stunning visuals and creative design.",
        illustration: "https://img.freepik.com/free-vector/graphic-design-concept-illustration_114360-2379.jpg",
        gradient: "from-emerald-50 to-teal-50",
      },
      "Digital Marketing": {
        title: "Digital Marketing",
        description: "Grow your business with expert campaigns and measurable results.",
        illustration: "https://img.freepik.com/free-vector/digital-marketing-concept-illustration_114360-6613.jpg",
        gradient: "from-indigo-50 to-blue-50",
      },
      "Writing & Translation": {
        title: "Writing & Translation",
        description: "Words that engage, inform, and convert — in any language.",
        illustration: "https://img.freepik.com/free-vector/freelance-copywriting-concept-illustration_114360-8779.jpg",
        gradient: "from-amber-50 to-orange-50",
      },
      "Video & Animation": {
        title: "Video & Animation",
        description: "Captivate your audience with motion and storytelling.",
        illustration: "https://img.freepik.com/free-vector/video-editing-concept-illustration_114360-4786.jpg",
        gradient: "from-pink-50 to-rose-50",
      },
      "Music & Audio": {
        title: "Music & Audio",
        description: "Professional sound design, music production, and voice overs.",
        illustration: "https://img.freepik.com/free-vector/music-concept-illustration_114360-1802.jpg",
        gradient: "from-purple-50 to-fuchsia-50",
      },
      "Programming & Tech": {
        title: "Programming & Tech",
        description: "Build, integrate, and scale with expert engineering.",
        illustration: "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg",
        gradient: "from-sky-50 to-cyan-50",
      },
      "Business": {
        title: "Business",
        description: "Consulting, planning, and operations to power your growth.",
        illustration: "https://img.freepik.com/free-vector/business-deal-concept-illustration_114360-1495.jpg",
        gradient: "from-yellow-50 to-lime-50",
      },
      "Lifestyle": {
        title: "Lifestyle",
        description: "Personalized coaching, wellness, and more to level up life.",
        illustration: "https://img.freepik.com/free-vector/healthy-lifestyle-concept-illustration_114360-7762.jpg",
        gradient: "from-green-50 to-emerald-50",
      },
      "Trending": {
        title: "Trending Services",
        description: "What’s hot right now — discover the latest in-demand skills.",
        illustration: "https://img.freepik.com/free-vector/trendy-abstract-shapes_23-2148940849.jpg",
        gradient: "from-red-50 to-orange-50",
      },
    }

    return map[activeCategory] ?? map["All Categories"]
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <PopularCategoriesMenu
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Breadcrumb */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Home</span>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{heroContent.title}</span>
          </div>
        </div>
      </div>

      <CategoryHero
        category={heroContent.title}
        description={heroContent.description}
        illustration={heroContent.illustration}
        gradient={heroContent.gradient}
      />

      <div className="container mx-auto px-4 py-8">
        <SearchFilters />
        <TrendingServicesSection />
        <ServiceGrid />
        <Pagination />
      </div>
    </div>
  )
}