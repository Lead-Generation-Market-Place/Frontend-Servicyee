import { HeroSection } from "@/components/it-services/sections/main-page/hero-section"
import { BrowseTalentGrid } from "@/components/it-services/sections/main-page/browse-talent-grid"
import { SuccessStories } from "@/components/it-services/sections/main-page/success-stories"
import MadeOnServicyee from "@/components/it-services/sections/main-page/made-on-servicyee"
import HomeCta from "@/components/it-services/sections/main-page/home-cta"
import { PopularServiceSection } from "@/components/it-services/sections/main-page/popular-services-section"
import { LatestServiceSection  } from "@/components/it-services/sections/main-page/latest-services-section"
import { NeedSomethingDoneSection } from "@/components/it-services/sections/main-page/need-something-done-section"
import { TrustedBySection } from "@/components/it-services/sections/main-page/trusted-by-section"
import { DownloadAppSection } from "@/components/it-services/sections/main-page/download-app-section"
import { InspiringWorkSection } from "@/components/it-services/sections/main-page/inspiring-work-section"
import TopFreelancer from "@/components/it-services/sections/main-page/top-freelancer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <BrowseTalentGrid />
        <PopularServiceSection />
        <NeedSomethingDoneSection />
        <SuccessStories />
        <LatestServiceSection />
        <TrustedBySection />
        <TopFreelancer />
        <InspiringWorkSection />
        <MadeOnServicyee />
        <DownloadAppSection />
        <HomeCta />
      </main>
    </div>
  )
}
