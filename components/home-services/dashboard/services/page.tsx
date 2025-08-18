// app/dashboard/page.tsx
"use client";

import React from "react";
import { Plus, Info, ChevronRight, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import ServiceList from "@/components/home-services/dashboard/services/ServiceList";

export default function Dashboard() {
  return (
    <>
      <div className="dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-6">
        {/* ====== Stats Cards ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: "Active Services", value: 4 },
            { title: "Avg. Rating", value: 3.7 },
            { title: "Total Reviews", value: 134 },
            { title: "Incomplete Setups", value: 2 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </h3>
              <p className="text-2xl font-bold text-[#0077B6]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* ====== Header ====== */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                BCC Brand
              </h1>
              <p className="text-gray-800 dark:text-gray-300 flex items-center gap-1 text-sm">
                <span>📍</span>
                <span>Falls Church</span>
              </p>
            </div>
            <Link
              href="/home-services/dashboard/services/businessAvailability"
              className="text-[#0077B6] dark:text-[#48CAE4] text-xs sm:text-sm hover:underline"
            >
              Business Availability
            </Link>
          </header>

          {/* ====== Main Layout ====== */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ====== Services Section ====== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:flex-1"
            >
              <div className="dark:bg-gray-800 bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Your Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Set your job preferences, activate or deactivate services, and choose where you
                  want to work.
                </p>
                <a
                  href="#"
                  className="text-sm inline-flex items-center text-[#0077B6] dark:text-[#90e0ef] hover:text-[#005f91] dark:hover:text-[#48cae4] font-medium transition"
                >
                  <Info className="w-4 h-4 mr-1" />
                  View our guide to job preferences
                </a>

                {/* Future service items */}
                <div className="space-y-3"></div>

                <Link
                  href="/professional"
                  className="inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-[#0077B6] to-[#005f91] text-white rounded-lg hover:from-[#005f91] hover:to-[#005f91] transition shadow"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add a Service
                </Link>
              </div>
            </motion.div>

            {/* ====== Sidebar ====== */}
            <aside className="flex flex-col gap-6 w-full lg:w-1/3">
              {/* Activity This Week */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="dark:bg-gray-800 bg-white p-4 sm:p-6 rounded-lg shadow space-y-4 hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold flex items-center gap-2 text-[#005f91] dark:text-[#48cae4]">
                  <TrendingUp className="w-5 h-5 text-green-600" /> Activity this week
                </h3>

                {/* Row on desktop, stack on mobile */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                  {[
                    { label: "spent", value: "0" },
                    { label: "leads", value: "0" },
                    { label: "views", value: "0" },
                  ].map((stat, i) => (
                    <div key={i} className="flex-1 text-center">
                      <p className="text-lg sm:text-xl font-bold text-[#0077B6] dark:text-[#90e0ef]">
                        {stat.value}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center text-[#0077B6] dark:text-[#90e0ef] hover:text-blue-800 dark:hover:text-[#48cae4] text-sm transition"
                >
                  Business insights
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>

              {/* Spending This Week */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="dark:bg-gray-800 bg-white p-4 sm:p-6 rounded-lg shadow space-y-4 hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold flex items-center gap-2 text-[#005f91] dark:text-[#48cae4]">
                  <Wallet className="w-5 h-5 text-purple-600" /> Spending this week
                </h3>

                {/* Column on mobile, row on larger screens */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                  <div>
                    <p className="text-lg font-bold text-[#0077B6] dark:text-[#90e0ef]">0 Credits</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">8 Credits budget spent</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-[#0077B6] dark:text-[#90e0ef]">0 Credits</p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs">additional spent</p>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </div>

      {/* ====== Services List Section ====== */}
        <ServiceList />
    </>
  );
}
