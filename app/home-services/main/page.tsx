import HeroSection from '@/components/root/HeroSection'
import Footer from "@/components/navigation/Footer/page";
import MenuBar from "@/components/navigation/header/Menubar/page";
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