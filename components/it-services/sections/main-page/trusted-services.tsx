import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const services = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
    title: "3D Industrial Design",
    description: "Product modeling",
    color: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    title: "E-commerce Website Development",
    description: "Online store creation",
    color: "bg-green-50 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3178/3178158.png",
    title: "Email Marketing",
    description: "Campaign management",
    color: "bg-purple-50 hover:bg-purple-100 dark:bg-purple-900 dark:hover:bg-purple-800"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2972/2972543.png",
    title: "Press Releases",
    description: "Media outreach",
    color: "bg-orange-50 hover:bg-orange-100 dark:bg-orange-900 dark:hover:bg-orange-800"
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    title: "Logo Design",
    description: "Brand identity",
    color: "bg-pink-50 hover:bg-pink-100 dark:bg-pink-900 dark:hover:bg-pink-800"
  },
]

export function TrustedServices() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-3xl font-heading mb-2">Vontelles trusted services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {services.map((service, index) => (
            <Link href={"/it-services/search/"} key={index}>
                  <Card
              className={`${service.color} cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0`}

            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
                <h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white mb-1 leading-tight">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {service.description}
                </p>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
