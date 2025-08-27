"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User, MessageCircle, FileText } from "lucide-react"

interface OnboardingIntroProps {
  onNext: () => void
  onBack: () => void
}

export function OnboardingIntro({ onNext, onBack }: OnboardingIntroProps) {
  return (
    <div className=" bg-background">
     

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Professional working on laptop"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                What makes a successful Servicyee profile?
              </h1>
              <p className="text-muted-foreground text-lg">
                Your first impression matters! Create a profile that will stand out from the crowd on Servicyee.
              </p>
            </div>

            {/* Success Tips */}
            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Take your time in creating your profile so its exactly as you want it to be.
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Add credibility by linking out to your relevant professional networks.
                  </h3>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Accurately describe your professional skills to help you get more work.
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
