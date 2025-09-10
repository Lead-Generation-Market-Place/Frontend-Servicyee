import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

interface CategoryHeroProps {
  category: string
  description: string
  illustration: string
  gradient?: string
}

export function CategoryHero({ category, description, illustration, gradient = "from-orange-50 to-pink-50" }: CategoryHeroProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} py-8 sm:py-12 lg:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="flex-1 max-w-lg">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{category}</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">{description}</p>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent text-sm sm:text-base">
              <Play className="h-4 w-4" />
              <span>How Freelio Works</span>
            </Button>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <Image
              src={illustration}
              alt={`${category} illustration`}
              className="max-w-xs sm:max-w-sm lg:max-w-md h-auto"
              width={400}
              height={300}
              style={{ objectFit: "contain" }}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  )
}