import { AccountSecuritySettings } from "@/components/it-services/settings/account-security-settings"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AccountSecurityPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/it-services/settings"
            className="inline-flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Settings
          </Link>
        </div>
        <AccountSecuritySettings />
      </main>
    </div>
  )
}
