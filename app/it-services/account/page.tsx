import { AccountHero } from "@/components/it-services/account/account-hero"
import { RecommendationCards } from "@/components/it-services/account/recommendation-cards"
import { ServiceRecommendations } from "@/components/it-services/account/service-recommendations"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-4">
      <main>
        <AccountHero />
        <div className="max-w-7xl mx-auto  py-8 space-y-12">
          <RecommendationCards />
          <ServiceRecommendations />
        </div>
      </main>
    </div>
  )
}
