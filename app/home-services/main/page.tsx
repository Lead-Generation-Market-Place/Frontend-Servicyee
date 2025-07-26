import HeroSection from '@/components/root/HeroSection'
import Footer from "@/app/shared/Footer/page";
import MenuBar from "@/components/header/Menubar/page";
import React from 'react'

const page = () => {
    return (
        <div>
            <MenuBar />
            <HeroSection />
            <Footer />
        </div>
    )
}

export default page