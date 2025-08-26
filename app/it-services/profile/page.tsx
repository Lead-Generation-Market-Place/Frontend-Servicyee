
import { ProfileSidebar } from "@/components/it-services/navigations/profile-sidebar"
import { ProfileContent } from "@/components/it-services/profiles/profile-content"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Notification Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-500 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-blue-400 dark:text-blue-300 mr-3" />
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-100">
                <strong>This is your profile when ordering services.</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                For your freelancer profile click{" "}
                <Link
                  href="/freelancer-profile"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  here
                </Link>
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <X className="h-4 w-4" />
            <span className="ml-1">Dismiss</span>
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-200">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-100">My Profile</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
          <div className="lg:col-span-2">
            <ProfileContent />
          </div>
        </div>
      </div>
    </div>
  )
}
