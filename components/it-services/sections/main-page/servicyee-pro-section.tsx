import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "Dedicated hiring experts",
    description: "Count on an account manager to find you the right talent and see to your project's every need.",
  },
  {
    title: "Satisfaction guarantee",
    description: "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
  },
  {
    title: "Advanced management tools",
    description: "Seamlessly integrate freelancers into your team and projects.",
  },
  {
    title: "Flexible payment models",
    description: "Pay per project or opt for hourly rates to work the way you want.",
  },
]

export function ServicyeeProSection() {
  return (
    <section className="py-16 bg-[#e8faf4] dark:bg-gray-900 text-black dark:text-white transition-colors">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl bg-white dark:bg-gray-950 border border-green-100 dark:border-green-900/40 p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-green-100 dark:bg-green-900/20"></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-extrabold">Servicyee</span>
                <span className="px-2 py-1 rounded text-2xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">pro.</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4 ">
                The <span className="text-green-500 dark:text-green-400">premium</span> freelance
                <br />
                solution for businesses
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors">
                Try Servicyee Pro
              </Button>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop"
                alt="Servicyee Pro"
                width={1000}
                height={800}
                className="w-full h-80 md:h-96 object-cover rounded-xl shadow-xl bg-white dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
