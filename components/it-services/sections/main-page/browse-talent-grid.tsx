import { Code, Palette, TrendingUp, Languages, Mic, Play, Building, Calculator } from "lucide-react"
import { CategoryCard } from "@/components/it-services/category/category-card"

const categories = [
  {
    icon: Code,
    skillCount: "1853 skills",
    title: "Development & IT",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: Palette,
    skillCount: "1853 skills",
    title: "Design & Creative",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: TrendingUp,
    skillCount: "1853 skills",
    title: "Digital Marketing",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: Languages,
    skillCount: "1853 skills",
    title: "Writing & Translation",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: Mic,
    skillCount: "1853 skills",
    title: "Music & Audio",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: Play,
    skillCount: "1853 skills",
    title: "Video & Animation",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: Building,
    skillCount: "1853 skills",
    title: "Engineering & Architecture",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
  {
    icon: Calculator,
    skillCount: "1853 skills",
    title: "Finance & Accounting",
    description: "Software Engineer, Web / Mobile Developer & More",
  },
]

export function BrowseTalentGrid() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse Service by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Get some inspirations from 1800+ skills
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center self-start sm:self-auto text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors text-sm sm:text-base"
          >
            All Categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              skillCount={category.skillCount}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}