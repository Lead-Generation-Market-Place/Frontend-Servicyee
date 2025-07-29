'use client'

import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"

// Dynamically import login component
const Register = dynamic(() => import("@/components/auth/register/page").then(mod => mod.default))

export default function LoginPage() {
  return (
    <div className="grid bg-white dark:bg-gray-900 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-4">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex py-4 items-center justify-center">
          <div className="w-full max-w-xs">
            <Register />
          </div>
        </div>
      </div>
<div className="relative lg:block max-w-full">
  <Image
    src="/assets/root/register.png"
    width={1000}
    height={900}
    alt="Image"
    className="w-full h-auto object-cover "
  />
</div>

    </div>
  )
}
