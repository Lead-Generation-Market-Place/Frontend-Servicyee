"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Monitor, User, Store } from "lucide-react"

interface OnboardingOverviewProps {
  onNext: () => void
  onBack: () => void
}
// eslint-disable-next-line
export function OnboardingOverview({ onNext, onBack }: OnboardingOverviewProps) {
  return (
    <div className="bg-background">
     
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ready to start selling on Servicyee?</h1>
              <h2 className="text-xl text-muted-foreground mb-8">Heres the breakdown:</h2>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Learn what makes a successful profile</h3>
                  <p className="text-muted-foreground">
                    Discover the dos and donts to ensure youre always on the right track.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Create your seller profile</h3>
                  <p className="text-muted-foreground">
                    Add your profile picture, description, and professional information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Publish your Service</h3>
                  <p className="text-muted-foreground">
                    Create a Service of the service youre offering and start selling instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button onClick={onNext} className="bg-green-600 hover:bg-green-700 text-white px-8">
                Continue
              </Button>
            </div>
          </div>

          {/* Right Side - Profile Preview */}
          <div className="flex justify-center">
            <div className="bg-green-600 p-8 rounded-lg relative">
              <Card className="bg-white p-6 max-w-sm">
                <div className="text-center space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="w-20 h-20 rounded-full bg-pink-200 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/professional-woman-smiling.png"
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Online
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Daneik</h3>
                    <p className="text-gray-600 text-sm">Singer & Songwriter</p>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-4 h-4 text-yellow-400 fill-current">
                        ⭐
                      </div>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">5 (10 reviews)</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
