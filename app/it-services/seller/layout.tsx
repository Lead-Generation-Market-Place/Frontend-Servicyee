import Sidebar from "@/components/it-services/navigations/seller-sidebar";
import React from "react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationItems: Array<{
    label: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { label: string; href: string }[];
    icon?: "layout" | "book" | "wrench" | "cart" | "dollar";
  }> = [
    { label: "Dashboard", href: "/it-services/seller", icon: "layout" },
    { label: "Services", href: "/it-services/seller/services", icon: "wrench" },
    { label: "Orders", href: "/it-services/seller/orders", icon: "cart" },
    { label: "Earnings", href: "/it-services/seller/earnings", icon: "dollar" },
    // {
    //   label: "Growth & Marketing",
    //   href: "/growth",
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { label: "Promote Gigs", href: "/growth/promote" },
    //     { label: "Marketing Tools", href: "/growth/tools" },
    //     { label: "SEO", href: "/growth/seo" },
    //     { label: "Social Media", href: "/growth/social" },
    //   ],
    // },
    {
      label: "Profile & Settings",
      href: "/analytics",
      hasDropdown: true,
      dropdownItems: [
        { label: "Profile", href: "/it-services/profile" },
        { label: "Billing", href: "/it-services/seller/billing" },
        { label: "Settings", href: "/it-services/seller/settings" },
        { label: "Messages", href: "/it-services/seller/messages" },
        { label: "Logout", href: "/it-services/seller/logout" },
      ],
    },
  ];
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto bg-gray-50">
        <div className=" px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative overflow-hidden rounded-2xl border bg-emerald-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-6 sm:p-10">
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">Welcome to Your Freelance Dashboard</h1>
                <p className="text-gray-700 mb-6 max-w-xl">Manage your freelance business with ease and efficiency.</p>
              </div>
              <div className="relative h-40 sm:h-48 md:h-60 lg:h-72">
               
                <Image
                  src="/assets/it-services/hero.png"
                  alt="Online Illustration"
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar + Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar component */}
          <aside className="lg:col-span-3">
            <Sidebar items={navigationItems} />
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9 ">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}