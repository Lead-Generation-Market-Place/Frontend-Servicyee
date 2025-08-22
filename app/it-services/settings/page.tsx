import { SettingsCards } from "@/components/it-services/settings/settings-cards"

export default function SettingsPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Account settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Irfanullah Dhark (irfanullahdhark@gmail.com)</p>
          </div>
          <a
            href="/it-services/profile"
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
          >
            Go to profile
          </a>
        </div>
        <SettingsCards />
      </main>
    </div>
  )
}
