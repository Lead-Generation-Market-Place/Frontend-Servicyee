"use client"

import { useMemo } from "react"

const categories = [
  { name: "All Categories", active: false },
  { name: "Graphics & Design", active: true },
  { name: "Digital Marketing", active: false },
  { name: "Writing & Translation", active: false },
  { name: "Video & Animation", active: false },
  { name: "Music & Audio", active: false },
  { name: "Programming & Tech", active: false },
  { name: "Business", active: false },
  { name: "Lifestyle", active: false },
  { name: "Trending", active: false },
]

export function PopularCategoriesMenu({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string
  //eslint-disable-next-line
  onCategoryChange: (category: string) => void
}) {
  const items = useMemo(() => categories.map(c => c.name), [])

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto py-4">
          {items.map((name) => (
            <button
              key={name}
              onClick={() => onCategoryChange(name)}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === name
                  ? "text-emerald-600 border-b-2 border-emerald-600 pb-4"
                  : "text-gray-600 hover:text-gray-900 pb-4"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}