"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, BookOpen, Code, Globe } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const guides = [
  {
    title: "5 Best Website Builders for 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/20",
    icon: <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />,
    category: "Web Development"
  },
  {
    title: "How to Find a Web Developer in 2025",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop&crop=center",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    icon: <Code className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
    category: "Hiring Guide"
  },
  {
    title: "How to Build a WordPress Website for Your Small Business in 2025",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop&crop=center",
    bgColor: "bg-pink-100 dark:bg-pink-900/20",
    icon: <BookOpen className="h-8 w-8 text-pink-600 dark:text-pink-400" />,
    category: "WordPress"
  },
]

export function CategoryGuides() {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-950 dark:text-white mb-2">
              Guides related to Programming & Tech
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Expert insights and tutorials to help you succeed
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            <span className="font-medium">Programming & tech guides</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <Card 
              key={index} 
              className="border-0 hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/20 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 overflow-hidden group"
            >
              <CardContent className="p-0">
                {/* Image Container with Fallback */}
                <div className={`h-48 ${guide.bgColor} relative overflow-hidden`}>
                  {/* Icon Fallback - Always visible */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    {guide.icon}
                  </div>
                  
                  {/* Image - Hidden if error occurs */}
                  {!imageErrors[index] && (
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(index)}
                    />
                  )}
                </div>
                
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {guide.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {guide.title}
                  </h3>
                  
                  {/* Read More Link */}
                  <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    <span>Read Guide</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
