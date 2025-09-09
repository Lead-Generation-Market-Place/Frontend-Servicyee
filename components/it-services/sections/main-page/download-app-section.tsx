import { Button } from "@/components/ui/button"

export function DownloadAppSection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br bg-white dark:bg-gray-900 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* App Mockups */}
          <div className="relative w-full flex justify-center mb-10 lg:mb-0">
            <div className="flex flex-col xs:flex-row items-center xs:space-x-4 space-y-4 xs:space-y-0">
              {/* Portfolio App Mockup */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-2 xs:p-4 transform rotate-3 xs:rotate-6 transition-colors w-64 max-w-[90vw]">
                <div className="bg-gray-900 dark:bg-gray-900 rounded-2xl p-4 w-60 xs:w-64 transition-colors">
                  <div className="flex justify-between items-center text-white text-sm mb-4">
                    <span>09:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-4">Portfolio</h3>
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4 mb-4">
                    <p className="text-white text-2xl font-bold">$49,329.77</p>
                    <p className="text-white/80 text-sm">Your balance is equivalent</p>
                  </div>
                </div>
              </div>

              {/* Trading App Mockup */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-2 xs:p-4 transform -rotate-2 xs:-rotate-3 transition-colors w-64 max-w-[90vw]">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 w-60 xs:w-64 transition-colors">
                  <div className="flex justify-between items-center text-gray-900 dark:text-white text-sm mb-4">
                    <span>09:41</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-900 dark:bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-900 dark:bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-900 dark:bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-gray-900 dark:text-white text-xl font-bold mb-4">Trading</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">₿</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">BTC</span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">$10,945.00</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-red-100 to-green-100 dark:from-red-900 dark:to-green-900 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-yellow-300 to-orange-300 dark:from-yellow-700 dark:to-orange-700 rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-orange-300 to-yellow-300 dark:from-orange-700 dark:to-yellow-700 rounded-full opacity-20 pointer-events-none"></div>
          </div>

          {/* Text and Download Buttons */}
          <div className="w-full">
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">Start today</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Download the App
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Take classes on the go with the realton app. Stream or download to watch on the plane, the subway, or
              wherever you learn best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              {/* Apple Store Button */}
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20 transition-all duration-300 transform hover:-translate-y-1 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.13997 6.91 8.85997 6.88C10.15 6.86 11.38 7.75 12.1 7.75C12.81 7.75 14.28 6.65 15.87 6.83C16.57 6.87 18.39 7.12 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Download on the</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">Apple Store</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Button>

              {/* Google Play Button */}
              <Button 
                variant="outline" 
                size="lg"
                className="group relative overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20 transition-all duration-300 transform hover:-translate-y-1 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Get it on</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">Google Play</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
