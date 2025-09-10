"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const trendingServices = [
  {
    id: 1,
    title: "I will build a fully responsive design in HTML,CSS, bootstrap...",
    category: "Design & Creative",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Wanda Runo",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 983,
  },
  {
    id: 2,
    title: "I will do mobile app development for ios and android",
    category: "Web & App Design",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Wanda Runo",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 983,
  },
  {
    id: 3,
    title: "I will design modern websites in figma or adobe xd",
    category: "Web & App Design",
    image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&w=600",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Wanda Runo",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 983,
  },
  {
    id: 4,
    title: "I will design modern websites in figma or adobe xd",
    category: "Web & App Design",
    image: "https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&w=600",
    rating: 4.82,
    reviews: 94,
    author: {
      name: "Wanda Runo",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 983,
  },
  {
    id: 5,
    title: "I will create a custom logo for your business",
    category: "Logo Design",
    image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&w=600",
    rating: 4.95,
    reviews: 120,
    author: {
      name: "Alex Smith",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 250,
  },
  {
    id: 6,
    title: "I will develop a WordPress website for your company",
    category: "Web Development",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600",
    rating: 4.88,
    reviews: 87,
    author: {
      name: "Maria Garcia",
      avatar: "https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 600,
  },
  {
    id: 7,
    title: "I will design a professional business card",
    category: "Print Design",
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&w=600",
    rating: 4.91,
    reviews: 65,
    author: {
      name: "John Doe",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 75,
  },
  {
    id: 8,
    title: "I will create engaging social media posts",
    category: "Social Media Design",
    image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&w=600",
    rating: 4.85,
    reviews: 102,
    author: {
      name: "Emily Clark",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&w=100&h=100&fit=crop",
    },
    price: 120,
  },
]

export function TrendingServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({})

  const handleLike = (id: number) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Optional: Scroll by card width on arrow click
  const scrollByCard = (direction: "left" | "right") => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollAmount = cardWidth + gap
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Trending Services</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Most viewed and all-time top-selling services</p>
          </div>
          {/* Navigation */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByCard("left")}
              className="rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByCard("right")}
              className="rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {/* Mobile Navigation below carousel */}
        </div>
        {/* Services Carousel */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-3 sm:pb-4 mb-6 sm:mb-8 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingServices.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/20 transition-shadow duration-300 bg-white dark:bg-gray-800 flex-shrink-0 w-64 sm:w-72 md:w-80 border-gray-200 dark:border-gray-700 snap-start"
            >
              <CardContent className="p-0">
                {/* Service Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(service.id)}
                    className={`absolute top-3 right-3 rounded-full text-gray-700 dark:text-gray-300
                      bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800
                      ${liked[service.id] ? "text-rose-500" : ""}
                    `}
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors duration-200 ${
                        liked[service.id] ? "fill-rose-500 text-rose-500" : ""
                      }`}
                      fill={liked[service.id] ? "#f43f5e" : "none"}
                    />
                  </Button>
                </div>
                {/* Service Content */}
                <div className="p-3 sm:p-4">
                  {/* Category Badge */}
                  <Badge
                    variant="secondary"
                    className="mb-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {service.category}
                  </Badge>
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 leading-tight text-sm sm:text-base">
                    {service.title}
                  </h3>
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{service.rating}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">({service.reviews} reviews)</span>
                  </div>
                  {/* Author and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={service.author.avatar || "/placeholder.svg"}
                          alt={service.author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{service.author.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Starting at</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">${service.price}</p>
                    </div>
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