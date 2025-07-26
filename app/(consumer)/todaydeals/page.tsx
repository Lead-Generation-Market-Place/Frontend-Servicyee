'use client'
import React from "react";

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4  bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Content Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-[6px] p-8 md:p-8 text-center max-w-2xl w-full mx-4  border dark:border-gray-600">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#023E8A] dark:text-[#48CAE4] mb-6">
                    Coming Soon
                </h1>

                {/* Subtitle */}
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-md mx-auto">
                    We are crafting something extraordinary. Stay tuned for updates!
                </p>

                {/* Animated Progress Circle */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-gray-600"></div>
                        <div
                            className="absolute inset-0 rounded-full border-4 border-transparent"
                            style={{
                                borderTopColor: '#0077B6',
                                animation: 'spin 2s linear infinite',
                            }}
                        ></div>
                    </div>
                </div>

                {/* Email Notification CTA */}
                <div className="mt-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Notify me when it is ready</p>
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 text-[13px] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#0096C7] dark:focus:ring-[#48CAE4] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                        />
                        <button
                            className="px-6 py-2 bg-[#0077B6] text-white rounded-[4px] hover:bg-[#0096C7] transition-colors text-[13px] dark:hover:bg-[#00B4D8]"
                            style={{
                                background: 'linear-gradient(to right, #0077B6, #0096C7)'
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom animation */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ComingSoon;