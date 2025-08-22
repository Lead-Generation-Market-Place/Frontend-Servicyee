'use client'

import { Badge } from "@/components/ui/badge"
import { ServiceCard } from "@/components/it-services/search/service-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const topServicesData = [
  {
    id: 1,
    title: "I will develop a full stack web application using react and node js",
    seller: {
      name: "techexpert_dev",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.9,
      reviewCount: 127,
    },
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    price: 25,
    badges: ["Choice"],
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title:
      "I will create a responsive website with modern design and functionality",
    seller: {
      name: "webmaster_pro",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 5.0,
      reviewCount: 89,
    },
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
    price: 50,
    badges: ["Pro"],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    title:
      "I will build a custom web application with database integration",
    seller: {
      name: "fullstack_guru",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      level: "Level 1",
      rating: 4.8,
      reviewCount: 203,
    },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    price: 75,
    badges: [],
    tags: ["PHP", "MySQL", "Laravel"],
  },
  {
    id: 4,
    title:
      "I will develop a modern e-commerce website with payment integration",
    seller: {
      name: "ecom_specialist",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.9,
      reviewCount: 156,
    },
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    price: 100,
    badges: ["Choice"],
    tags: ["Shopify", "WooCommerce", "Stripe"],
  },
  // Added records
  {
    id: 5,
    title: "I will create a full stack application with real-time features",
    seller: {
      name: "realtime_dev",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 4.9,
      reviewCount: 94,
    },
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop",
    price: 80,
    badges: ["Pro"],
    tags: ["Socket.io", "Express", "Vue.js"],
  },
  {
    id: 6,
    title: "I will build a scalable web application using modern technologies",
    seller: {
      name: "scale_master",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.7,
      reviewCount: 178,
    },
    image:
      "https://images.unsplash.com/photo-1561070791-2526d41294ab?w=300&h=200&fit=crop",
    price: 120,
    badges: [],
    tags: ["Next.js", "PostgreSQL", "AWS"],
  },
  {
    id: 7,
    title:
      "I will create a professional portfolio website with animations",
    seller: {
      name: "portfolio_pro",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: "Top Rated",
      rating: 4.9,
      reviewCount: 134,
    },
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
    price: 65,
    badges: ["Choice"],
    tags: ["Portfolio", "Animations", "Modern Design"],
  },
  {
    id: 8,
    title: "I will develop a REST API with comprehensive documentation",
    seller: {
      name: "api_master",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      level: "Level 2",
      rating: 4.8,
      reviewCount: 87,
    },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    price: 55,
    badges: [],
    tags: ["REST API", "Documentation", "Node.js"],
  },
]

export default function TopServices() {
  return (
    <section className="my-10 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Badge className="bg-emerald-600 text-white dark:bg-emerald-700 dark:text-emerald-100">
          Recomended By Servicyee
        </Badge>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Services that people loved for superb work and delivery
        </h2>
      </div>

      <Carousel
        opts={{ align: "start", loop: false }}
        className="relative"
      >
        <CarouselContent>
          {topServicesData.map((service) => (
            <CarouselItem
              key={service.id}
              className="basis-full md:basis-1/2 xl:basis-1/4"
            >
              <ServiceCard service={service as any} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
      </Carousel>
    </section>
  )
}