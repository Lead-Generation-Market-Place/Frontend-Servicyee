"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Check } from "lucide-react"

interface OnboardingCompleteProps {
  onNext: () => void
  onBack: () => void
}
// eslint-disable-next-line
export function OnboardingComplete({ onNext, onBack }: OnboardingCompleteProps) {
  const [showModal, setShowModal] = useState(true)

  const features = [
    "Guided onboarding",
    "Keyword research",
    "ID verification",
    "AI-generated Service feedback",
    "Promotions: Up to 5 orders/month",
    "Coupons: 5/month",
    "Follow-up messages: 5/month",
    "Buyer activity insights",
    "Priority support",
    "Live walkthrough sessions",
    "Tips and insights",
  ]

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background overlay when modal is open */}
      {showModal && <div className="fixed inset-0 bg-black/50 z-40" />}


      {/* Background Content */}
      <div className="container mx-auto px-4 py-12 max-w-2xl opacity-50">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Account Security</h1>
            <p className="text-muted-foreground">
              Trust and safety is a big deal in our community. Please verify your email and phone number so that we can
              keep your account secured.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">Private</p>
                </div>
              </div>
              <span className="text-sm text-green-600 bg-green-50 dark:bg-green-950 px-3 py-1 rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-background border border-border shadow-2xl">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div></div>
                <Button variant="ghost" size="sm" onClick={() => setShowModal(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Its official... Youre Servicyee newest freelancer!
                  </h2>
                  <p className="text-muted-foreground">
                    Nows a great time to join Seller Plus Kickstart, our program for freelancers who are new to Servicyee.
                    Access the benefits you need to help you get your first order faster.
                  </p>
                </div>

                {/* Pricing Card */}
                <Card className="border border-border p-6 text-left">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">Kickstart your business</h3>
                    <Badge
                      variant="secondary"
                      className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                    >
                      Plus
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">$15</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Fast-track your success with Seller Plus Kickstarts exclusive tools and resources.
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Create a Service
                    </Button>
                    <Button className="flex-1 bg-black hover:bg-gray-800 text-white">Join now</Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
