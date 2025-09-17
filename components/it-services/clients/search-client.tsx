"use client"

import { useState, useMemo } from "react"
import { PopularCategoriesMenu } from "@/components/it-services/sections/search/popular-categories-menu"
import { CategoryHero } from "@/components/it-services/sections/search/category-hero"
import { SearchFilters } from "@/components/it-services/sections/search/search-filters"
import { ServiceGrid } from "@/components/it-services/service/service-grid"
import { Pagination } from "@/components/it-services/sections/search/pagination"
import { TrendingServices } from "@/components/it-services/service/trending-services"
import SubCategories from "@/components/it-services/sections/search/sub-categories"

export default function SearchClient() {
  const [activeCategory, setActiveCategory] = useState("Graphics & Design")

  const heroContent = useMemo(() => {
    const map: Record<string, { title: string; description: string; illustration: string; gradient: string }> = {
      "All Categories": {
        title: "All Services",
        description: "Explore a wide range of professional services tailored to your needs.",
        illustration: "https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1091.jpg",
        gradient: "from-slate-200 via-sky-100 to-cyan-100",
      },
      "Graphics & Design": {
        title: "Graphics & Design",
        description: "Bring your ideas to life with stunning visuals and creative design.",
        illustration: "https://img.freepik.com/free-vector/graphic-design-concept-illustration_114360-2379.jpg",
        gradient: "from-emerald-200 via-green-100 to-lime-100",
      },
      "Digital Marketing": {
        title: "Digital Marketing",
        description: "Grow your business with expert campaigns and measurable results.",
        illustration: "https://img.freepik.com/free-vector/digital-marketing-concept-illustration_114360-6613.jpg",
        gradient: "from-indigo-200 via-blue-100 to-sky-100",
      },
      "Writing & Translation": {
        title: "Writing & Translation",
        description: "Words that engage, inform, and convert — in any language.",
        illustration: "https://img.freepik.com/free-vector/freelance-copywriting-concept-illustration_114360-8779.jpg",
        gradient: "from-amber-200 via-yellow-100 to-orange-100",
      },
      "Video & Animation": {
        title: "Video & Animation",
        description: "Captivate your audience with motion and storytelling.",
        illustration: "https://img.freepik.com/free-vector/video-editing-concept-illustration_114360-4786.jpg",
        gradient: "from-fuchsia-50 via-pink-50 to-rose-50",
      },
      "Music & Audio": {
        title: "Music & Audio",
        description: "Professional sound design, music production, and voice overs.",
        illustration: "https://img.freepik.com/free-vector/music-concept-illustration_114360-1802.jpg",
        gradient: "from-purple-200 via-violet-100 to-fuchsia-100",
      },
      "Programming & Tech": {
        title: "Programming & Tech",
        description: "Build, integrate, and scale with expert engineering.",
        illustration: "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg",
        gradient: "from-sky-200 via-cyan-100 to-teal-100",
      },
      "Business": {
        title: "Business",
        description: "Consulting, planning, and operations to power your growth.",
        illustration: "https://img.freepik.com/free-vector/business-deal-concept-illustration_114360-1495.jpg",
        gradient: "from-yellow-200 via-lime-100 to-green-100",
      },
      "Lifestyle": {
        title: "Lifestyle",
        description: "Personalized coaching, wellness, and more to level up life.",
        illustration: "https://img.freepik.com/free-vector/healthy-lifestyle-concept-illustration_114360-7762.jpg",
        gradient: "from-emerald-200 via-teal-100 to-green-100",
      },
      "Trending": {
        title: "Trending Services",
        description: "What’s hot right now — discover the latest in-demand skills.",
        illustration: "https://img.freepik.com/free-vector/trendy-abstract-shapes_23-2148940849.jpg",
        gradient: "from-rose-200 via-red-100 to-orange-100",
      },
    }

    return map[activeCategory] ?? map["All Categories"]
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">
      {/* PopularCategoriesMenu: sticky on top for mobile, static for desktop */}
      <div className="w-full sticky top-0 z-30 bg-white dark:bg-gray-950 md:static md:z-auto md:bg-transparent">
        <PopularCategoriesMenu
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
      {/* CategoryHero: responsive padding and stacking */}
      <div className="w-full">
        <CategoryHero
          category={heroContent.title}
          description={heroContent.description}
          illustration={heroContent.illustration}
          gradient={heroContent.gradient}
        />
      </div>
      {/* SubCategories: responsive margin */}
      <div className="w-full">
        <SubCategories />
      </div>
      {/* Main content: responsive container and spacing */}
      <div className="w-full flex-1">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          
              <SearchFilters />
              <TrendingServices />
              <ServiceGrid />
              <Pagination />
        </div>
      </div>
    </div>
  )
}