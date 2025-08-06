import HeroSection from '@/components/guest/sections/home/HeroSection'
import Trending from '@/components/guest/sections/home/Tending';
import TrendingGift from '@/components/guest/sections/home/TrendingGift';
import React from 'react'

const HomeCleint = () => {
    return (
        <div>
            <HeroSection />
            <TrendingGift />
            <Trending />
        </div>
    )
}

export default HomeCleint