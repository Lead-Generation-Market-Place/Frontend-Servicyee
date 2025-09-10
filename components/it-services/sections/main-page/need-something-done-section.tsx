import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function NeedSomethingDoneSection() {
  const services = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 7H21L19 19H5L3 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3 7L2 3H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: "Post a job",
      description: "It's free and easy to post a job. Simply fill in a title, description.",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 8V14L17 11L20 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Choose freelancers",
      description: "It's free and easy to post a job. Simply fill in a title, description.",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: "Pay safely",
      description: "It's free and easy to post a job. Simply fill in a title, description.",
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      title: "We're here to help",
      description: "It's free and easy to post a job. Simply fill in a title, description.",
    },
  ]

  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Need something done?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever
            </p>
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 rounded-lg dark:bg-emerald-700 dark:hover:bg-emerald-800">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center p-2 sm:p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-emerald-600 dark:text-emerald-400">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
