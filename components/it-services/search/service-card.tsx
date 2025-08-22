'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ServiceCardProps {
  service: {
    title: string
    seller: {
      name: string
      level: string
      rating: number
      reviewCount: number
      avatar: string
    }
    image: string
    price: number
    badges: string[]
    tags: string[]
  }
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const router = useRouter();
  const handleClick = ()=>{
    router.push("/it-services/service/")
  }
  return (
    <Card
    onClick={handleClick}
     className={`group hover:shadow-lg transition-shadow duration-200 cursor-pointer p-0 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${className ?? ""}`}>
      <CardContent className="p-0 ">
        {/* Service Image */}
        <div className="relative overflow-hidden rounded-t-lg ">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            width={400}
            height={192}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200 bg-gray-100 dark:bg-gray-800"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
          >
            <Heart className="w-4 h-4 text-gray-900 dark:text-gray-100" />
          </Button>
          {service.badges.length > 0 && (
            <div className="absolute top-3 left-3">
              {service.badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge === "Pro" ? "default" : "secondary"}
                  className={
                    badge === "Pro"
                      ? "bg-orange-500 text-white"
                      : badge === "Choice"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  }
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Seller Info */}
          <div className="flex items-center mb-3">
            <Image
              src={service.seller.avatar || "/placeholder.svg"}
              alt={service.seller.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full mr-2 bg-gray-200 dark:bg-gray-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{service.seller.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{service.seller.level}</p>
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 leading-5">{service.title}</h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 ml-1">{service.seller.rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({service.seller.reviewCount})</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Starting at</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">${service.price}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
