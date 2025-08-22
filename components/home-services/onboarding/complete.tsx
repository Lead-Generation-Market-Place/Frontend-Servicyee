'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const ProfessionalProfile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isLoading, setIsLoading] = useState(false);

  const profileData = {
    name: "Servicyee",
    title: "San Francisco, CA",
    rating: 4.8,
    reviews: 128,
    about: "Creative designer with 8+ years of experience crafting beautiful digital experiences. Specializing in user-centered design systems and interactive prototypes.",
    stats: [
      { label: "Projects", value: 87 },
      { label: "Clients", value: 42 },
      { label: "Experience", value: "8 yrs" }
    ],
    services: [
      { name: "UI/UX Design", description: "Custom interface design for web and mobile" },
      { name: "Prototyping", description: "Interactive prototypes to test concepts" },
      { name: "User Research", description: "In-depth user interviews and testing" },
      { name: "Design System", description: "Comprehensive design systems for teams" },
      { name: "Brand Identity", description: "Complete brand identity packages" }
    ],
    reviewsData: [
      { author: "Sarah Johnson", rating: 5, comment: "Alex delivered exceptional work on our mobile app redesign. Highly recommended!" },
      { author: "Michael Tan", rating: 4, comment: "Great attention to detail and very professional." }
    ]
  };

  const tabs = ['Profile', 'Reviews', 'Preferences', 'Location', 'Payment', 'Background'];

  const handleNext = () => {
    setIsLoading(true);
  };

  return (
    <div className=" dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-20 h-20 rounded-full bg-[#0077B6] flex items-center justify-center">
              <span className="text-2xl font-bold text-white">AC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-[#0077B6] dark:text-[#48CAE4]">{profileData.title}</p>
              <div className="flex items-center mt-1">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-sm">{profileData.rating} ({profileData.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-1.5 border border-[#0077B6] text-[#0077B6] dark:text-[#48CAE4] hover:bg-[#0077B6] hover:text-white dark:hover:bg-[#0077B6]/20 rounded-[4px] font-normal transition duration-300">
              Share
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="border-b border-gray-300 dark:border-gray-700 mb-6 overflow-x-auto">
          <div className="flex space-x-8 min-w-full text-sm px-1 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-[#0077B6] dark:text-[#48CAE4] border-b-2 border-[#0077B6] dark:border-[#48CAE4]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        {/* Card Container */}
        <div className=" dark:border-gray-700 rounded-[7px]  overflow-hidden">
          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className="p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                {/* Left Content */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{profileData.about}</p>

                  <h2 className="text-xl font-bold mb-4">Services</h2>
                  <div className="space-y-4">
                    {profileData.services.map((service, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-[4px] hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200"
                      >
                        <h3 className="font-medium text-sm">{service.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-[4px] p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium mb-3">Stats</h3>
                    <div className="space-y-4">
                      {profileData.stats.map((stat, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{stat.label}</span>
                          <span className="font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-[4px] p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium mb-3">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">{profileData.title}</p>
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-[4px] flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Map Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'Reviews' && (
            <div className="p-6 sm:p-8 md:p-10">
              <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {profileData.reviewsData.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{review.author}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder Tabs */}
          {activeTab !== 'Profile' && activeTab !== 'Reviews' && (
            <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-200 dark:border-gray-700">
                <svg
                  className="w-8 h-8 text-[#0077B6] dark:text-[#48CAE4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">{activeTab} Section</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                This section would contain detailed {activeTab.toLowerCase()} information and settings.
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleNext}
            className={`text-white text-sm py-2 px-6 rounded-[4px] transition duration-300 flex items-center justify-center gap-2 ${
              isLoading ? 'bg-[#0077B6]/70 cursor-not-allowed' : 'bg-[#0077B6] hover:bg-[#005f8e]'
            }`}
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
