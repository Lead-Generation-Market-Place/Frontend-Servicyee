import { HeroSection } from "@/components/it-services/sections/main-page/hero-section"
import { ServiceCategories } from "@/components/it-services/sections/main-page/service-categories"
import { PopularServices } from "@/components/it-services/sections/main-page/popular-services"
import { PromotionalSection } from "@/components/it-services/sections/main-page/promotional-section"
import { ServicyeeProSection } from "@/components/it-services/sections/main-page/servicyee-pro-section"
import { SuccessStories } from "@/components/it-services/sections/main-page/success-stories"
import { TrustedServices } from "@/components/it-services/sections/main-page/trusted-services"
import { FreelancerBenefits } from "@/components/it-services/sections/main-page/freelancer-benefits"
import MadeOnServicyee from "@/components/it-services/sections/main-page/made-on-servicyee"
import HomeCta from "@/components/it-services/sections/main-page/home-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <ServiceCategories />
        <PopularServices />
        <PromotionalSection />
        <ServicyeeProSection />
        <SuccessStories />
        <TrustedServices />
        <FreelancerBenefits />
        <MadeOnServicyee />
        <HomeCta />
      </main>
    </div>
  )
}
