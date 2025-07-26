import MenuBar from "@/app/shared/header/Menubar/page";
import Footer from "@/app/shared/Footer/page";


import React from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <MenuBar/>
      {children}
      <Footer/>
    </div>
  );
}
