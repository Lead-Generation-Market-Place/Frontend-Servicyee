"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"

export function LoginForm() {
  return (
    <div className="max-w-6xl mx-auto shadow-lg rounded-lg bg-green-800 dark:bg-green-900 transition-colors">
      <div className="flex">
        {/* Left Section - Hero/Promotional */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-800 to-red-900 dark:from-red-900 dark:to-red-950 relative overflow-hidden">
          <div className="flex flex-col justify-center px-8 lg:px-12 py-16 text-white relative z-10 w-full">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
              Success starts here
            </h1>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-red-800 dark:text-red-400" />
                </div>
                <span className="text-lg lg:text-xl text-white font-medium">Over 700 categories</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-red-800 dark:text-red-400" />
                </div>
                <span className="text-lg lg:text-xl text-white font-medium">Quality work done faster</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-red-800 dark:text-red-400" />
                </div>
                <span className="text-lg lg:text-xl text-white font-medium">
                  Access to talent and businesses across the{" "}
                  <span className="text-blue-400 dark:text-blue-300">globe</span>
                </span>
              </div>
            </div>

            <div className="relative mt-auto">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80"
                alt="Professional woman working on laptop"
                width={500}
                height={400}
                className="rounded-lg w-full max-w-md shadow-2xl"
                priority
              />
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-700 dark:bg-red-950 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600 dark:bg-red-900 rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 lg:px-12 py-16 bg-white dark:bg-gray-900 transition-colors">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign in to your account</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <Link href="/it-services/register" className="text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-medium underline">
                  Join here
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-12 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 justify-start text-left font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 justify-start text-left font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Continue with email/username
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-3 text-gray-400 dark:text-gray-500 font-medium">OR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 justify-start text-left font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Apple
                </Button>

                <Button
                  variant="outline"
                  className="h-12 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 justify-start text-left font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center md:text-left">
              By joining, you agree to the{" "}
              <Link href="/terms" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and to occasionally receive emails from us. Please read our{" "}
              <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline font-medium">
                Privacy Policy
              </Link>{" "}
              to learn how we use your personal data.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
