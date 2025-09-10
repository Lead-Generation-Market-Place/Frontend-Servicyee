"use client"

import { ServiceCard } from "@/components/it-services/services/service-card"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function SellerFeaturedServices() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleCards, setVisibleCards] = useState(4)
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

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 768) {
        setVisibleCards(2)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3)
      } else {
        setVisibleCards(4)
      }
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  const nextSlide = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollAmount = (cardWidth + gap) * visibleCards
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / visibleCards))
  }

  const prevSlide = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollAmount = (cardWidth + gap) * visibleCards
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
    setCurrentSlide(
      (prev) => (prev - 1 + Math.ceil(services.length / visibleCards)) % Math.ceil(services.length / visibleCards),
    )
  }

  const goToSlide = (index: number) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const scrollAmount = (cardWidth + gap) * visibleCards * index
      containerRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
    }
    setCurrentSlide(index)
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Services</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Most viewed and all-time top-selling services</p>
          </div>

          {/* Navigation - Hidden on mobile, shown on sm and up */}
          <div className="hidden sm:flex items-center gap-4 ml-auto sm:ml-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots - Hidden on mobile, shown on sm and up */}
            <div className="hidden sm:flex gap-2">
              {Array.from({ length: Math.ceil(services.length / visibleCards) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
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
              className="rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Services Carousel */}
        <div 
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 mb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((item) => (
            <div key={item.id} className="snap-start flex-shrink-0 w-[calc(100%-32px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]">
              <ServiceCard service={item} />
            </div>
          ))}
        </div>

        {/* Navigation dots - Always visible at bottom */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(services.length / visibleCards) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide 
                  ? "bg-emerald-500 dark:bg-emerald-400" 
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}