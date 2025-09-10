import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface CategoryCardProps {
  icon: LucideIcon
  skillCount: string
  title: string
  description: string
  href:string
}

export function CategoryCard({ icon: Icon, href, skillCount, title, description }: CategoryCardProps) {
  return (
   <Link href={`/it-services/search/?category=${href}`}> 
    <div className="group p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-600 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-emerald-900/20 transition-all duration-300 cursor-pointer">
      <div className="flex flex-col items-start space-y-4">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
          <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{skillCount}</p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
   </Link>
  )
}
