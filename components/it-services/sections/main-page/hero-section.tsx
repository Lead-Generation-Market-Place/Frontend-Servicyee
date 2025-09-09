'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ThumbsUp, Shield, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const statistics = [
  { value: '834M', label: 'Total Freelancer' },
  { value: '732M', label: 'Positive Review' },
  { value: '90M', label: 'Order recieved' },
  { value: '236M', label: 'Projects Completed' }
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter()
 
  return (
    <section className="relative bg-[#204c3f] text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh]">
      {/* Topographic contour lines background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topographic" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Contour lines */}
              <path d="M0,20 Q25,15 50,20 T100,20" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              <path d="M0,40 Q25,35 50,40 T100,40" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              <path d="M0,60 Q25,55 50,60 T100,60" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              <path d="M0,80 Q25,75 50,80 T100,80" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              
              {/* Vertical contour lines */}
              <path d="M20,0 Q15,25 20,50 T20,100" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              <path d="M40,0 Q35,25 40,50 T40,100" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              <path d="M60,0 Q55,25 60,50 T60,100" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              <path d="M80,0 Q75,25 80,50 T80,100" stroke="white" strokeWidth="1.3" fill="none" opacity="0.3"/>
              
              {/* Diagonal contour lines */}
              {/* <path d="M0,0 Q25,25 50,50 T100,100" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
              <path d="M100,0 Q75,25 50,50 T0,100" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/> */}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topographic)" />
        </svg>
      </div>
      
      {/* Additional background pattern overlay */}
      <div className="absolute inset-0 opacity-10 hidden md:block">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Find the perfect freelance services for your business.
            </h1>
            
            <p className="text-base sm:text-lg text-white/90 max-w-xl">
              Work with talented people at the most affordable price to get the most out of your time and cost.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <div className="py-2 px-2 sm:px-4 flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full overflow-hidden shadow-lg gap-2 md:gap-0">
                <div className="flex-1 flex items-center px-3 sm:px-4">
                  <Search className="hidden sm:block h-5 w-5 text-gray-400 mr-3" />
                  <Input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus:ring-0 text-gray-900 placeholder-gray-500 w-full"
                  />
                </div>
               
                <Button 
                  size="lg"
                  className="bg-[#1dbf73] hover:bg-[#19a463] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-full w-full md:w-auto"
                  onClick={()=>{
                    router.push(`/it-services/search/?query=${searchQuery}`)
                  }}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative">
            {/* Main image container */}
            <div className="relative bg-transparent rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="relative">
                <div className="w-full h-auto rounded-xl overflow-hidden">
                  <Image
                    src="/assets/it-services/home/hero.png"
                    alt="Freelancers working"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-xl"
                    priority
                  />
                </div>
                
                {/* Overlaid Cards */}
                <div
                  className="hidden md:block absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg max-w-48"
                  style={{
                    animation: 'slideX 4s ease infinite alternate'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#1dbf73]/20 p-2 rounded-lg">
                      <ThumbsUp className="h-4 w-4 text-[#1dbf73]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Proof of quality</div>
                      <div className="text-gray-500 text-xs">Lorem Ipsum Dolar Amet</div>
                    </div>
                  </div>
                </div>

                <div
                  className="hidden md:block absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg max-w-48"
                  style={{
                    animation: 'slideY 4s ease infinite alternate'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-[#1dbf73]/20 p-2 rounded-lg">
                      <Shield className="h-4 w-4 text-[#1dbf73]" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Safe and secure</div>
                      <div className="text-gray-500 text-xs">Lorem Ipsum Dolar Amet</div>
                    </div>
                  </div>
                </div>
                <style jsx>{`
                  @keyframes slideX {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(20px);
                    }
                  }
                  @keyframes slideY {
                    0% {
                      transform: translateY(0);
                    }
                    100% {
                      transform: translateY(20px);
                    }
                  }
                `}</style>
              </div>
            </div>

            {/* Happy Clients Section */}
            <div
              className="hidden md:block absolute -bottom-6 left-8 bg-white rounded-lg p-4 shadow-lg"
              style={{
                animation: 'slideX 4s ease infinite alternate'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">58M+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                      {i === 5 ? (
                        <Plus className="h-3 w-3 text-gray-600" />
                      ) : (
                        <div className="text-xs text-gray-600">U</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}