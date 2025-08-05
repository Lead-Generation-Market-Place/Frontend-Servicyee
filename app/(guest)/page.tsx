import React from 'react';
import HomeClient from '@/components/guest/client-pages/HomeClient'
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/header";


const HomePage = () => {
  return (
    <>
      <Header />
      <HomeClient />
      <Footer />
    </>
  );
}

export default HomePage;
