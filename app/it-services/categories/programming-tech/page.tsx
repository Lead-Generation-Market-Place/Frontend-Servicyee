import { CategoryFAQ } from "@/components/it-services/category/categories/category-faq"
import { CategoryGrid } from "@/components/it-services/category/categories/category-grid"
import { CategoryHero } from "@/components/it-services/category/categories/category-hero"
import { RelatedTags } from "@/components/it-services/category/categories/related-tags"

export default function ProgrammingTechPage() {
  return (
    <div className="min-h-screen bg-background">
      <CategoryHero />
      <CategoryGrid />
      <CategoryFAQ />
      <RelatedTags />
    </div>
  )
}
