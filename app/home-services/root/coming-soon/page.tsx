'use client'
import React, { useState, useEffect } from "react";

const UnderDevelopment = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate progress loading
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(timer);
          return prev;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4  bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Content Card */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-[6px] p-8 md:p-12 text-center max-w-2xl w-full mx-4 border dark:border-gray-600">
        {/* Title */}
        <h1 className="text-2xl md:text-5xl font-bold text-[#023E8A] dark:text-[#48CAE4] mb-6">
          Under Development
        </h1>
        
        {/* Subtitle */}
        <p className="text-md text-gray-700 dark:text-gray-300 mb-10 max-w-md mx-auto">
          We are building something amazing for you!
        </p>
        
        {/* Progress Display */}
        <div className="mb-8">
          {/* Circular Progress */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            {/* Background circle */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Track */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="8"
                className="dark:stroke-gray-600"
              />
              {/* Progress */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#0077B6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                transform="rotate(-90 50 50)"
                className="transition-all duration-500 ease-out dark:stroke-[#48CAE4]"
              />
            </svg>
            {/* Percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-[#023E8A] dark:text-[#48CAE4]">
                {progress}%
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-[#0077B6] to-[#0096C7] dark:from-[#0096C7] dark:to-[#00B4D8] h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Development progress</p>
        </div>
        
        {/* Features List */}
        <div className="mb-8 text-left max-w-md mx-auto">
          <h3 className="font-semibold text-[#023E8A] dark:text-[#48CAE4] mb-3">Current focus:</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {[
              "Backend API integration",
              "UI/UX refinements", 
              "Performance optimization",
              "Security enhancements"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <svg 
                  className="flex-shrink-0 h-5 w-5 text-[#00B4D8] dark:text-[#90E0EF] mr-2 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
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
              className="px-6 py-2 bg-[#0077B6] text-white rounded-[4px] hover:bg-[#0096C7] dark:hover:bg-[#00B4D8] transition-colors text-[13px]"
              style={{
                background: 'linear-gradient(to right, #0077B6, #0096C7)'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;