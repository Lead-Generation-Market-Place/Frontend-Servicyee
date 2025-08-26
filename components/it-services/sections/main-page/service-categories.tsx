import { Code, Palette, Globe, PenTool, Video, Music, Briefcase, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import CategoryCard from "@/components/it-services/category/category-card"

const categories = [
  {
    icon: Code,
    title: "Programming & Tech",
    description: "Software development",
  },
  {
    icon: Palette,
    title: "Graphics & Design",
    description: "Creative design",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description: "Online promotion",
  },
  {
    icon: PenTool,
    title: "Writing & Translation",
    description: "Content creation",
  },
  {
    icon: Video,
    title: "Video & Animation",
    description: "Motion graphics",
  },
  {
    icon: Music,
    title: "Music & Audio",
    description: "Sound production",
  },
  {
    icon: Briefcase,
    title: "Business",
    description: "Consulting services",
  },
  {
    icon: TrendingUp,
    title: "AI Services",
    description: "Artificial intelligence",
  },
]

export function ServiceCategories() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((category, index) => {
            return (
              <CategoryCard key={index} category={category}/>
            )
          })}
        </div>

        <div className="flex justify-center mt-6 sm:hidden">
          <Button
            variant="ghost"
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm"
          >
            View 1 more
          </Button>
        </div>
      </div>
    </section>
  )
}
