import { HeroSection } from "@/components/it-services/sections/main-page/hero-section"
import { LatestServiceSection  } from "@/components/it-services/sections/main-page/latest-services-section"
import FeaturedServicesSection from "@/components/it-services/sections/main-page/featured-services-section"
import { ServiceGrid } from "@/components/it-services/services/service-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <main className="flex-1">
        <HeroSection />
        <FeaturedServicesSection />
        <LatestServiceSection />
        <ServiceGrid />
      </main>
    </div>
  )
}
