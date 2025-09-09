import { CategoryFAQ } from "@/components/it-services/category/categories/category-faq"
import { CategoryGrid } from "@/components/it-services/category/categories/category-grid"
import { CategoryGuides } from "@/components/it-services/category/categories/category-guides"
import { CategoryHero } from "@/components/it-services/category/categories/category-hero"
import { RelatedTags } from "@/components/it-services/category/categories/related-tags"

export default function ProgrammingTechPage() {
  return (
    <div className="min-h-screen bg-background">
      <CategoryHero />
      <CategoryGrid />
      <CategoryGuides />
      <CategoryFAQ />
      <RelatedTags />
    </div>
  )
}
