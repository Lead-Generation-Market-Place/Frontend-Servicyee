'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ShowModal from "@/components/ui/show-modal";

export default function Example() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const values: Record<string, any> = {};

        data.forEach((value, key) => {
            values[key] = value;
        });

        setFormData(values);
        setShowModal(true);
    };

    const confirmSubmit = () => {
        setIsSubmitting(true);
        setShowModal(false);

        // Simulate server delay
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/home-services/services')

        }, 2000);
    };


    return (
        <>
            <ShowModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Please confirm your information"
                type="info"
                size="lg"
                actions={
                    <>
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-[4px] transition-all duration-200"
                        >
                            Edit Information
                        </button>
                                                 <button
                             onClick={confirmSubmit}
                             disabled={isSubmitting}
                             className="inline-flex items-center gap-2 rounded-[4px] bg-[#0077B6] hover:bg-[#35a5e1] dark:bg-[#0077B6] dark:hover:bg-[#35a5e1] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                         >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Confirm & Submit
                        </button>
                    </>
                }
            >
                <div className="space-y-6">
                                         {/* Profile Header */}
                     <div className="text-center mb-8">
                         <div className="w-20 h-20 bg-gradient-to-br from-[#0077B6] to-[#35a5e1] rounded-full flex items-center justify-center mx-auto mb-4">
                             <span className="text-white text-2xl font-bold">
                                 {formData['username'] ? formData['username'][0].toUpperCase() : 'B'}
                             </span>
                         </div>
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                             {formData['username'] || 'Business Profile'}
                         </h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400">
                             {formData['first-name'] && formData['last-name'] 
                                 ? `${formData['first-name']} ${formData['last-name']}` 
                                 : 'Business Account'
                             }
                         </p>
                     </div>

                    {/* Information Sections */}
                    <div className="space-y-6">
                                                 {/* Business Information */}
                         <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[4px] p-6">
                             <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                 <div className="w-2 h-2 bg-[#0077B6] dark:bg-[#35a5e1] rounded-full"></div>
                                 Business Information
                             </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(formData).filter(([key]) => 
                                    ['username', 'category', 'country', 'street-address', 'city', 'region', 'postal-code', 'website'].includes(key)
                                ).map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            {key.replaceAll('-', ' ')}
                                        </span>
                                        <span className="text-sm text-gray-900 dark:text-white font-medium mt-1">
                                            {value as string || 'Not provided'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[4px] p-6">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Personal Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(formData).filter(([key]) => 
                                    ['first-name', 'last-name', 'email', 'phone'].includes(key)
                                ).map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            {key.replaceAll('-', ' ')}
                                        </span>
                                        <span className="text-sm text-gray-900 dark:text-white font-medium mt-1">
                                            {value as string || 'Not provided'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ShowModal>
            <form onSubmit={handlePreview} className="max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-md p-12 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-8">
                    <div className="border-b border-gray-900/10 dark:border-gray-700 pb-6">
                        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Business Information:</h2>
                        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-300">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            {/* Business Name */}
                            <div className="sm:col-span-3">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Business Name:</label>
                                <div className="mt-1.5">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            {/* Business Type */}
                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Business Type</label>
                                <div className="mt-1.5">
                                    <Select name="category">
                                        <SelectTrigger className="w-full text-[13px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="home-services">Home Services</SelectItem>
                                            <SelectItem value="it-services">IT Services</SelectItem>
                                            <SelectItem value="food-delivery">Food Delivery</SelectItem>
                                            <SelectItem value="shopping">Shopping</SelectItem>
                                            <SelectItem value="grocery">Grocery</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Country */}
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Country</label>
                                <div className="mt-1.5">
                                    <Select name="country">
                                        <SelectTrigger className="w-full text-[13px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                            <SelectValue placeholder="Select country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="United States">United States</SelectItem>
                                            <SelectItem value="Canada">Canada</SelectItem>
                                            <SelectItem value="Others">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Street Address */}
                            <div className="sm:col-span-3">
                                <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Street address</label>
                                <div className="mt-1.5">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            {/* City */}
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900 dark:text-white">City</label>
                                <div className="mt-1.5">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            {/* State */}
                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900 dark:text-white">State / Province</label>
                                <div className="mt-1.5">
                                    <input
                                        id="region"
                                        name="region"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            {/* ZIP */}
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900 dark:text-white">ZIP / Postal code</label>
                                <div className="mt-1.5">
                                    <input
                                        id="postal-code"
                                        name="postal-code"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            {/* Website */}
                            <div className="col-span-full">
                                <label htmlFor="website" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Website or Social Media</label>
                                <div className="mt-1.5">
                                    <input
                                        id="website"
                                        name="website"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white mt-4">Personal Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-300">Please enter your personal details and contact information!</p>

                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">First name</label>
                                <div className="mt-1.5">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Last name</label>
                                <div className="mt-1.5">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Email Address</label>
                                <div className="mt-1.5">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <div className="mt-1.5">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        className="block w-full text-[13px] rounded-[4px] bg-white dark:bg-gray-900 px-3 py-1.5 text-gray-900 dark:text-white outline-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900 dark:text-white">Cancel</button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-[4px] bg-[#0077B6] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#35a5e1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077B6]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    )
}
