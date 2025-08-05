"use client";

// import { useSidebar } from "@/components/providers/context/SidebarContext";
// import AppHeader from "@/components/navigation/ProfessionalLayout/AppHeader";
// import AppSidebar from "@/components/navigation/ProfessionalLayout/AppSidebar";

import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isExpanded, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  // const mainContentMargin = isMobileOpen
  //   ? "ml-0"
  //   : isExpanded
  //   ? "lg:ml-[290px]"
  //   : "lg:ml-[90px]";

  return (
    <div className="">{children}</div>
    // <div className=" xl:flex">
    //   {/* Sidebar and Backdrop */}
    //   <AppSidebar isServiceProvider />
    //   {/* Main Content Area */}
    //   <div
    //     className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
    //   >
    //     {/* Header */}
    //     <AppHeader />
    //     {/* Page Content */}
    //     <div className="p-4 mx-auto max-w-[var(--breakpoint-2xl)] md:p-6 bg-white text-black dark:bg-gray-900 dark:text-white">
    //       {children}
    //     </div>
    //   </div>
    // </div>
  );
}
