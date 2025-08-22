"use client"

import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchFilters } from "@/components/it-services/filters/search-filters"

export function SearchHeader() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "full stack development"

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for any service..."
                defaultValue={query}
                className="h-12 pl-4 pr-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-900 text-white transition-colors"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            className="lg:hidden bg-transparent dark:bg-transparent border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Results Info */}
        <div className="mt-4 grid gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
              Results for `{query}`
            </h1>
          </div>

          {/* filter and sort option */}
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <SearchFilters />
            </div>
            {/* Sort Options */}
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Sort by:</span>
              <select className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
                <option>Best Selling</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
