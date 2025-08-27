"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, Briefcase, MessageSquare } from "lucide-react"

interface OnboardingGuidelinesProps {
  onNext: () => void
  onBack: () => void
}

export function OnboardingGuidelines({ onNext, onBack }: OnboardingGuidelinesProps) {
  return (
    <div className="bg-background">
    

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&w=800&q=80"
                alt="Modern office workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Now, lets talk about the things you want to steer clear of.
              </h1>
              <p className="text-muted-foreground text-lg">
                Your success on Servicyee is important to us. Avoid the following to keep in line with our community
                standards:
              </p>
            </div>

            {/* Guidelines */}
            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Providing any misleading or inaccurate information about your identity.
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center">
                    <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Opening duplicate accounts. Remember, you can always create more Services.
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Soliciting other community members for work on Servicyee.
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Requesting to take communication and payment outside of Servicyee.
                  </h3>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 text-white px-8">
                Continue
              </Button>
              <Button variant="ghost" onClick={onBack} className="text-blue-600 hover:text-blue-700">
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
