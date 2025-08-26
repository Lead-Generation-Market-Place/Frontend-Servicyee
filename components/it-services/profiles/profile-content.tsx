import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, MessageCircle, Star } from "lucide-react"

export function ProfileContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 flex items-center text-gray-900 dark:text-gray-100">
          Hi 👋 Lets help freelancers get to know you
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          Get the most out of Servicyee by sharing a bit more about yourself and how you prefer to work with freelancers.
        </p>
      </div>

      {/* Profile Checklist */}
      <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">Profile checklist</CardTitle>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">35%</span>
          </div>
          <Progress value={35} className="w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex flex-col xs:flex-row items-start xs:items-center flex-1">
              <Target className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0 mb-2 xs:mb-0" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-base sm:text-lg">Share how you plan to use Servicyee</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tell us if you are here to find services or offer them.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0 flex">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                Add
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex flex-col xs:flex-row items-start xs:items-center flex-1">
              <MessageCircle className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0 mb-2 xs:mb-0" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-base sm:text-lg">Set your communication preferences</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let freelancers know your collaboration preferences.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">50%</span>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">Reviews from freelancers</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
          <div className="mb-4">
            <div className="inline-flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
            irfankhan0101 does not have any reviews yet.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
