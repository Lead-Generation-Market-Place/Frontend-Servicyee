'use client'

import React, { useState, useCallback, FormEvent } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { ImagePlus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ProgressBar } from "@/components/home-services/dashboard/onboarding/ProgressBar";

const ONBOARDING_STEPS = [
  { id: 1, name: 'Services' },
  { id: 2, name: 'Profile' },
  { id: 3, name: 'Reviews' },
  { id: 4, name: 'Preferences' },
];

const DEFAULT_LOGO = '/service_profile.jpg'
const MAX_LOGO_SIZE = 2 * 1024 * 1024 // 2MB

const BusinessInfo = () => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const [currentStep] = useState(2);

  const [formData, setFormData] = useState({
    businessName: 'Acme Services',
    founded: '2015',
    employees: '10',
    businessType: 'company' as 'company' | 'handyman' | 'Sub-Contractor',
    streetAddress: '123 Main St',
    suite: 'Suite 200',
    state: 'CA',
    postalCode: '90210',
    about: 'We have been providing quality services for over 8 years with a team of skilled professionals dedicated to customer satisfaction.'
  })
  console.log(setFormData)

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    const file = acceptedFiles[0]

    if (file.size > MAX_LOGO_SIZE) {
      setErrors(prev => ({
        ...prev,
        image: 'Logo must be smaller than 2MB'
      }))
      return
    }

    setLogoFile(file)
    setPreview(URL.createObjectURL(file))

    setErrors(prev => {
      const updated = { ...prev }
      delete updated.image
      return updated
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  })

  const handleRemove = () => {
    setLogoFile(null)
    setPreview(null)
    setErrors(prev => {
      const updated = { ...prev }
      delete updated.image
      return updated
    })
  }



  const handleBusiness = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!formData.businessName) newErrors.businessName = 'Business Name is required'
    if (formData.about && formData.about.length < 40) newErrors.about = 'Please enter at least 40 characters'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsPending(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Business Profile Successfully added.")
      router.push('/home-services/dashboard/services/step-5')
    } catch  {
      toast.error("Failed to save business info. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div>
      <ProgressBar
        currentStep={currentStep}
        totalSteps={ONBOARDING_STEPS.length}
        steps={ONBOARDING_STEPS}
        className="mb-8"
      />
      <form onSubmit={handleBusiness} className="mx-6">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Business Profile Setup
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This information is visible to customers looking for services.
          </p>

          {/* Logo Upload */}
          <div className="sm:col-span-1 mt-6">
            <label
              htmlFor="logoUpload"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Business Profile (Logo)
            </label>

            <div
              {...getRootProps()}
              id="logoUpload"
              className={`
                relative w-36 h-36 border-2 border-dashed rounded-full bg-gray-50 dark:bg-gray-800
                flex items-center justify-center cursor-pointer transition-colors
                ${isDragActive
                  ? 'border-blue-500 bg-blue-100 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-600 hover:border-[#0077B6]'
                }`}
            >
              <input
                {...getInputProps({ name: 'image', id: 'logoUpload' })}
                aria-label="Upload business logo"
              />

              <Image
                src={preview || DEFAULT_LOGO}
                alt="Logo Preview"
                fill
                className="object-cover rounded-full shadow-sm"
                sizes="144px"
              />

              <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex flex-col items-center justify-center space-y-2 transition-opacity">
                {logoFile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove()
                    }}
                    className="text-white bg-red-600 px-3 py-1 rounded text-xs font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    open()
                  }}
                  className="flex items-center gap-1 text-white bg-[#0077B6] px-3 py-1 rounded text-xs font-semibold hover:bg-[#004fb6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ImagePlus className="w-4 h-4" />
                  {logoFile ? 'Change' : 'Upload'}
                </button>
              </div>
            </div>

            {errors.image && (
              <p className="mt-1 text-red-600 text-[12px]">{errors.image}</p>
            )}
          </div>

          {/* ...Rest of your form remains unchanged... */}
          {/* ...Business name, address, about, and action buttons are already correct... */}
        </section>

        <div className="fixed bottom-6 right-6 flex gap-4 text-[13px] ">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white text-[13px] py-2 px-5 rounded-[4px] font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`
              text-white text-[13px] py-2 px-6 rounded-[4px]
              transition duration-300 flex items-center justify-center gap-2
              ${isPending ? 'bg-[#0077B6]/70 cursor-not-allowed' : 'bg-[#0077B6] hover:bg-[#005f8e]'}
            `}
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>Next</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default BusinessInfo
