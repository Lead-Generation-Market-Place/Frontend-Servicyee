import { BillingTabs } from "@/components/it-services/billing/billing-tabs"

export default function BillingPage() {
  return (
    <div className="bg-white dark:bg-gray-950 dark:text-white p-8">
  
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:bg-gray-950 dark:text-white ">Billing and payments</h1>
        </div>

        <BillingTabs />
      </div>
    </div>
  )
}
