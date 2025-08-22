'use client'

export function SuccessStories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 text-black dark:text-white transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading mb-4">What success on Servicyee looks like</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
          Millions of people use Servicyee to turn their ideas into reality.
        </p>

        <div className="relative rounded-2xl overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-[450px] object-cover"
          >
            <source src="/assets/it-services/success-stories/success-story.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center transition-colors">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-l-[24px] border-r-0 border-t-[16px] border-b-[16px] border-l-white border-t-transparent border-b-transparent ml-1"></div>
              </div>
              <p className="text-lg font-medium">We need to scale our business</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
