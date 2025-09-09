import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"

interface CategoryHeroProps {
  category: string
  description: string
  illustration: string
  gradient?: string
}

// eslint-disable-next-line
export function CategoryHero({ category, description, illustration, gradient = "from-orange-50 to-pink-50" }: CategoryHeroProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} py-16`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category}</h1>
            <p className="text-lg text-gray-600 mb-8">{description}</p>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Play className="h-4 w-4" />
              <span>How Freelio Works</span>
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <Image
              src={illustration}
              alt={`${category} illustration`}
              className="max-w-md h-auto"
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