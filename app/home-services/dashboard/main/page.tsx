"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Package, CreditCard, Wallet, DollarSign, Eye } from "lucide-react";


// Import your split components
import MetricCardSmall from "./_MetricCardSmall";
import LeadsSummary from "./_LeadsSummary";
import CreditsCard from "./_CreditsCard";
import ReviewsCard from "./_ReviewsCard";
import MonthlyLeadsChart from "./_MonthlyLeads";
import MonthlyTarget from "./_MonthlyTarget";
import RecentActivity from "./_RecentActivity";
import LeadsMonthly from "./CreditsMonthly";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="space-y-4 p-3 sm:p-6">
      {/* ===== Top small metrics ===== */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {[
          { title: "Customers", value: "82", icon: <Users className="w-5 h-5" />, color: "bg-[#023E8A]" },
          { title: "Leads", value: "30", icon: <Package className="w-5 h-5" />, color: "bg-[#0077B6]" },
          { title: "Spent Credits", value: "320", icon: <CreditCard className="w-5 h-5" />, color: "bg-[#0096C7]" },
          { title: "Purchased", value: "600", icon: <Wallet className="w-5 h-5" />, color: "bg-[#90E0EF]" },
          { title: "Total Cost", value: "600$", icon: <DollarSign className="w-5 h-5" />, color: "bg-[#023E8A]" },
          { title: "Profile Views", value: "1.2K", icon: <Eye className="w-5 h-5" />, color: "bg-[#48CAE4]" },
        ].map((item, i) => (
          <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.05 }}>
            <MetricCardSmall {...item} />
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Leads / Response / Conversion ===== */}
      <motion.div
        className="grid grid-cols-1"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <LeadsSummary />
      </motion.div>

      {/* ===== Recent Leads, Credits, Reviews ===== */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.div variants={fadeUp}><MonthlyTarget /></motion.div>
        <motion.div variants={fadeUp}><CreditsCard /></motion.div>
      </motion.div>

      {/* ===== Charts Section ===== */}
      <motion.div
        className="space-y-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <MonthlyLeadsChart />
      </motion.div>

      {/* ===== Services Performance ===== */}
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.div variants={fadeUp}><ReviewsCard /></motion.div>
        <div className="py-2">
          <motion.div variants={fadeUp}><LeadsMonthly /></motion.div>
        </div>
        <div className="py-2 ">
          <motion.div variants={fadeUp}><RecentActivity /></motion.div>



        </div>

      </motion.div>
    </div>
  );
}
