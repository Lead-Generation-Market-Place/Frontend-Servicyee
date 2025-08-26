'use client'

import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ArrowRight, Code, Globe, Video, Cpu, Search, Building2, BookOpen } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites and web applications",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    darkBgGradient: "from-blue-950/20 to-cyan-950/20",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    icon: Code,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    darkBgGradient: "from-purple-950/20 to-pink-950/20",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Software Development",
    description: "Custom software solutions for your business",
    icon: Cpu,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    darkBgGradient: "from-green-950/20 to-emerald-950/20",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Digital Marketing",
    description: "SEO, SEM, and comprehensive digital strategies",
    icon: Search,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    darkBgGradient: "from-orange-950/20 to-red-950/20",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Video Production",
    description: "Professional video editing and production services",
    icon: Video,
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
    darkBgGradient: "from-indigo-950/20 to-purple-950/20",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "UI/UX Design",
    description: "User-centered design and prototyping",
    icon: Building2,
    gradient: "from-teal-500 to-blue-500",
    bgGradient: "from-teal-50 to-blue-50",
    darkBgGradient: "from-teal-950/20 to-blue-950/20",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center"
  },
  {
    title: "Content Creation",
    description: "Engaging content for all digital platforms",
    icon: BookOpen,
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
    darkBgGradient: "from-rose-950/20 to-pink-950/20",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center"
  }
]

export function PopularServices() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

  const scrollByAmount = (direction: "left" | "right") => {
    const el = carouselRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.8, 320)
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" })
  }

  const handleClick = (service:string)=>{
    router.push(`/it-services/search/?service=${service}`)
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-6">
          <h2 className="text-4xl font-bold mb-2">
            Popular Services
          </h2>
          <p>
            Discover our comprehensive range of professional IT services designed to elevate your digital presence
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={index}
                  className="flex-shrink-0 w-80 h-70 group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  onClick={()=>handleClick(service.title)}
                >
                  <CardContent className="p-0 h-full relative">   
                    {/* Background Image with Next.js Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-900/40 z-10"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Title and Description */}
                      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-200 text-sm mb-4 line-clamp-2">{service.description}</p>
                      
                      {/* CTA Button */}
                      <div className="flex items-center text-blue-300 group-hover:text-blue-200 transition-colors">
                        <span className="text-sm font-medium mr-2">Learn More</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-600"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-600"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
