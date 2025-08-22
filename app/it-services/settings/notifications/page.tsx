import { NotificationsSettings } from "@/components/it-services/settings/notifications-settings"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/it-services/settings"
            className="inline-flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Account settings
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Select the notifications you want and how you&apos;d like to receive them. When necessary, we&apos;ll send essential
            account and order notifications.
          </p>
        </div>
        <NotificationsSettings />
      </main>
    </div>
  )
}
