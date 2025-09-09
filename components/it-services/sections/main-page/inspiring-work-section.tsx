"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"

const workShowcases = [
  {
    id: 1,
    title: "E-commerce Website Design",
    author: "Ali Tufan",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=600",
    category: "Web Design",
  },
  {
    id: 2,
    title: "Mobile App UI/UX",
    author: "Sara Lee",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=600",
    category: "Mobile Design",
  },
  {
    id: 3,
    title: "Brand Identity Package",
    author: "John Smith",
    authorImage: "https://randomuser.me/api/portraits/men/65.jpg",
    image: "https://images.pexels.com/photos/669365/pexels-photo-669365.jpeg?auto=compress&w=600",
    category: "Branding",
  },
  {
    id: 4,
    title: "Dashboard Interface",
    author: "Emily Clark",
    authorImage: "https://randomuser.me/api/portraits/women/68.jpg",
    image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&w=600",
    category: "UI Design",
  },
  {
    id: 5,
    title: "Landing Page Design",
    author: "Michael Brown",
    authorImage: "https://randomuser.me/api/portraits/men/75.jpg",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=600",
    category: "Web Design",
  },
  {
    id: 6,
    title: "Logo Design Collection",
    author: "Sophia Turner",
    authorImage: "https://randomuser.me/api/portraits/women/12.jpg",
    image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&w=600",
    category: "Logo Design",
  },
]

export function InspiringWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive scroll: get card width dynamically based on screen size
  const scrollByCard = (direction: "left" | "right") => {
    if (containerRef.current) {
      // Find the first child that is an element node (Card)
      const firstCard = Array.from(containerRef.current.children).find(
        (el) => el.nodeType === 1
      ) as HTMLElement | undefined
      const cardWidth = firstCard?.offsetWidth || 0
      // Responsive gap: 16px (gap-4) on mobile, 24px (gap-6) on md+
      const gap =
        window.innerWidth < 640
          ? 16
          : 24
      const scrollAmount = cardWidth + gap
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Inspiring Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Discover amazing projects created by our talented freelancers
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 px-0"
          >
            See more
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => scrollByCard("left")}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 rounded-full border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => scrollByCard("right")}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>

          {/* Showcase Cards */}
          <div
            ref={containerRef}
            className="
              flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory
              -mx-2 px-2
              "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {workShowcases.map((showcase) => (
              <Card
                key={showcase.id}
                className="
                  group hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-black/20 transition-all duration-300
                  bg-white dark:bg-gray-800 flex-shrink-0
                  w-64 xs:w-72 sm:w-80 md:w-96
                  border-gray-200 dark:border-gray-700 snap-start overflow-hidden relative
                "
                style={{
                  minWidth: "16rem", // fallback for w-64
                  maxWidth: "100vw",
                }}
              >
                {/* Full Image Container covers all card */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={showcase.image || "/placeholder.svg"}
                    alt={showcase.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 320px"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                </div>
                <CardContent className="p-0 relative z-10 h-full">
                  {/* User Info Overlay */}
                  <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
                    {/* Category Badge - Top Left */}
                    <div className="flex justify-start">
                      <span className="text-xs px-2 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-md backdrop-blur-sm">
                        {showcase.category}
                      </span>
                    </div>

                    {/* User Info - Bottom */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white/80 dark:border-gray-300/80">
                        <Image
                          src={showcase.authorImage || "/placeholder.svg"}
                          alt={showcase.author}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 text-white">
                        <h3 className="font-semibold text-xs sm:text-sm line-clamp-1 drop-shadow-lg">{showcase.title}</h3>
                        <p className="text-xs text-white/90 drop-shadow-md">by {showcase.author}</p>
                      </div>
                    </div>
                  </div>
                  {/* Spacer to maintain card height */}
                  <div className="aspect-[4/3] w-full invisible" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
