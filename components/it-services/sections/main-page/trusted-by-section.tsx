import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { Star } from "lucide-react"

export function TrustedBySection() {
  const features = [
    "Last Education of Bachelor Degree",
    "More Than 15 Years Experience",
    "12 Education Award Winning",
  ]

  // Use online user images (e.g., randomuser.me)
  const freelancers = [
    {
      name: "Marvin McKinney",
      role: "Designer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ralph Edwards",
      role: "Designer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Annette Black",
      role: "Designer",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Jane Cooper",
      role: "Designer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  // Featured freelancer image
  const featuredFreelancerAvatar =
    "https://randomuser.me/api/portraits/women/47.jpg"

  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Cards */}
          <div className="relative flex flex-col gap-6 items-center lg:items-stretch">
            {/* Freelancer List Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-5 sm:p-6 mb-4 sm:mb-8 w-full max-w-xs sm:max-w-sm mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg sm:text-xl">200+</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Verified Freelancer</span>
              </div>
              <div className="space-y-4">
                {freelancers.map((freelancer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{freelancer.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{freelancer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Freelancer Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-5 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto lg:ml-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 mb-4 space-y-3 sm:space-y-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={featuredFreelancerAvatar}
                    alt="Kristin Watson"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">Kristin Watson</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Dog Trainer</p>
                  <div className="flex items-center justify-center sm:justify-start mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 ml-1">4.9 (595 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                {["Figma", "Sketch", "HTML5"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">London</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Rate</p>
                  <p className="font-medium text-gray-900 dark:text-white">$90 / hr</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Job Success</p>
                  <p className="font-medium text-gray-900 dark:text-white">%98</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text and Features */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Trusted by Best Freelancer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 rounded-lg">
              See More
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
