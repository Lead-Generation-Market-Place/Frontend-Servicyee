"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"
import { OverviewStep } from "./overview-step"
import { PricingStep } from "./pricing-step"
import { DescriptionStep } from "./description-step"
import { RequirementsStep } from "./requirements-step"
import { GalleryStep } from "./gallery-step"
import { PublishStep } from "./publish-step"

export function ServiceCreationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    overview: {},
    pricing: {},
    description: {},
    requirements: {},
    gallery: {},
  })

  const steps = [
    { id: "overview", title: "Overview", component: OverviewStep },
    { id: "pricing", title: "Pricing", component: PricingStep },
    { id: "description", title: "Description & FAQ", component: DescriptionStep },
    { id: "requirements", title: "Requirements", component: RequirementsStep },
    { id: "gallery", title: "Gallery", component: GalleryStep },
    { id: "publish", title: "Publish", component: PublishStep },
  ]

  const CurrentStepComponent = steps[currentStep].component
  const completionRate = Math.round(((currentStep + 1) / steps.length) * 100)

  const handleNext = (data?: any) => {
    if (data) {
      const stepKey = steps[currentStep].id
      setFormData((prev) => ({ ...prev, [stepKey]: data }))
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="container max-w-screen-xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Progress Steps */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2 pb-2 sm:pb-0">
              <div className="flex flex-wrap items-center gap-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      onClick={() => handleStepClick(index)}
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[36px] sm:min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 disabled:opacity-60 ${
                        index < currentStep
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : index === currentStep
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      } ${index <= currentStep ? "cursor-pointer" : "cursor-not-allowed"}`}
                      disabled={index > currentStep}
                      aria-current={index === currentStep ? "step" : undefined}
                      aria-label={`Step ${index + 1}: ${step.title}`}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs">
                        {index < currentStep ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <span>{index + 1}</span>}
                      </div>
                      <span className="inline max-w-[120px] truncate text-[11px] sm:text-sm sm:max-w-none">{step.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className="hidden sm:block w-4 sm:w-6 lg:w-8 h-px bg-gray-200 dark:bg-gray-600 mx-0.5 sm:mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Rate */}
            <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <span className="whitespace-nowrap">Completion: {completionRate}%</span>
              <div className="w-24 sm:w-32">
                <Progress value={completionRate} className="h-1.5 sm:h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <CurrentStepComponent
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </main>
    </div>
  )
}
