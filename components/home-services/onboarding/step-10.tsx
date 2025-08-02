"use client";

import React, {  useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


export default function PaymentForm() {
  const [isPending] = useTransition();
  const router = useRouter();

  const handleNext = () => {
    router.push(`/home-services/services/step-11`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white text-[13px] px-4 md:px-8 py-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <section>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Payment</h2>
            <div className="lg:flex lg:items-start lg:gap-12">
              <form className="w-full rounded-[4px] border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Full name*</label>
                      <input type="text" required placeholder="John Doe" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0096C7] dark:bg-gray-800 dark:text-white text-sm" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Card number*</label>
                      <input type="text" required placeholder="xxxx-xxxx-xxxx-xxxx" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0096C7] dark:bg-gray-800 dark:text-white text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Expiration*</label>
                      <input type="text" required placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0096C7] dark:bg-gray-800 dark:text-white text-sm" />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">CVV*</label>
                      <input type="text" required placeholder="•••" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0096C7] dark:bg-gray-800 dark:text-white text-sm" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-2 bg-[#0077B6] text-white rounded hover:bg-[#005f8e] transition text-sm font-normal">Pay Now</button>
              </form>
            </div>

          </div>
        </section>

        <div className="fixed bottom-6 right-6 flex gap-4 text-[13px]">
        <button
          onClick={handleBack}
          type="button"
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white mt-6 py-2 px-5 rounded-[4px]"
        >
          Back
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={handleNext}
          className={`mt-6 py-2 px-6 rounded-[4px] flex items-center justify-center gap-2 text-white text-[13px] transition duration-300
            ${ isPending
              ? "bg-[#0077B6]/70 cursor-not-allowed"
              : "bg-[#0077B6] hover:bg-[#005f8e]"
            }`}
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>Next</span>
        </button>
      </div>
      </div>
    </div>
  );
}
