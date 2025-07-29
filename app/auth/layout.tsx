import Footer from "@/components/navigation/Footer/page";
import MenuBar from "@/components/navigation/header/Menubar/page";
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
