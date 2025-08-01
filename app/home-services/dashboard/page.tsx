"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Users, Package } from "lucide-react";
import MonthlyTarget from "@/components/home-services/dashboard/ecommerce/MonthlyTarget";
import MonthlyLeads from "@/components/home-services/dashboard/ecommerce/MonthlyLeads";


export default function dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* Metric Item - Customers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <Users className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Customers
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                82
              </h4>
            </div>
            <Badge color="success">
              <ArrowUp className="w-4 h-4" />
              11.01%
            </Badge>
          </div>
        </div>

        {/* Metric Item - Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <Package className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Leads
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                35
              </h4>
            </div>
            <Badge color="error">
              <ArrowDown className="text-error-500 w-4 h-4" />
              9.05%
            </Badge>
          </div>
        </div>
      </div>
      <span className="px-2">
        <MonthlyLeads></MonthlyLeads>

      </span>
      <span className="px-2">
        <MonthlyTarget></MonthlyTarget>

      </span>
    </>
  );
};
