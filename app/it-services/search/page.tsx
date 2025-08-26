import { Suspense } from "react"
import { SearchResults } from "@/components/it-services/search/search-results"
import { SearchHeader } from "@/components/it-services/navigations/search-header"

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1 bg-white  dark:bg-gray-950 py-16">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchHeader />
          <div className="container mx-auto px-4 ">
            <div className="grid ">
              <div className="flex-1">
                <SearchResults />
              </div>
            </div>
          </div>
        </Suspense>
      </main>
    </div>
  )
}
