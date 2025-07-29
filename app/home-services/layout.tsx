
import React from "react";
import { SidebarProvider } from "../../components/providers/context/SidebarContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
          <SidebarProvider>{children}</SidebarProvider>
      
    </div>
  );
}
