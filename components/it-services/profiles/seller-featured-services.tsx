"use client"

import { ServiceCard } from "@/components/it-services/services/service-card"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {  ChevronLeft, ChevronRight } from "lucide-react"

export function SellerFeaturedServices() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      id: 3,
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&w=600",
      category: "Design & Creative",
      title: "I will build a fully responsive design in HTML,CSS, bootstrap...",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Sophie Lee",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      price: 983,
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&w=600",
      category: "Web & App Design",
      title: "I will do mobile app development for ios and android",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Carlos Vega",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      price: 983,
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600",
      category: "Web & App Design",
      title: "I will design modern websites in figma or adobe xd",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Mia Chen",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      price: 983,
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&w=600",
      category: "Web & App Design",
      title: "I will design modern websites in figma or adobe xd",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Wanda Runo",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      price: 983,
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/3861973/pexels-photo-3861973.jpeg?auto=compress&w=600",
      category: "Design & Creative",
      title: "I will build a fully responsive design in HTML,CSS, bootstrap...",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Ali Tufan",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      price: 983,
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/3861974/pexels-photo-3861974.jpeg?auto=compress&w=600",
      category: "Web & App Design",
      title: "I will do mobile app development for ios and android",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Carlos Vega",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      price: 983,
    },
    {
      id: 9,
      image: "https://images.pexels.com/photos/3861975/pexels-photo-3861975.jpeg?auto=compress&w=600",
      category: "Web & App Design",
      title: "I will design modern websites in figma or adobe xd",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Mia Chen",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      price: 983,
    },
    {
      id: 10,
      image: "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&w=600",
      category: "Web & App Design",
      title: "I will design modern websites in figma or adobe xd",
      rating: 4.82,
      reviews: 94,
      author: {
        name: "Sophie Lee",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      price: 983,
    },
  ]

  const nextSlide = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollAmount = cardWidth + gap
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 4))
  }

  const prevSlide = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollAmount = cardWidth + gap
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
    setCurrentSlide(
      (prev) => (prev - 1 + Math.ceil(services.length / 4)) % Math.ceil(services.length / 4),
    )
  }

  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className=" max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Services</h2>
            <p className="text-gray-600 dark:text-gray-400">Most viewed and all-time top-selling services</p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(services.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide 
                      ? "bg-emerald-500 dark:bg-emerald-400" 
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 mb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((item,index)=>(
            <ServiceCard key={index} service={item} />
          ))}
        </div>
      </div>
    </section>
  )
}