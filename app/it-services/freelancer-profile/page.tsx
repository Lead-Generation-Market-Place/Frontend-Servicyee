import { FreelancerProfileHeader } from "@/components/it-services/navigations/freelancer-profile-header"
import { FreelancerProfileContent } from "@/components/it-services/profiles/freelancer-profile-content"

export default function FreelancerProfilePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      <div className="max-w-6xl mx-auto px-4 py-8">
        <FreelancerProfileHeader />
        <FreelancerProfileContent />
      </div>
    </div>
  )
}
