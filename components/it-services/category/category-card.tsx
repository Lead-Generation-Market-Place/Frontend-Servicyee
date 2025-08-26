import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link";

type Category = {
    icon: LucideIcon,
    title: string;
    description: string;
}

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <Link href={"/it-services/search/"}>
            <Card className="group cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 h-36 sm:h-44 flex">
                <CardContent className="flex flex-col items-center text-center p-3 sm:p-4 w-full justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-green-100 dark:group-hover:bg-green-900 transition-colors">
                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400" />
                    </div>
                    <h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 mb-1 leading-tight">{category.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{category.description}</p>
                </CardContent>
            </Card>
        </Link>
    )
}