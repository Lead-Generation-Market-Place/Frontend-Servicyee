'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const popularSearches = [
  'website development',
  'architecture & interior design',
  'UGC videos',
  'video editing',
  'voice artist'
];

const trustedCompanies = [
  'Meta',
  'Google',
  'Netflix',
  'P&G',
  'PayPal',
  'Payoneer'
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter()

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background video overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
          style={{ opacity: 0.8 }}
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
            Our freelancers
            <br />
            <span className="text-[#1dbf73]">will take it from here</span>
          </h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search for any service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 pl-4 pr-12 border-1 rounded-l-md focus:ring-2  border-gray-700 focus:ring-[#1dbf73]"
              />
              <Button 
                size="lg"
                className="bg-[#1dbf73] hover:bg-[#19a463] text-white px-6 rounded-r-md rounded-l-none h-12"
                onClick={()=>{
                  router.push(`/it-services/search/?query=${searchQuery}`)
                }}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mb-12">
            <span className="text-sm text-gray-300 mb-3 block">Popular searches:</span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          {/* Trusted by companies */}
          <div>
            <span className="text-sm text-gray-300 mb-4 block">Trusted by:</span>
            <div className="flex flex-wrap items-center gap-6">
              {trustedCompanies.map((company, index) => (
                <div key={index} className="text-white/70 font-medium text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}