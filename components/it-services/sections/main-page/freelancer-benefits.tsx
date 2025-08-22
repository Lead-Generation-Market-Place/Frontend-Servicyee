import { Button } from "@/components/ui/button"
import { Users, MessageCircle, DollarSign, Clock } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Access a pool of top talent",
    description: "Browse 700+ categories",
  },
  {
    icon: MessageCircle,
    title: "Enjoy a simple, easy-to-use matching experience",
    description: "Get quality work done quickly",
  },
  {
    icon: DollarSign,
    title: "Get quality work done quickly and within budget",
    description: "Pay a fair price",
  },
  {
    icon: Clock,
    title: "Only pay when you're happy",
    description: "Work with confidence",
  },
]

export function FreelancerBenefits() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-950 text-black dark:text-white transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-3xl lg:text-3xl font-heading mb-8 sm:mb-12 ">
          Make it all happen with freelancers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-gray-900 dark:text-white mb-1 sm:mb-2 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 text-sm sm:text-base transition-colors">
            Join Servicyee
          </Button>
        </div>
      </div>
    </section>
  )
}
