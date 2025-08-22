'use client'

import { Button } from "@/components/ui/button"

export function PromotionalSection() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="bg-[#c55e7c] grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden min-h-[400px] items-center">
          {/* Video - Mobile: top, Desktop: right */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-md md:max-w-none h-48 md:h-64 rounded-lg opacity-80"
            >
              <source src="/assets/it-services/home/popular-services/vibe-coding.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text Content - Mobile: bottom, Desktop: left */}
          <div className="order-2 md:order-1 relative z-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-3 sm:mb-4">
              Stuck at vibe coding?
            </h2>
            <p className="text-sm sm:text-lg mb-4 sm:mb-6 opacity-90">
              Get matched with the right expert to turn your problems into a task working solution.
            </p>
            <Button size="lg" className="bg-white hover:bg-gray-100 font-semibold text-sm sm:text-base">
              Find an expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
