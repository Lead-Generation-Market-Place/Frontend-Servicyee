// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { Plus, Info, ChevronRight, TrendingUp, Wallet, Zap, Target, Sparkles, CheckCircle, MapPin, Users, Star, Settings } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/providers/context/auth-context";
import { useGetServices } from "@/hooks/useServices";
import { getAccessToken } from "@/app/api/axios";
import ServicesList from "./ServiceList";

// Type definitions
interface Location {
  country?: string;
  city?: string;
  state?: string;
  address_line?: string;
}

interface Service {
  _id: string;
  service_name: string;
  service_status: boolean;
  completed_tasks: number;
  totalLeads: number;
  pricing_type: string;
  location_ids: Location[];
  createdAt: string;
  updatedAt: string;
}



export default function Dashboard() {
  const { user } = useAuth();
  const token = getAccessToken() || "";
  const id = user?.user?._id || "";
  const { data } = useGetServices(token, id);
  const [services, setServices] = useState<Service[]>(data?.services?.services || []);
  React.useEffect(() => {
    if (data?.services?.services) {
      setServices(data.services.services);
    }
  }, [data]);

  const incompleteSetups = data?.services?.professional?.step < 9 ? 1 : 0;
  const isProfessionalSetupComplete = data?.services?.professional?.step >= 8;
  const businessCountry = data?.services?.services?.[0]?.location_ids?.[0]?.country || "";
  const businessCity = data?.services?.services?.[0]?.location_ids?.[0]?.city || "";
  const businessState = data?.services?.services?.[0]?.location_ids?.[0]?.state || "";
  const businessAddress = data?.services?.services?.[0]?.location_ids?.[0]?.address_line || "";
  const locationParts = [businessAddress, businessCity, businessState, businessCountry].filter(Boolean);
  const displayLocation = locationParts.length > 0 ? locationParts.join(", ") : "Add your business location";
  const stats = [
    {
      title: "Services",
      value: services?.length || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Avg. Rating",
      value: data?.services?.professional?.rating_avg || 0,
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Total Reviews",
      value: data?.services?.professional?.total_review || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Setup Status",
      value: incompleteSetups === 0 ? "Complete" : "In Progress",
      icon: Settings,
      color: incompleteSetups === 0 ? "text-green-600" : "text-amber-600",
      bgColor: incompleteSetups === 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-amber-50 dark:bg-amber-900/20"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-3 py-1.5 border border-gray-200 dark:border-gray-700 mb-3">
                <Zap className="w-3 h-3 text-[#0077B6]" />
                <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                  {isProfessionalSetupComplete ? "Business Active" : "Setup Required"}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {data?.services?.professional?.business_name || "Your Business"}
              </h1>
              <p className="text-[13px] text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {displayLocation}
              </p>
            </div>
            <Link
              href="/home-services/dashboard/services/businessAvailability"
              className="inline-flex items-center px-3 py-1.5 text-[13px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm text-[#0077B6] hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <Settings className="w-3.5 h-3.5 mr-2" />
              Business Settings
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-sm p-4 sm:p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-sm ${stat.bgColor}`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  {incompleteSetups === 0 && stat.title === "Setup Status" && (
                    <Sparkles className="w-4 h-4 text-[#0077B6] animate-pulse" />
                  )}
                </div>
                <h3 className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 sm:gap-4 lg:gap-6">
          {/* Main Content - Services Section */}
          <div className="xl:col-span-2 space-y-3 sm:space-y-6 lg:space-y-8">
            {/* Services Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-sm p-3 sm:p-4 lg:p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[13px] font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#0077B6]" />
                  Your Services
                </h2>
                <span className="text-[13px] text-gray-500 dark:text-gray-400">
                  {services.filter(s => s.service_status).length} Active
                </span>
              </div>

              <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-6">
                Manage your service offerings, set preferences, and optimize your visibility to attract more clients.
              </p>



              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/professional"
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-[#0077B6] text-white text-[13px] font-medium rounded-sm hover:bg-[#005f91] transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Service
                </Link>
                {services.length > 3 && (
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-[13px] font-medium rounded-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View All Services
                  </Link>
                )}
              </div>

            </motion.div>

        <ServicesList data={data} />

          </div>
          

          {/* Sidebar */}
          <div className="space-y-3 sm:space-y-6 lg:space-y-8">
            {/* Activity This Week */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-sm p-3 sm:p-4 lg:p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0077B6]" />
                 Activity
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Credits Spent", value: "0", color: "text-blue-600" },
                  { label: "New Leads", value: services.reduce((acc, service) => acc + (service.totalLeads || 0), 0).toString(), color: "text-green-600" },
                  { label: "Profile Views", value: "0", color: "text-purple-600" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-600 dark:text-gray-400">{stat.label}</span>
                    <span className={`text-[13px] font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Link
                  href="#"
                  className="inline-flex items-center text-[13px] text-[#0077B6] hover:text-[#005f91] transition-colors"
                >
                  View Detailed Insights
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Credit Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0077B6] rounded-sm p-4 sm:p-5 lg:p-6 text-white shadow-sm"
            >
              <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Credit Balance
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-blue-100">Available Credits</span>
                  <span className="text-lg font-bold">{data?.services?.professional?.credit_balance || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-blue-100">This Week</span>
                  <span className="text-[13px] font-medium">0 spent</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-400/30">
                <Link
                  href="#"
                  className="inline-flex items-center text-[13px] text-blue-100 hover:text-white transition-colors"
                >
                  Manage Credits
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Setup Status */}
            {!isProfessionalSetupComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-sm p-4 sm:p-5 lg:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-sm">
                    <Settings className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-amber-900 dark:text-amber-100">
                      Setup Required
                    </h4>
                    <p className="text-[12px] text-amber-700 dark:text-amber-300">
                      Complete your profile to activate services
                    </p>
                  </div>
                </div>
                <Link
                  href="/home-services/dashboard/services/setup"
                  className="inline-flex items-center justify-center w-full px-3 py-1.5 bg-amber-600 text-white text-[13px] font-medium rounded-sm hover:bg-amber-700 transition-colors"
                >
                  Complete Setup
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            )}

            {/* Success Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-sm p-3 sm:p-4 lg:p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-[13px] text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>Complete your profile for better visibility</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>Add multiple services to attract more clients</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span>Respond quickly to new leads</span>
                </li>
              </ul>

            </motion.div>
       
          </div>

       
        </div>
      </div>

    </div>
  );
}